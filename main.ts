import { readFileSync } from "fs";
import { Question, Score } from "./types";
import * as rs from "readline-sync";
import chalk from "chalk";
import { getQuestions } from "./questions";
import { addScore, getScores } from "./scores";

console.log(chalk.green.bold("Welcome to this quiz"));

const playerName = rs.question("What's your name?\n>"); // waits for user input

console.log(chalk.yellow(`Welcome ${playerName}`));

const questions: Question[] = getQuestions();

let keepPlaying: boolean = true;

function playGame(): void {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    const answer = rs.question(`${questions[i].question}\n>`);

    if (answer.toLowerCase === questions[i].answer.toLocaleLowerCase) {
      console.log(chalk.green("Correct!"));
      score += 2;
    } else {
      console.log(chalk.red("Wrong!"));
      console.log(chalk.yellow(` The answer is ${questions[i].answer}`));
      score -= 1;
    }

    console.log(`Your score: ${score}`);
    console.log("------------------------------\n");
  }

  console.log(`final score: ${score}\n`);

  addScore(playerName, score);

  const scores: Score[] = getScores();

  console.log(chalk.bold("High Score"));
  console.table(scores);

  let maxScore = scores[0].points;

  for (let i = 0; i < scores.length; i++) {
    if (scores[i].points > maxScore) {
      maxScore = scores[i].points;
    }
  }

  if (score > maxScore) {
    console.log(chalk.inverse.bold(`You are the number one now!`));
  } else {
    console.log(chalk.inverse.bold(`Try harder!`));
  }
  const anotherGame = rs.question("Want to try again?\n> Type yes/no\n>");
  if (anotherGame === "no") {
    keepPlaying = false;
  }
}

while (keepPlaying) {
  playGame();
}

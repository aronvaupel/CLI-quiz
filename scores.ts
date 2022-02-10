import { readFileSync, writeFileSync } from "fs";
import { Score } from "./types";

export function getScores(): Score[] {
  // Read the content of scores.json and convert it to a string
  const scoresFile = readFileSync("./scores.json", { encoding: "utf-8" });
  // Convert the string to a Score[]
  return JSON.parse(scoresFile);
}

export function addScore(myName: string, myPoints: number) {
  // Get the content of scores.json as an Score[]
  const scores = getScores();

  // Create a new Score
  const newScore: Score = {
    username: myName,
    points: myPoints,
  };
  // Add the new Score and the old scores to a new array
  const newScores = [...scores, newScore];

  // Sort the new array
  function compareFunction(a: Score, b: Score) {
    return b.points - a.points;
  }
  const newScoresSorted = newScores.sort(compareFunction);

  // Make a string out of the new array, so we can write it to a file
  const newScoresString = JSON.stringify(newScoresSorted);

  // Write the updated contents to our scores.json file
  writeFileSync("./scores.json", newScoresString);
}

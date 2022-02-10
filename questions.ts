import { readFileSync } from "fs";
import { Question, Score } from "./types";

export function getQuestions(): Question[] {
  const file = readFileSync("./questions.json", { encoding: "utf-8" });
  return JSON.parse(file);
}

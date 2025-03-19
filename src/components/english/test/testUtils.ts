
import { EnglishLevel, Question } from "./testData";

export const calculateEnglishLevel = (answers: Record<number, string>, questions: Question[]): EnglishLevel => {
  // Count correct answers by level
  const levelCounts: Record<EnglishLevel, number> = {
    A1: 0,
    A2: 0,
    B1: 0,
    B2: 0,
    C1: 0,
    C2: 0,
    "": 0
  };
  
  questions.forEach(question => {
    if (answers[question.id] === question.correctOptionId) {
      levelCounts[question.level]++;
    }
  });
  
  // Calculate total score
  const totalCorrect = Object.values(levelCounts).reduce((sum, count) => sum + count, 0);
  
  // Determine level based on pattern of correct answers
  let resultLevel: EnglishLevel = "";
  
  // If all answers are correct, return C2 immediately
  if (totalCorrect === questions.length) {
    return "C2";
  }
  
  if (totalCorrect <= 3) {
    resultLevel = "A1";
  } else if (totalCorrect <= 5) {
    resultLevel = "A2";
  } else if (totalCorrect <= 7) {
    resultLevel = "B1";
  } else if (totalCorrect <= 8) {
    resultLevel = "B2";
  } else if (totalCorrect === 9) {
    resultLevel = "C1";
  } else {
    resultLevel = "C2";
  }
  
  // Adjust based on specific level performance
  if (resultLevel === "B1" && levelCounts["B2"] + levelCounts["C1"] + levelCounts["C2"] >= 3) {
    resultLevel = "B2";
  } else if (resultLevel === "B2" && levelCounts["C1"] + levelCounts["C2"] >= 2) {
    resultLevel = "C1";
  }
  
  return resultLevel;
};

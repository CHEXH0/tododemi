
export type AnswerOption = {
  id: string;
  text: string;
};

export type Question = {
  id: number;
  text: string;
  options: AnswerOption[];
  level: EnglishLevel;
  correctOptionId: string;
};

export type EnglishLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "";

export const levelDescriptions: Record<EnglishLevel, string> = {
  A1: "Beginner: You can understand and use basic phrases and expressions.",
  A2: "Elementary: You can communicate in simple tasks requiring a direct exchange of information.",
  B1: "Intermediate: You can deal with most situations while traveling and describe experiences, events, and ambitions.",
  B2: "Upper Intermediate: You can interact with a degree of fluency and spontaneity that makes interaction possible without strain.",
  C1: "Advanced: You can express ideas fluently and spontaneously without much obvious searching for expressions.",
  C2: "Proficient: You can understand with ease virtually everything heard or read.",
  "": ""
};

export const questions: Question[] = [
  {
    id: 1,
    text: "What ___ your name?",
    options: [
      { id: "a", text: "are" },
      { id: "b", text: "is" },
      { id: "c", text: "am" },
      { id: "d", text: "be" }
    ],
    level: "A1",
    correctOptionId: "b"
  },
  {
    id: 2,
    text: "She ___ to the store yesterday.",
    options: [
      { id: "a", text: "go" },
      { id: "b", text: "goes" },
      { id: "c", text: "went" },
      { id: "d", text: "going" }
    ],
    level: "A1",
    correctOptionId: "c"
  },
  {
    id: 3,
    text: "I ___ never been to Paris.",
    options: [
      { id: "a", text: "have" },
      { id: "b", text: "has" },
      { id: "c", text: "had" },
      { id: "d", text: "having" }
    ],
    level: "A2",
    correctOptionId: "a"
  },
  {
    id: 4,
    text: "By the time we arrived, the movie ___.",
    options: [
      { id: "a", text: "already started" },
      { id: "b", text: "has already started" },
      { id: "c", text: "had already started" },
      { id: "d", text: "was already starting" }
    ],
    level: "B1",
    correctOptionId: "c"
  },
  {
    id: 5,
    text: "If I ___ rich, I would travel the world.",
    options: [
      { id: "a", text: "am" },
      { id: "b", text: "was" },
      { id: "c", text: "were" },
      { id: "d", text: "be" }
    ],
    level: "B1",
    correctOptionId: "c"
  },
  {
    id: 6,
    text: "She ___ the report by tomorrow morning.",
    options: [
      { id: "a", text: "will finish" },
      { id: "b", text: "will have finished" },
      { id: "c", text: "is finishing" },
      { id: "d", text: "finishes" }
    ],
    level: "B2",
    correctOptionId: "b"
  },
  {
    id: 7,
    text: "I wish I ___ to the party last night.",
    options: [
      { id: "a", text: "went" },
      { id: "b", text: "have gone" },
      { id: "c", text: "would go" },
      { id: "d", text: "had gone" }
    ],
    level: "B2",
    correctOptionId: "d"
  },
  {
    id: 8,
    text: "The novel, ___ was set in Victorian England, received critical acclaim.",
    options: [
      { id: "a", text: "that" },
      { id: "b", text: "who" },
      { id: "c", text: "which" },
      { id: "d", text: "what" }
    ],
    level: "C1",
    correctOptionId: "c"
  },
  {
    id: 9,
    text: "Had I known about the traffic, I ___ earlier.",
    options: [
      { id: "a", text: "would leave" },
      { id: "b", text: "had left" },
      { id: "c", text: "would have left" },
      { id: "d", text: "will have left" }
    ],
    level: "C1",
    correctOptionId: "c"
  },
  {
    id: 10,
    text: "Not only ___ the exam, but he also received the highest score.",
    options: [
      { id: "a", text: "he passed" },
      { id: "b", text: "did he pass" },
      { id: "c", text: "he did pass" },
      { id: "d", text: "passed he" }
    ],
    level: "C2",
    correctOptionId: "b"
  }
];

import { generateNumber } from "./generateNumber";

export const generateID = (content: string) => {
  return JSON.stringify(generateNumber() + content);
};

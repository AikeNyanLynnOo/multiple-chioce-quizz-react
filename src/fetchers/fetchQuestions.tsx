import { QuizItem } from "../redux/types";
const questionsApiUrl = process.env.REACT_APP_QUESTIONS_API_URL;

export const fetchQuestions = async ({
  categories,
  limit,
  difficulty,
}: {
  categories: string;
  limit: number;
  difficulty: string;
}): Promise<QuizItem[]> => {
  if (!questionsApiUrl) throw Error("Questions API Url is undefined");
  console.log("Categories -> " + categories);
  const url = `${questionsApiUrl}?categories=${categories}&limit=${limit}&difficulty=${difficulty}`;
  console.log("Requesting questions -> " + url);
  const response = await fetch(url);
  const json = await response.json();
  return json.map((question: any) => {
    return {
      ...question,
      userAnswer: null,
    };
  });
};

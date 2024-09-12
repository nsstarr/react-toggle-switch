import { useEffect, useState } from "react";

interface AnswerOption {
  id: number;
  label: string;
  correct: boolean;
}

interface QuizQuestionData {
  question: string;
  groupedAnswers: AnswerOption[][];
}

const useShuffledQuestions = (
  questions: QuizQuestionData[],
  randomized: boolean
): QuizQuestionData[] => {
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestionData[]>(
    questions
  );

  const shuffleArray = <T,>(array: T[]): T[] => {
    return array
      .map((item) => ({ item, sortKey: Math.random() }))
      .sort((a, b) => a.sortKey - b.sortKey)
      .map(({ item }) => item);
  };

  useEffect(() => {
    if (randomized) {
      // Shuffle the questions themselves
      setShuffledQuestions(shuffleArray(questions));
    } else {
      setShuffledQuestions(questions); // Original order if not randomized
    }
  }, [randomized]);

  return shuffledQuestions;
};

export default useShuffledQuestions;

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
  const [shuffledQuestions, setShuffledQuestions] = useState<
    QuizQuestionData[]
  >([]);

  // Fisher-Yates Shuffle Algorithm
  const shuffleArray = <T>(array: T[]): T[] => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[randomIndex]] = [
        shuffledArray[randomIndex],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  useEffect(() => {
    if (randomized) {
      const shuffled = shuffleArray(questions);
      setShuffledQuestions(shuffled);
    } else {
      setShuffledQuestions(questions); 
    }
  }, [randomized, questions]);

  return shuffledQuestions;
};

export default useShuffledQuestions;

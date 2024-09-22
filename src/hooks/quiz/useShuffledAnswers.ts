import { useEffect, useState } from "react";

interface AnswerOption {
  id: number;
  label: string;
  correct: boolean;
}

type GroupedAnswerArray = AnswerOption[][];

const useShuffledGroupedAnswers = (
  groupedAnswers: GroupedAnswerArray,
  randomized: boolean
): GroupedAnswerArray => {
  const [shuffledGroupedAnswers, setShuffledGroupedAnswers] =
    useState<GroupedAnswerArray>(groupedAnswers);

  // The Fisher-Yates algorithm ensures unbiased shuffling and runs in O(n)
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
      // Shuffle the order
      const shuffledAnswers = groupedAnswers.map((group) =>
        shuffleArray(group)
      );
      // Shuffle the groups themselves
      setShuffledGroupedAnswers(shuffleArray(shuffledAnswers));
    } else {
      // Reset to original if not randomized
      setShuffledGroupedAnswers(groupedAnswers);
    }
  }, [randomized, groupedAnswers]);

  return shuffledGroupedAnswers;
};

export default useShuffledGroupedAnswers;

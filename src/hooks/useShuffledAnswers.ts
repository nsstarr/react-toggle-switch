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

  const shuffleArray = <T>(array: T[]): T[] => {
    return array
      .map((item) => ({ item, sortKey: Math.random() }))
      .sort((a, b) => a.sortKey - b.sortKey)
      .map(({ item }) => item);
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

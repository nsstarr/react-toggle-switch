import { useEffect, useState } from "react";

const useAnswerSelection = (
  answers: { id: number; correct: boolean }[],
  isLocked: (answerId: number) => boolean,
  onAnswerChange: (isCorrect: boolean, answerId: number) => void,
  correctAnswerIds: Set<number>
) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [groupLocked, setGroupLocked] = useState(false);

  useEffect(() => {
    if (selectedAnswer !== null) {
      const isCorrect = correctAnswerIds.has(selectedAnswer);

      if (isCorrect) {
        setGroupLocked(true); // Lock the group if the correct answer is selected
      }

      onAnswerChange(isCorrect || false, selectedAnswer);
    }
  }, [selectedAnswer, answers, onAnswerChange]);

  const handleSelect = (answerId: number) => {
    if (!groupLocked && !isLocked(answerId)) {
      setSelectedAnswer(answerId);
    }
  };

  return {
    selectedAnswer,
    groupLocked,
    handleSelect,
  };
};

export default useAnswerSelection;

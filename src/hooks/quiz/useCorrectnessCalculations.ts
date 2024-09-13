import { useEffect } from "react";

interface AnswerOption {
  id: number;
  label: string;
  correct: boolean;
}

interface UseCorrectnessCalculationProps {
  selectedAnswers: number[];
  groupedAnswers: AnswerOption[][];
  totalCorrectAnswers: number;
  setCorrectness: (correctness: number) => void;
}

const useCorrectnessCalculation = ({
  selectedAnswers,
  groupedAnswers,
  totalCorrectAnswers,
  setCorrectness,
}: UseCorrectnessCalculationProps) => {
  useEffect(() => {
    const correctCount = selectedAnswers.filter(
      (id) => groupedAnswers.flat().find((answer) => answer.id === id)?.correct
    ).length;

    const correctnessPercentage =
      totalCorrectAnswers > 0 ? (correctCount / totalCorrectAnswers) * 100 : 0;

    setCorrectness(correctnessPercentage);
  }, [selectedAnswers, groupedAnswers, totalCorrectAnswers, setCorrectness]);
};

export default useCorrectnessCalculation;

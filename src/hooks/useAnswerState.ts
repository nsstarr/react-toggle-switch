import { useState } from "react";

const useAnswerState = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [lockedAnswers, setLockedAnswers] = useState<number[]>([]);
  const [correctnessFeedback, setCorrectnessFeedback] = useState<string | null>(
    null
  );

  const handleAnswerChange = (isCorrect: boolean, answerId: number) => {
    if (selectedAnswers.includes(answerId)) {
      return;
    }

    setCorrectnessFeedback(
      isCorrect ? "The answer is correct!" : "The answer is incorrect"
    );

    if (isCorrect) {
      setLockedAnswers((prev) => [...prev, answerId]);
    }

    setSelectedAnswers((prevSelectedAnswers) => [
      ...prevSelectedAnswers,
      answerId,
    ]);
  };

  return {
    selectedAnswers,
    lockedAnswers,
    correctnessFeedback,
    handleAnswerChange,
  };
};

export default useAnswerState;

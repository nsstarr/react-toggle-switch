import React, { useState, useEffect } from "react";
import AnswerToggle from "./AnswerToggle";
import { useCorrectness } from "../context/CorrrectnessContext";

interface AnswerOption {
  id: number;
  label: string;
  correct: boolean;
}

interface QuizQuestionProps {
  question: string;
  groupedAnswers: AnswerOption[][]; // Accept grouped answers (4 sets)
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  groupedAnswers,
}) => {
  const { correctness, setCorrectness } = useCorrectness();
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [lockedAnswers, setLockedAnswers] = useState<number[]>([]);
  const [correctnessFeedback, setCorrectnessFeedback] = useState<string | null>(
    null
  );

  const totalCorrectAnswers = groupedAnswers
    .flat()
    .filter((answer) => answer.correct).length;

  useEffect(() => {
    const correctCount = selectedAnswers.filter(
      (id) => groupedAnswers.flat().find((answer) => answer.id === id)?.correct
    ).length;

    const correctnessPercentage =
      totalCorrectAnswers > 0 ? (correctCount / totalCorrectAnswers) * 100 : 0;

    setCorrectness(correctnessPercentage);
  }, [selectedAnswers, groupedAnswers, totalCorrectAnswers, setCorrectness]);

  const handleAnswerChange = (isCorrect: boolean, answerId: number) => {
    if (selectedAnswers.includes(answerId)) {
      return;
    }
    setCorrectnessFeedback(
      isCorrect ? "The answer is correct!" : "The answer is incorrect"
    );

    if (isCorrect) {
      // Lock only the correct answer
      setLockedAnswers((prev) => [...prev, answerId]);
    }

    setSelectedAnswers((prevSelectedAnswers) => [
      ...prevSelectedAnswers,
      answerId,
    ]);
  };

  const getBackgroundGradient = () => {
    switch (Math.round(correctness)) {
      case 100:
        return "bg-gradient-to-b from-[#76E0C2] to-[#59CADA]";
      case 75:
        return "bg-gradient-to-b from-[#F9E878] to-[#D3972E]";
      case 50:
        return "bg-gradient-to-b from-[#F1B496] to-[#EA806A]";
      case 25:
        return "bg-gradient-to-b from-[#F6B868] to-[#EE6B2D]";
      default:
        return "bg-gradient-to-b from-white to-slate-200";
    }
  };

  return (
    <div className={`w-full h-full ${getBackgroundGradient()}`}>
      <h1>{question}</h1>
      {groupedAnswers.map((answers, index) => (
        <AnswerToggle
          key={index}
          answers={answers} // Pass grouped answers to each AnswerToggle
          onAnswerChange={(isCorrect, answerId) =>
            handleAnswerChange(isCorrect, answerId)
          }
          isLocked={(answerId: number) => lockedAnswers.includes(answerId)} // Only lock the correct answer
        />
      ))}
      {correctnessFeedback && (
        <h2 className="mt-4 text-3xl font-bold text-white">
          {correctnessFeedback}
        </h2>
      )}
    </div>
  );
};

export default QuizQuestion;

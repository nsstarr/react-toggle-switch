import React, { useState } from "react";
import AnswerToggle from "./AnswerToggle";
import { useCorrectness } from "../context/CorrrectnessContext";

interface AnswerOption {
  id: number;
  label: string;
  correct: boolean;
}

interface QuizQuestionProps {
  question: string;
  answers: AnswerOption[];
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, answers }) => {
  const { correctness, setCorrectness } = useCorrectness();
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [lockedAnswers, setLockedAnswers] = useState<number[]>([]);

  const totalCorrectAnswers = answers.filter((answer) => answer.correct).length;

  const handleAnswerChange = (isCorrect: boolean, answerId: number) => {
    // Prevent duplicate updates if the answer is already selected
    if (selectedAnswers.includes(answerId)) {
      return;
    }

    setSelectedAnswers((prev) => [...prev, answerId]);

    // Update locked answers if the answer is incorrect
    if (!isCorrect) {
      setLockedAnswers((prev) => [...prev, answerId]);
    }

    // Calculate correctness percentage based on correct answers
    const correctCount = selectedAnswers.filter(
      (id) => answers.find((answer) => answer.id === id)?.correct
    ).length;

    // Add the current answer to the count
    const updatedCorrectCount = isCorrect ? correctCount + 1 : correctCount;

    // Correctness percentage based on correct answers only
    const correctnessPercentage =
      totalCorrectAnswers > 0
        ? (updatedCorrectCount / totalCorrectAnswers) * 100
        : 0;

    setCorrectness(correctnessPercentage);
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
      {answers.map((answer) => (
        <AnswerToggle
          key={answer.id}
          answers={answers}
          onAnswerChange={(isCorrect) =>
            handleAnswerChange(isCorrect, answer.id)
          }
          isLocked={lockedAnswers.includes(answer.id)}
        />
      ))}
    </div>
  );
};

export default QuizQuestion;

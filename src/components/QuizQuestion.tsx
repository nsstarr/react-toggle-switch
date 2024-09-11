import React from "react";
import AnswerToggle from "./AnswerToggle";
import { useCorrectness } from "../context/CorrrectnessContext";
import useCorrectnessCalculation from "../hooks/useCorrectnessCalculations";
import useAnswerState from "../hooks/useAnswerState";

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

  const totalCorrectAnswers = groupedAnswers
    .flat()
    .filter((answer) => answer.correct).length;

  // Use custom hook for managing selected and locked answers
  const {
    selectedAnswers,
    lockedAnswers,
    correctnessFeedback,
    handleAnswerChange,
  } = useAnswerState();

  // Use custom hook for correctness calculation
  useCorrectnessCalculation({
    selectedAnswers,
    groupedAnswers,
    totalCorrectAnswers,
    setCorrectness,
  });

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

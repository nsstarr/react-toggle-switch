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
        return "bg-gradient-correct";
      case 75:
        return "bg-gradient-75";
      case 50:
        return "bg-gradient-50";
      case 25:
        return "bg-gradient-25";
      default:
        return "bg-gradient-default";
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

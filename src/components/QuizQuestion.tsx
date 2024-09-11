import React from "react";
import AnswerToggle from "./AnswerToggle";
import {
  useCorrectness,
} from "../context/CorrrectnessContext";

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
  const { correctness } = useCorrectness();

  const getBackgroundGradient = () => {
    switch (correctness) {
      case 100:
        return "bg-gradient-to-b from-[#76E0C2] to-[#59CADA]";
      case 75:
        return "bg-gradient-to-b from-[#F9E878] to-[#D3972E]";
      case 50:
        return "bg-gradient-to-b from-[#F1B496] to-[#EA806A]";
      case 25:
        return "bg-gradient-to-b from-[#F6B868] to-[#EE6B2D]";
      default:
        return "bg-gradient-to-b from-white to-slate-200"; // No gradient for 0% correctness
    }
  };

  return (
    <div className={`w-full h-full ${getBackgroundGradient()}`}>
      <h1>{question}</h1>
      {answers.map((answer) => (
        <AnswerToggle
          key={answer.id}
          answers={answers}
          onAnswerCorrect={() => {}}
        />
      ))}
    </div>
  );
};

export default QuizQuestion;

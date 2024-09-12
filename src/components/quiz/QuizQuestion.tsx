import React from "react";
import AnswerToggle from "./AnswerToggle";
import { useCorrectness } from "../../context/CorrrectnessContext";
import useCorrectnessCalculation from "../../hooks/useCorrectnessCalculations";
import useAnswerState from "../../hooks/useAnswerState";

interface AnswerOption {
  id: number;
  label: string;
  correct: boolean;
}

interface QuizQuestionProps {
  question: string;
  groupedAnswers: AnswerOption[][]; // Accept grouped answers
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  groupedAnswers,
}) => {
  const { correctness, setCorrectness } = useCorrectness();

  const totalCorrectAnswers = groupedAnswers
    .flat()
    .filter((answer) => answer.correct).length;

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
        return "bg-gradient-25";
    }
  };

  return (
    <section
      className={`h-screen w-full mx-auto p-20 ${getBackgroundGradient()}`}
      aria-labelledby="quiz-question"
    >
      <header className="text-center">
        <h1 id="quiz-question" className="text-xl font-bold text-white lg:text-4xl">
          {question}
        </h1>
      </header>

      {/* Answer toggles */}
      <fieldset aria-describedby="feedback" className="mt-6">
        <legend className="sr-only">Answer the following question</legend>
        {groupedAnswers.map((answers, index) => (
          <AnswerToggle
            key={index}
            answers={answers}
            correctnessScore={correctness}
            onAnswerChange={(isCorrect, answerId) =>
              handleAnswerChange(isCorrect, answerId)
            }
            isLocked={(answerId: number) => lockedAnswers.includes(answerId)}
          />
        ))}
      </fieldset>

      {/* Feedback for correctness */}
      {correctnessFeedback && (
        <div
          id="feedback"
          aria-live="polite"
          className="mt-4 text-center text-base font-bold text-white lg:text-3xl"
        >
          {correctnessFeedback}
        </div>
      )}
    </section>
  );
};

export default QuizQuestion;

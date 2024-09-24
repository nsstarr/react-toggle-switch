import React from "react";
import AnswerToggle from "./AnswerToggle";
import { useCorrectness } from "../../context/CorrrectnessContext";
import useCorrectnessCalculation from "../../hooks/quiz/useCorrectnessCalculations";
import useAnswerState from "../../hooks/quiz/useAnswerState";
import useShuffledGroupedAnswers from "../../hooks/quiz/useShuffledAnswers";
import { getBackgroundGradient } from "../../utils/quiz-utils";

interface AnswerOption {
  id: number;
  label: string;
  correct: boolean;
}

interface QuizQuestionProps {
  question: string;
  groupedAnswers: AnswerOption[][];
  randomized?: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  groupedAnswers,
  randomized = false,
}) => {
  const { correctness, setCorrectness } = useCorrectness();

  const shuffledGroupedAnswers = useShuffledGroupedAnswers(
    groupedAnswers,
    randomized
  );

  const totalCorrectAnswers = shuffledGroupedAnswers
    .flat()
    .filter((answer) => answer.correct).length;

  const {
    selectedAnswers,
    lockedAnswers,
    correctnessFeedback,
    handleAnswerChange,
  } = useAnswerState();

  useCorrectnessCalculation({
    selectedAnswers,
    groupedAnswers: shuffledGroupedAnswers,
    totalCorrectAnswers,
    setCorrectness,
  });

  // Get the background gradient based on correctness
  const correctnessBgGradient = getBackgroundGradient(correctness);

  return (
    <section
      className={`h-screen w-full mx-auto px-4 py-8 md:p-20 ${correctnessBgGradient}`}
      aria-labelledby="quiz-question"
    >
      <header className="text-center">
        <h1
          id="quiz-question"
          className="text-xl font-bold text-white lg:text-4xl"
        >
          {question}
        </h1>
      </header>

      {/* Answer toggles */}
      <fieldset aria-describedby="feedback" className="my-6">
        <legend className="sr-only">Answer the following question</legend>
        {shuffledGroupedAnswers.map((answers, index) => (
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

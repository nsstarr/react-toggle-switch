import React, { useState } from "react";
import QuestionToggle from "./QuestionToggle";

interface AnswerOption {
  id: number;
  label: string;
  correct: boolean;
}
// Import the QuestionToggle component

interface QuizQuestionProps {
  question: string;
  answers: AnswerOption[];
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  answers,
}) => {
  const [correctnessCount, setCorrectnessCount] = useState(0); // Track how many questions are correctly answered and locked

  // Callback when a question is correctly answered
  const handleAnswerCorrect = () => {
    setCorrectnessCount(correctnessCount + 1); // Increment the count when a question is locked with the correct answer
  };

  return (
    <div>
      <h1>{question}</h1>
      {/* Loop over the questions and render QuestionToggle for each */}
      {answers.map((answer) => (
        <QuestionToggle
          key={answer.id}
          answers={answers}
          onAnswerCorrect={handleAnswerCorrect}
        />
      ))}
    </div>
  );
};

export default QuizQuestion;

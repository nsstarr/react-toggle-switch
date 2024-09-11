import React, { useState, useEffect } from "react";

interface AnswerOption {
  id: number;
  label: string;
  correct: boolean;
}

interface AnswerToggleProps {
  answers: AnswerOption[];
  onAnswerChange: (isCorrect: boolean, answerId: number) => void;
  isLocked: (answerId: number) => boolean; // Prop to determine if this answer is locked
}

const AnswerToggle: React.FC<AnswerToggleProps> = ({
  answers,
  onAnswerChange,
  isLocked,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [groupLocked, setGroupLocked] = useState(false); // New state to lock the entire group

  useEffect(() => {
    if (selectedAnswer !== null) {
      const isCorrect = answers.find(
        (answer) => answer.id === selectedAnswer
      )?.correct;

      if (isCorrect) {
        setGroupLocked(true); // Lock the entire group if the correct answer is selected
      }

      onAnswerChange(isCorrect || false, selectedAnswer); // Notify parent if the answer is correct or incorrect
    }
  }, [selectedAnswer, answers, onAnswerChange]);

  const handleSelect = (answerId: number) => {
    if (!groupLocked && !isLocked(answerId)) {
      setSelectedAnswer(answerId); // Update selected answer only if not locked
    }
  };

  return (
    <fieldset
      className="question-toggle-container my-5 flex flex-col items-center justify-center"
      aria-labelledby="answer-toggle-group"
    >
      <legend id="answer-toggle-group" className="sr-only">
        Select your answer
      </legend>

      <div className="relative flex h-12 w-full max-w-lg items-center rounded-full border-2 border-white p-5">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-white/50 shadow-md transition-transform duration-300 ease-in-out"
          style={{
            width: "50%",
            transform: `translateX(${
              selectedAnswer === answers[1]?.id ? "100%" : "0%"
            })`,
          }}
        ></div>

        {answers.map((answer) => (
          <label
            key={answer.id}
            className="relative z-10 flex-1 cursor-pointer text-center"
          >
            <input
              type="radio"
              name="toggle"
              checked={selectedAnswer === answer.id}
              onChange={() => handleSelect(answer.id)}
              disabled={groupLocked || isLocked(answer.id)}
              className="sr-only"
              aria-checked={selectedAnswer === answer.id}
              aria-label={`Answer option: ${answer.label}`}
            />
            <span
              className={`block font-semibold transition-colors ${
                selectedAnswer === answer.id ? "text-white" : "text-gray-900"
              }`}
            >
              {answer.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default AnswerToggle;

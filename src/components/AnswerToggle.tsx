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

  useEffect(() => {
    if (selectedAnswer !== null) {
      const isCorrect = answers.find(
        (answer) => answer.id === selectedAnswer
      )?.correct;
      onAnswerChange(isCorrect || false, selectedAnswer); // Notify parent if the answer is correct or incorrect
    }
  }, [selectedAnswer, answers, onAnswerChange]);

  const handleSelect = (answerId: number) => {
    if (!isLocked(answerId)) {
      setSelectedAnswer(answerId); // Update selected answer only if not locked
    }
  };

  return (
    <div className="question-toggle-container my-5 flex flex-col items-center justify-center">
      <div className="toggle-group">
        {answers.map((answer) => (
          <div
            key={answer.id}
            className={`toggle-option ${
              selectedAnswer === answer.id ? "selected" : ""
            }`}
          >
            <label>
              <input
                type="checkbox"
                checked={selectedAnswer === answer.id}
                onChange={() => handleSelect(answer.id)}
                disabled={isLocked(answer.id)} // Disable only if locked
              />
              {answer.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswerToggle;

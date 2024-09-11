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
                disabled={groupLocked || isLocked(answer.id)}
                aria-checked={selectedAnswer === answer.id} 
                aria-label={`Answer option: ${answer.label}`} 
              />
              {answer.label}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default AnswerToggle;

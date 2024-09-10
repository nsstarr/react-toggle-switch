import React, { useState, useEffect } from "react";

interface AnswerOption {
  id: number;
  label: string;
  correct: boolean;
}
interface AnswerToggleProps {
  answers: AnswerOption[]; // A single list of answers (instead of groups)
  onAnswerCorrect: () => void; // Callback when the correct answer is selected
}

const AnswerToggle: React.FC<AnswerToggleProps> = ({
  answers,
  onAnswerCorrect,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null); // Track selected answer
  const [isLocked, setIsLocked] = useState(false); // Track if the answer is locked
  const [correctness, setCorrectness] = useState(0); // Correctness (0% or 100%)

  useEffect(() => {
    if (selectedAnswer !== null) {
      const isCorrect = answers.find(
        (answer) => answer.id === selectedAnswer
      )?.correct;
      if (isCorrect) {
        setCorrectness(100);
        setIsLocked(true); // Lock the answers once correct
        onAnswerCorrect(); // Notify parent of correct answer
      } else {
        setCorrectness(0); // Reset if wrong
      }
    }
  }, [selectedAnswer, answers, onAnswerCorrect]);

  // Handle when the user selects an answer
  const handleSelect = (answerId: number) => {
    if (!isLocked) {
      setSelectedAnswer(answerId);
    }
  };

  return (
    <div
      className="question-toggle-container"
      style={{ backgroundColor: `rgba(0, 255, 0, ${correctness / 100})` }} // Update background color based on correctness
    >
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
                disabled={isLocked} // Lock if correct answer is selected
              />
              {answer.label}
            </label>
          </div>
        ))}
      </div>
      {isLocked && <p>Correct answer selected! The question is now locked.</p>}
    </div>
  );
};

export default AnswerToggle;

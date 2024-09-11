import React, { useState, useEffect } from "react";
import { useCorrectness } from "../context/CorrrectnessContext";

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

  const { correctness, setCorrectness } = useCorrectness();

  useEffect(() => {
    if (selectedAnswer !== null) {
      const isCorrect = answers.find(
        (answer) => answer.id === selectedAnswer
      )?.correct;
      if (isCorrect) {
        setCorrectness((prev: number) => prev + 25);
        setIsLocked(true); 
        onAnswerCorrect(); // Notify parent of correct answer
      } 
    }
  }, [selectedAnswer, answers, setCorrectness, onAnswerCorrect]);

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
                disabled={isLocked} 
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

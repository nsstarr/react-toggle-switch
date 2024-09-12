import React, { useState, useEffect } from "react";

interface AnswerOption {
  id: number;
  label: string;
  correct: boolean;
}

interface AnswerToggleProps {
  answers: AnswerOption[];
  onAnswerChange: (isCorrect: boolean, answerId: number) => void;
  isLocked: (answerId: number) => boolean;
  correctnessScore: number;
}

const AnswerToggle: React.FC<AnswerToggleProps> = ({
  answers,
  onAnswerChange,
  isLocked,
  correctnessScore,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [groupLocked, setGroupLocked] = useState(false);
  const [isWrapped, setIsWrapped] = useState(false);

  useEffect(() => {
    const checkIsWrapped = () => {
      if (window.matchMedia("(max-width: 640px)").matches) {
        setIsWrapped(answers.some((answer) => answer.label.length > 9));
      } else {
        setIsWrapped(false);
      }
    };

    checkIsWrapped();
    window.addEventListener("resize", checkIsWrapped);

    return () => {
      window.removeEventListener("resize", checkIsWrapped);
    };
  }, [answers]);

  useEffect(() => {
    if (selectedAnswer !== null) {
      const isCorrect = answers.find(
        (answer) => answer.id === selectedAnswer
      )?.correct;

      if (isCorrect) {
        setGroupLocked(true); // Lock the entire group if the correct answer is selected
      }

      onAnswerChange(isCorrect || false, selectedAnswer);
    }
  }, [selectedAnswer, answers, onAnswerChange]);

  const handleSelect = (answerId: number) => {
    if (!groupLocked && !isLocked(answerId)) {
      setSelectedAnswer(answerId);
    }
  };

  const getCorrectScoreTextColor = () => {
    switch (Math.round(correctnessScore)) {
      case 100:
        return "text-correct";
      case 75:
        return "text-nearlyCorrect";
      case 50:
        return "text-halfCorrect";
      case 25:
      case 0:
        return "text-incorrect";
      default:
        return "text-incorrect";
    }
  };

  return (
    <fieldset
      className="mx-auto my-5 flex max-w-screen-md flex-col items-center justify-center"
      aria-labelledby="answer-toggle-group"
    >
      <legend id="answer-toggle-group" className="sr-only">
        Select your answer
      </legend>

      <div
        className="relative flex w-full items-center gap-2 rounded-full border border-white px-3 py-2 shadow-inner md:px-5 md:py-3"
        style={{
          flexDirection: isWrapped ? "column" : "row",
          borderRadius: isWrapped ? "30px" : "9999px",
        }}
      >
        {/* Slider for the selected answer */}
        <div
          className="absolute left-0 top-0 rounded-full bg-white/50 shadow-lg transition-transform duration-300 ease-in-out"
          style={{
            width: isWrapped ? "100%" : `${100 / answers.length}%`, // Full width in wrapped mode
            height: isWrapped ? `${100 / answers.length}%` : "100%", // Full height in wrapped mode
            transform: isWrapped
              ? `translateY(${
                  selectedAnswer === answers[1]?.id ? "100%" : "0%"
                })`
              : `translateX(${
                  selectedAnswer === answers[1]?.id ? "100%" : "0%"
                })`, // Toggle vertically if wrapped
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
              className={`block text-lg text-nowrap font-semibold md:text-2xl p-1.5 transition-colors ${
                selectedAnswer === answer.id
                  ? getCorrectScoreTextColor()
                  : "text-white"
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

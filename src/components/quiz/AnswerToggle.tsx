import React from "react";
import useIsWrapped from "../../hooks/quiz/useIsWrapped";
import useAnswerSelection from "../../hooks/quiz/useAnswerSelection";

const MAX_WIDTH_MOBILE = "640px";
const RADIUS_WRAPPED = "30px";
const RADIUS_UNWRAPPED = "9999px";
const FIRST_ANSWER = 0;
const SECOND_ANSWER = 100;
const THIRD_ANSWER = 200;
const NO_SELECTION = 0;

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
  const isWrapped = useIsWrapped(answers, MAX_WIDTH_MOBILE);

  const { selectedAnswer, handleSelect } = useAnswerSelection(
    answers,
    isLocked,
    onAnswerChange
  );

  // Color based on correctness score
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

  const answerWidth = `${100 / answers.length}%`;

  const selectedIndex = answers.findIndex(
    (answer) => answer.id === selectedAnswer
  );

  const twoAnswerToggle = selectedIndex * 100;
  const threeAnswerToggle =
    selectedIndex === 0
      ? FIRST_ANSWER
      : selectedIndex === 1
      ? SECOND_ANSWER
      : THIRD_ANSWER;

  const translatePercentage =
    selectedIndex === -1
      ? NO_SELECTION
      : answers.length === 2
      ? twoAnswerToggle
      : threeAnswerToggle;

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLLabelElement>,
    answerId: number
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect(answerId);
    }
  };

  return (
    <fieldset
      className="mx-auto my-5 flex max-w-screen-md flex-col items-center justify-center"
      aria-labelledby="answer-toggle-group"
      role="radiogroup"
    >
      <legend id="answer-toggle-group" className="sr-only">
        Select your answer
      </legend>

      <div
        className="relative flex w-full items-center gap-2 rounded-full border border-white px-3 py-2 shadow-inner md:px-5 md:py-3"
        style={{
          flexDirection: isWrapped ? "column" : "row",
          borderRadius: isWrapped ? RADIUS_WRAPPED : RADIUS_UNWRAPPED,
        }}
      >
        {/* Slider for the selected answer */}
        <div
          className="absolute left-0 top-0 rounded-full bg-white/50 shadow-lg transition-transform duration-300 ease-in-out"
          style={{
            width: isWrapped ? "100%" : answerWidth,
            height: isWrapped ? `${100 / answers.length}%` : "100%",
            transform: isWrapped
              ? `translateY(${translatePercentage}%)`
              : `translateX(${translatePercentage}%)`,
          }}
        ></div>

        {/* Render answer options */}
        {answers.map((answer) => (
          <label
            key={answer.id}
            className="relative z-10 flex-1 cursor-pointer text-center"
            style={{ flexBasis: answerWidth }}
            tabIndex={0}
            role="radio" 
            aria-checked={selectedAnswer === answer.id} 
            onKeyDown={(e) => handleKeyDown(e, answer.id)} 
            onClick={() => handleSelect(answer.id)} 
          >
            <input
              type="radio"
              name="toggle"
              checked={selectedAnswer === answer.id}
              onChange={() => handleSelect(answer.id)}
              className="sr-only"
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

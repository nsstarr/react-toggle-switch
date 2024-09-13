import { useState, useEffect } from "react";

interface AnswerOption {
  id: number;
  label: string;
  correct: boolean;
}

const useIsWrapped = (answers: AnswerOption[], maxWidth: string) => {
  const [isWrapped, setIsWrapped] = useState(false);

  useEffect(() => {
    const checkIsWrapped = () => {
      if (window.matchMedia(`(max-width: ${maxWidth})`).matches) {
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
  }, [answers, maxWidth]);

  return isWrapped;
};

export default useIsWrapped;

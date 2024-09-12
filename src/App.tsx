import React, { useState } from "react";
import { CorrectnessProvider } from "./context/CorrrectnessContext";
import QuizQuestion from "./components/quiz/QuizQuestion";
import useShuffledQuestions from "./hooks/useShuffledQuestions";
import quizQuestions from "./data";

const App: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const randomized = true;
  const shuffledQuestions = useShuffledQuestions(quizQuestions, randomized);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="font-display">
      <section className="flex h-full w-full flex-col items-center justify-center">
        <div className="relative w-full overflow-hidden">
          {/* Quiz Question Slider */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentQuestionIndex * 100}%)`,
            }}
          >
            {shuffledQuestions.map((quizQuestion, index) => (
              <div key={index} className="w-full min-w-full flex-shrink-0">
                <CorrectnessProvider>
                  <QuizQuestion
                    question={quizQuestion.question}
                    groupedAnswers={quizQuestion.groupedAnswers}
                    randomized={true}
                  />
                </CorrectnessProvider>
              </div>
            ))}
          </div>
        </div>

        {/*  Navigation Buttons */}
        <div className="fixed bottom-0 w-full bg-slate-700 p-4">
          <div className="mx-auto flex max-w-xl justify-between">
            <button
              onClick={handlePreviousQuestion}
              className={`text-white md:text-2xl py-2 px-4 md:px-8 md:py-4 rounded-lg bg-gray-500 ${
                currentQuestionIndex === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={currentQuestionIndex === 0}
            >
              Back
            </button>
            <button
              onClick={handleNextQuestion}
              className={`text-white py-2 px-4 md:text-2xl md:px-8 md:py-4 rounded-lg bg-bottomPanel ${
                currentQuestionIndex === shuffledQuestions.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={currentQuestionIndex === shuffledQuestions.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;

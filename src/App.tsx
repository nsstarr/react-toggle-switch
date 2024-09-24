import React from "react";
import { CorrectnessProvider } from "./context/CorrrectnessContext";
import QuizQuestion from "./components/quiz/QuizQuestion";
import quizQuestions from "./data";
import QuizSlider from "./components/layouts/QuizSlider";
import useShuffledQuestions from "./hooks/quiz/useShuffledQuestions"; // Adjust the path if necessary

const App: React.FC = () => {
  const randomized = true; // Set this flag based on your needs
  const shuffledQuestions = useShuffledQuestions(quizQuestions, randomized);

  return (
    <div className="font-display">
      <CorrectnessProvider>
        <QuizSlider>
          {shuffledQuestions.map((quizQuestion, index) => (
            <QuizQuestion
              key={index}
              question={quizQuestion.question}
              groupedAnswers={quizQuestion.groupedAnswers}
              randomized={true}
            />
          ))}
          <div className="mt-48 flex items-center justify-center text-2xl font-semibold text-bottomPanel">
            <h2>Thank you for taking the quiz!</h2>
          </div>
        </QuizSlider>
      </CorrectnessProvider>
    </div>
  );
};

export default App;

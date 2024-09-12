import React from "react";
import { CorrectnessProvider } from "./context/CorrrectnessContext";
import QuizQuestion from "./components/quiz/QuizQuestion";
import quizQuestions from "./data"; 
import QuizSlider from "./components/layouts/QuizSlider";

const App: React.FC = () => {
  return (
    <div className="font-display">
      <CorrectnessProvider>
        <QuizSlider>
          <QuizQuestion
            question={quizQuestions[0].question}
            groupedAnswers={quizQuestions[0].groupedAnswers}
            randomized={true}
          />

          <QuizQuestion
            question={quizQuestions[1].question}
            groupedAnswers={quizQuestions[1].groupedAnswers}
            randomized={true}
          />

          <div className="mt-48 flex items-center justify-center text-2xl font-semibold text-bottomPanel">
            <h2>Thank you for taking the quiz!</h2>
          </div>
        </QuizSlider>
      </CorrectnessProvider>
    </div>
  );
};

export default App;

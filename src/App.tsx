import React from "react";
import { CorrectnessProvider } from "./context/CorrrectnessContext";
import QuizQuestion from "./components/quiz/QuizQuestion";

const App: React.FC = () => {
  const question = "Select the correct answers for the following:";

  const groupedAnswers = [
    [
      { id: 1, label: "Option 1", correct: true },
      { id: 2, label: "Option 2", correct: false },
    ],
    [
      { id: 3, label: "Option 3", correct: true },
      { id: 4, label: "Option 4", correct: false },
    ],
    [
      { id: 5, label: "Option 5", correct: true },
      { id: 6, label: "Option 6", correct: false },
    ],
    [
      { id: 7, label: "Option 7", correct: false },
      { id: 8, label: "Option 8", correct: true },
    ],
  ];
  return (
    <div className="App">
      <CorrectnessProvider>
        <QuizQuestion question={question} groupedAnswers={groupedAnswers} />
      </CorrectnessProvider>
    </div>
  );
};

export default App;

import React from "react";
import { CorrectnessProvider } from "./context/CorrrectnessContext";
import QuizQuestion from "./components/quiz/QuizQuestion";

const App: React.FC = () => {
  const question = "What are the ideal conditions inside an office?";

  const groupedAnswers = [
    [
      { id: 1, label: "Good pay", correct: true },
      { id: 2, label: "Bad pay", correct: false },
    ],
    [
      { id: 3, label: "Lot of meetings", correct: true },
      { id: 4, label: "Less meetings", correct: false },
    ],
    [
      { id: 5, label: "Free coffee", correct: true },
      { id: 6, label: "Expensive coffee", correct: false },
    ],
    [
      { id: 7, label: "Bear in office", correct: false },
      { id: 8, label: "Dog in office", correct: true },
    ],
  ];
  return (
    <div className="font-display">
      <section className="flex h-full w-full">
        <CorrectnessProvider>
          <QuizQuestion question={question} groupedAnswers={groupedAnswers} />
        </CorrectnessProvider>
      </section>
    </div>
  );
};

export default App;

import React from "react";
import QuestionToggle from "./components/QuestionToggle";

const App: React.FC = () => {
  const handleCorrectAnswer = () => {
    console.log("All correct answers selected!");
  };

  const question = "Select the correct answers for the following:";

  // Four groups of multiple-choice options (some with 2 options, some with 3)
  const answers = [
    { id: 3, label: "Option A", correct: false },
    { id: 4, label: "Option B", correct: true },
    { id: 5, label: "Option C", correct: false },
  ];

  return (
    <div className="App">
      <QuestionToggle
        question={question}
        answers={answers}
        onAnswerCorrect={handleCorrectAnswer}
      />
    </div>
  );
};

export default App;

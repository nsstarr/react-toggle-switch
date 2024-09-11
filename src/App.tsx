import React from "react";
import QuestionToggle from "./components/AnswerToggle";
import QuizQuestion from "./components/QuizQuestion";

const App: React.FC = () => {
  const question = "Select the correct answers for the following:";

  const answers = [
    {
      id: 1,
      label: "Option 1",
      correct: true,
    },
    {
      id: 2,
      label: "Option 2",
      correct: false,
    },
    {
      id: 3,
      label: "Option 3",
      correct: true,
    },
    {
      id: 4,
      label: "Option 4",
      correct: false,
    },
  ];

  return (
    <div className="App">
      <QuizQuestion question={question} answers={answers} />
    </div>
  );
};

export default App;

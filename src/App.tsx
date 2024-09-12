import React from "react";
import { CorrectnessProvider } from "./context/CorrrectnessContext";
import QuizQuestion from "./components/quiz/QuizQuestion";
import useShuffledQuestions from "./hooks/useShuffledQuestions";

const App: React.FC = () => {
  const quizQuestions = [
    {
      question: "What are the ideal conditions inside an office?",
      groupedAnswers: [
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
      ],
    },
    {
      question: "What is the best environment for productivity?",
      groupedAnswers: [
        [
          { id: 9, label: "Quiet surroundings", correct: true },
          { id: 10, label: "Noisy surroundings", correct: false },
        ],
        [
          { id: 11, label: "Good lighting", correct: true },
          { id: 12, label: "Dim lighting", correct: false },
        ],
        [
          { id: 13, label: "Supportive colleagues", correct: true },
          { id: 14, label: "Distracting colleagues", correct: false },
        ],
      ],
    },
  ];

  const randomized = true;
  const shuffledQuestions = useShuffledQuestions(quizQuestions, randomized);

  return (
    <div className="font-display">
      <section className="flex h-full w-full flex-col">
        <CorrectnessProvider>
          {shuffledQuestions.map((quizQuestion, index) => (
            <QuizQuestion
              key={index}
              question={quizQuestion.question}
              groupedAnswers={quizQuestion.groupedAnswers}
              randomized={true}
            />
          ))}
        </CorrectnessProvider>
      </section>
    </div>
  );
};

export default App;

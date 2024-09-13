const quizQuestions = [
  {
    question: "What are the ideal conditions inside an office?",
    groupedAnswers: [
      [
        { id: 1, label: "Good pay", correct: true },
        { id: 2, label: "Bad pay", correct: false },
        { id: 3, label: "Ok pay", correct: false },
      ],
      [
        { id: 4, label: "Lot of meetings", correct: true },
        { id: 5, label: "Less meetings", correct: false },
      ],
      [
        { id: 6, label: "Free coffee", correct: true },
        { id: 7, label: "Expensive coffee", correct: false },
      ],
      [
        { id: 8, label: "Bear in office", correct: false },
        { id: 9, label: "Dog in office", correct: true },
      ],
    ],
  },
  {
    question: "What is the best environment for productivity?",
    groupedAnswers: [
      [
        { id: 10, label: "Quiet surroundings", correct: true },
        { id: 11, label: "Noisy surroundings", correct: false },
      ],
      [
        { id: 12, label: "Good lighting", correct: true },
        { id: 13, label: "Dim lighting", correct: false },
      ],
      [
        { id: 14, label: "Supportive colleagues", correct: true },
        { id: 15, label: "Distracting colleagues", correct: false },
      ],
      [
        { id: 16, label: "Comfortable chair", correct: true },
        { id: 17, label: "Uncomfortable chair", correct: false },
        { id: 18, label: "No chair", correct: false },
      ],
    ],
  },
];

export default quizQuestions;

import React, { useState, ReactNode } from "react";

interface QuizSliderProps {
  children: ReactNode; 
}

const QuizSlider: React.FC<QuizSliderProps> = ({ children }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Converting children to an array to map over them
  const slides = React.Children.toArray(children);

  const handleNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <section className="flex h-full w-full flex-col items-center justify-center">
      <div className="relative w-full overflow-hidden">
        {/* Slider Container */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentSlideIndex * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full min-w-full flex-shrink-0">
              {slide}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-0 w-full bg-slate-700 p-4">
        <div className="mx-auto flex max-w-xl justify-between">
          <button
            onClick={handlePreviousSlide}
            className={`text-white md:text-2xl py-2 px-4 md:px-8 md:py-4 rounded-lg bg-gray-500 ${
              currentSlideIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentSlideIndex === 0}
          >
            Back
          </button>
          <button
            onClick={handleNextSlide}
            className={`text-white py-2 px-4 md:text-2xl md:px-8 md:py-4 rounded-lg bg-bottomPanel ${
              currentSlideIndex === slides.length - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={currentSlideIndex === slides.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuizSlider;

import React, { createContext, useContext, useState, ReactNode } from "react";

const CorrectnessContext = createContext<any>(null);

export const useCorrectness = () => useContext(CorrectnessContext);

export const CorrectnessProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [correctness, setCorrectness] = useState(0);

  return (
    <CorrectnessContext.Provider value={{ correctness, setCorrectness }}>
      {children}
    </CorrectnessContext.Provider>
  );
};

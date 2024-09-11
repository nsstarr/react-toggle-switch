import React, { createContext, useContext, useState } from "react";

const CorrectnessContext = createContext<any>(null);

export const useCorrectness = () => useContext(CorrectnessContext);

export const CorrectnessProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [correctness, setCorrectness] = useState(0); // Shared correctness state
  return (
    <CorrectnessContext.Provider value={{ correctness, setCorrectness }}>
      {children}
    </CorrectnessContext.Provider>
  );
};

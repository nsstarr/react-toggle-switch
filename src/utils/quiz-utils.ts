export  const getBackgroundGradient = (correctness: number) => {
  switch (Math.round(correctness)) {
    case 100:
      return "bg-gradient-correct";
    case 75:
      return "bg-gradient-75";
    case 50:
      return "bg-gradient-50";
    default:
      return "bg-gradient-25";
  }
};
'use client';
import CountUp from "react-countup";

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <div className="w-full">
      <CountUp
        decimal="."
        suffix=" TND"
        end={amount} 
      />
    </div>
  );
};

export default AnimatedCounter;

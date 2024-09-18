import React from "react";

export const HeadingText: React.FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  return (
    
      <h1 className={`${className || "py-md text-4xl pb-md text-center font-bold"}`}>
        {text || "Default Header"}
      </h1>
   
  );
};

export default HeadingText;

/* text-right text-center */
/* text-xl text-2xl text-4xl */
/* font-bold font-extrabold */
/* py-md py-sm */

import React from "react";

export const HeadingText: React.FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  return (
    <div className="container mx-auto px-md">
      <h1 className={`${className || "py-md text-2xl pb-md"}`}>
        {text || "Default Header"}
      </h1>
    </div>
  );
};

export default HeadingText;

/* text-right text-center */
/* text-xl text-2xl text-4xl */
/* font-bold font-extrabold */
/* py-md py-sm */

import React from "react";
import { initBackgrounds } from "../data/schemaParts";


export const Leed: React.FC<{
  title: string;
  text: string;
  background?: string;
 
  className?: string;
}> = ({ text, title, className,background }) => {
  return (
    <div
      className={`relative ${className} ${background && initBackgrounds[background]} bg-opacity-5`}
    >
      <div className="relative mx-auto max-w-2xl md:text-center container pt-md">
        <h2 className="font-display text-3xl tracking-tight text-base-content sm:text-4xl">
          {title}
         
        </h2>
        <p className="text-lg tracking-tight text-base-content py-md">{text}</p>
      </div>
    </div>
  );
};

export default Leed;

/* text-right text-center */
/* text-xl text-2xl text-4xl */
/* font-bold font-extrabold */
/* py-md py-sm py-lg pt-md py-lg*/

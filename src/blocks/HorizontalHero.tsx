import React from "react";

import { CiEdit, CiGrid42 } from "react-icons/ci";
export const HorizontalHero: React.FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  //return <h1 className={`${className || ''}`}>{text || 'Default Header'}</h1>;
  return (
    <div className="container mx-auto lg:flex p-md gap-md relative">
      <div className="flex-1 pb-md">
        <h1 className="text-base font-semibold leading-7 text-info">
          By the makers of SmartStart
        </h1>
        <p className="w-4/5 mt-md text-3xl font-extrabold tracking-[-0.04em] text-base-content sm:text-5xl sm:leading-[3.5rem]">
          A modern open platform for EDU content creation
        </p>
        <p className="mt-4 text-base leading-7 text-base-content pb-md">
          {text || "Default Text"}
        </p>
      </div>

      <div className="flex-1 relative mt-10 lg:mt-0">
        <div className="mockup-browser border-base-300 border w-2/3 -mt-16 bg-base-300">
          <div className="mockup-browser-toolbar">
            <div className="input border-base-300 border bg-base-100">
              https://smartstart.com
            </div>
          </div>
          <div className="border-base-300 flex justify-center border-t px-4 py-16 bg-base-100">
            <p className="text-9xl text-base-content text-opacity-10 pb-md">
              <CiGrid42 strokeWidth={0.1} />
            </p>
            {className}
          </div>
        </div>

        <div className="mockup-browser border-base-300 border absolute -bottom-12 right-0 w-1/2  bg-base-300">
          <div className="mockup-browser-toolbar ">
            <div className="input border-base-300 border">
              https://smartstart.com
            </div>
          </div>
          <div className="border-base-300 flex justify-center border-t px-4 py-16 bg-base-100">
            <p className="text-9xl text-base-content text-opacity-10 pb-md">
              <CiEdit />
            </p>
            {className}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalHero;

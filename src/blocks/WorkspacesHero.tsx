import React from "react";

import { FiPackage, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
export const HorizontalHero: React.FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  //return <h1 className={`${className || ''}`}>{text || 'Default Header'}</h1>;
  return (
    <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-md p-md">
      {" "}
      {[
        {
          title: "dashboard",
          text: "Everything is styled with utility classes, just open the markup in your editor and change whatever you want.",
        },
        {
          title: "Strategies",
          text: "Each template is a well-organized project, providing a codebase that is both productive and enjoyable to work with.",
        },
        {
          title: "books",
          text: "All of the code follows Tailwind CSS best practices, because it’s written by the same team",
        },
      ].map((i) => (
        <div
          key={i.title}
          className={`bg-primary bg-opacity-10 relative rounded-2xl px-4 pb-4 pt-16 card border border-primary ${className}`}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-base-200 ring-1 ring-zinc-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-zinc-900/25 dark:bg-white/7.5 dark:ring-white/15 dark:group-hover:bg-emerald-300/10 dark:group-hover:ring-emerald-400">
            <FiPackage />
          </div>
          <h3 className="mt-4 text-sm font-semibold leading-7 text-base-content capitalize">
            <Link to="/dashboard/sign-in/">
              <span className="absolute inset-0 rounded-2xl "></span>
              {i.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-base-content ">{i.text}</p>
        </div>
      ))}
      <div
        className={`relative rounded-2xl px-4 pb-4 pt-16 card border border-success bg-success bg-opacity-10 ${className}`}
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-base-200 ring-1 ring-zinc-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-zinc-900/25 dark:bg-white/7.5 dark:ring-white/15 dark:group-hover:bg-emerald-300/10 dark:group-hover:ring-emerald-400">
          <FiPlus />
        </div>
        <h3 className="m  t-4 text-sm font-semibold leading-7 text-base-content capitalize">
          <Link to="/dashboard/sign-in/">
            <span className="absolute inset-0 rounded-2xl "></span>Create your
            personal workspace
          </Link>
        </h3>
        <p className="mt-1 text-sm text-base-content ">{text}</p>
      </div>
    </div>
  );
};

export default HorizontalHero;

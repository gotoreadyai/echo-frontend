import React from "react";


import { FiEdit3, FiGrid, FiShield } from "react-icons/fi";
export const InfoColumns: React.FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  //return <h1 className={`${className || ''}`}>{text || 'Default Header'}</h1>;
  return (
    <div className="container relative mx-auto grid grid-cols-1 gap-8 lg:grid-cols-3 p-md pb-12 pt-12">
      <div className="flex items-start">
        <div className="p-sm text-3xl card shadow-xl">
        <FiGrid />
        </div>
        <div className="ml-6">
          <h2 className="text-sm font-semibold leading-6 text-base-content">
            Built with modern technologies {text}
          </h2>
          <p className="mt-2 text-sm leading-6 text-base-content">
            Each template is a well-organized project, providing a codebase that
            is both productive and enjoyable to work with. Ideal for learning
            effective web development techniques.
          </p>
        </div>
      </div>
      <div className="flex items-start  ">
        <div className="p-sm text-3xl card shadow-xl">
        <FiEdit3 />
        </div>
        <div className="ml-6">
          <h2 className="text-sm font-semibold leading-6 text-base-content">
            Easy to customize
          </h2>
          <p className="mt-2 text-sm leading-6 text-base-content">
            Everything is styled with utility classes, just open the markup in
            your editor and change whatever you want. {className}
          </p>
        </div>
      </div>
      <div className="flex items-start">
      <div className="p-sm text-3xl card shadow-xl">
      <FiShield />
        </div>
        <div className="ml-6">
          <h2 className="text-sm font-semibold leading-6 text-base-content">
            Built by experts
          </h2>
          <p className="mt-2 text-sm leading-6 text-base-content">
            All of the code follows Tailwind CSS best practices, because it’s
            written by the same team who created and maintain the framework.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoColumns;

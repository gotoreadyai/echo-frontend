import React from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

interface FormProps {
  children: JSX.Element;
  items: any[];
}

const DaisyDrawer: React.FC<FormProps> = ({ children, items }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      {/* <div className="drawer-content flex flex-col items-center justify-center"> */}
      <div className="drawer-content p-md">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden mb-4"
        >
          <FiMenu />
        </label>

        

        {children}
      </div>
      <div className="drawer-side shadow-xl">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="menu text-base-content min-h-full w-80 gap-pl bg-base-100 p-0 gap-px">
          <div className="px-4 py-6 bg-base-200">[logo]</div>
          <ul className="p-4 bg-base-200">
            {items.map((item, index) => (
              <li key={index}>
                <Link to={`pl/${item}`}>{item}</Link>
              </li>
            ))}
          </ul>
          <div className="flex-1 bg-base-200"></div>
        </div>
      </div>
    </div>
  );
};

export default DaisyDrawer;

import React from "react";
import { FiMenu } from "react-icons/fi";
import { Logo } from "./Logo";

interface FormProps {
  children: JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: JSX.Element;
}

const DaisyDrawer: React.FC<FormProps> = ({ children, items }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* <!-- MAIN CONTENT DRAWER --> */}
      <div className="drawer-content p-md">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden mb-4"
        >
          <FiMenu />
        </label>
        {children}
      </div>

      {/* <!-- SIDE DRAWER --> */}
      <div className="drawer-side shadow-xl">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="menu text-base-content min-h-full w-80 gap-pl bg-base-100 p-0 gap-px">
          <div className="px-6 py-2 bg-base-300">
            <Logo />
          </div>
          {items}
          <div className="flex-1 bg-base-200"></div>
        </div>
      </div>
    </div>
  );
};

export default DaisyDrawer;

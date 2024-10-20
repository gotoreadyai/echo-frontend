import React from "react";
import Logo from "../blocks/Logo";
import { initBackgrounds } from "../data/schemaParts";

const _MainDashboard: React.FC<{ [key: string]: React.ReactNode }> = (props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div
        className={`relative border-b border-base-300 ${initBackgrounds["outerLights"]}`}
      >
        <header className="relative flex justify-between items-center container mx-auto py-md px-sm">
          <div>
            <Logo />
          </div>
          <div className="flex relative">{props.header}</div>
        </header>
      </div>
      <div className="bg-base-200 flex-1 flex flex-col gap-md">
        <section className="relative">{props.primaryContent}</section>
        <div className="card flex flex-col bg-base-100 container mx-auto">
          <section className="relative flex justify-end">
            {props.secondaryContent}
          </section>
          <section className="relative">{props.tertiaryContent}</section>
        </div>
      </div>

      <footer className="sticky bottom-0">
        <div className="relative">{props.footer}</div>
      </footer>
    </div>
  );
};

export default _MainDashboard;
/* flex flex-1 */
/* px-lg py-lg pr-lg pl-lg pt-lg pl-lg */
/* px-md py-md pr-md pl-md pt-md pl-md */
/* px-sm py-sm pr-sm pl-sm pt-sm pl-sm */

/* mx-lg my-lg mr-lg ml-lg mt-lg ml-lg */
/* mx-md my-md mr-md ml-md mt-md ml-md */
/* mx-sm my-sm mr-sm ml-sm mt-sm ml-sm */

/* border m-md rounded */



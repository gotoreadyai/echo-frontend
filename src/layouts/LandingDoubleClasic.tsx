import React from "react";
import Logo from "../blocks/Logo";
import { initBackgrounds } from "../data/schemaParts";

const LandingDoubleClasic: React.FC<{ [key: string]: React.ReactNode }> = (
  props
) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div
        className={`relative border-b border-base-300 ${initBackgrounds["outerLights"]}`}
      >
        <div
          className={`absolute w-full h-full ${initBackgrounds["pointPrimaryLightRight"]}`}
        ></div>
        <header className="relative flex justify-between items-center container mx-auto mb-md p-md py-lg">
          <div>
            <Logo />
          </div>
          <div className="relative flex gap-xs">{props.header}</div>
        </header>
        <div className="flex container mx-auto px-md">
          <section className="relative flex-1">{props.primaryContent}</section>
          <section className="relative flex-1">
            {" "}
            {props.secondaryContent}
          </section>
        </div>
      </div>
      <section className="relative flex-1">{props.tertiaryContent}</section>
      <footer className="sticky bottom-0">
        <div className="relative">{props.footer}</div>
      </footer>
    </div>
  );
};

export default LandingDoubleClasic;

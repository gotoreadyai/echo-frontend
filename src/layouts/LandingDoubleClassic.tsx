import React from "react";
import Logo from "../blocks/Logo";
import { initBackgrounds } from "../data/schemaParts";
import { LayoutProps } from "../types/types";
import SlotsRenderer from "../components/SlotsRenderer";

const LandingDoubleClassic: React.FC<LayoutProps> = ({ workspace, page }) => {

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
          <div className="relative flex gap-xs"><SlotsRenderer slots={workspace} slotName={"header"} /></div>
        </header>
        <div className="flex container mx-auto px-md">
          <section className="relative flex-1"><SlotsRenderer slots={page} slotName={"primaryContent"} /></section>
          <section className="relative flex-1">
          <SlotsRenderer slots={page} slotName={"secondaryContent"} />
          </section>
        </div>
      </div>
      <section className="relative flex-1"><SlotsRenderer slots={page} slotName={"tertiaryContent"} /></section>
      <footer className="sticky bottom-0">
        <div className="relative"><SlotsRenderer slots={workspace} slotName={"footer"} /></div>
      </footer>
    </div>
  );
};

export default LandingDoubleClassic;

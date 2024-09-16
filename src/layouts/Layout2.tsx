import React from "react";

const Layout2: React.FC<{ [key: string]: React.ReactNode }> = (props) => {
  return (
    <div>
      <header className="flex relative">{props.header}</header>
      <div className="flex">
        <section className="flex-1 relative">{props.primaryContent}</section>
        <section className="flex-1 relative">
          <div className="sticky top-0">{props.secondaryContent} </div>
        </section>
      </div>

      <footer className="relative">{props.footer}</footer>
    </div>
  );
};

export default Layout2;

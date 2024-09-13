import React from "react";

const Layout2: React.FC<{ [key: string]: React.ReactNode }> = (props) => {
  return (
    <div>
      <header className="flex">{props.header}</header>
      <section>{props.primaryContent}</section>
      <footer>{props.footer}</footer>
    </div>
  );
};

export default Layout2;

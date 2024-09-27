import React from "react";
const AuthLayout: React.FC<{ [key: string]: React.ReactNode }> = (props) => {
  return (
    <>
      {/* <!-- component --> */}
      <div className="flex items-stretch w-full min-h-screen flex-col-reverse sm:flex-row">
        {/* <!-- Left: Image --> */}

        <section className="flex-1 items-center justify-center bg-base-200 flex flex-col">
          <div className="relative">{props.secondaryContent}</div>
          <div className="relative">{props.tertiaryContent}</div>
        </section>
        {/* <!-- Right: Login Form --> */}

        <div className="flex-1">
          <div className="relative sm:fixed sm:w-1/2 h-screen flex flex-col items-center bg-base-100">
            <header className="flex relative justify-end w-full pt-md">
              {props.header}
            </header>
            <section className="flex-1 justify-center flex flex-col px-lg w-4/5">
              <div className="card relative bg-base-200 p-lg -mt-lg shadow-lg">
                {props.primaryContent}
              </div>
            </section>
          </div>
        </div>

        {/* <!-- Sign up  Link --> */}
      </div>
    </>
  );
};

export default AuthLayout;

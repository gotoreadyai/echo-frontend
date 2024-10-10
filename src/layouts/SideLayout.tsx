const MainDashboard: React.FC<{ [key: string]: React.ReactNode }> = (props) => {
  return (
    <div className="grid justify-center items-center min-h-screen">
      <section className="relative">{props._sideStatic}</section>
    </div>
  );
};

export default MainDashboard;
/* flex flex-1 */
/* px-lg py-lg pr-lg pl-lg pt-lg pl-lg */
/* px-md py-md pr-md pl-md pt-md pl-md */
/* px-sm py-sm pr-sm pl-sm pt-sm pl-sm */

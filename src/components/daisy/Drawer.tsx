const Drawer: React.FC<{
  context: JSX.Element | null;
  content: JSX.Element;
}> = ({ context, content }) => {
  return (
    <div className={`${context && "drawer lg:drawer-open"} font-inter relative`}>
      {context && (
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      )}
      <div className="drawer-content">
        {content}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      {context && (
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          {context}
        </div>
      )}
      |
    </div>
  );
};

export default Drawer;

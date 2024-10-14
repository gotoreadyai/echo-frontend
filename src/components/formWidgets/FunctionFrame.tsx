

const FunctionFrameWidget = ({ children }: { children: React.ReactNode }) => {
  return (
    <fieldset style={{ border: "2px solid #007bff", padding: "10px", margin: "20px 0" }}>
      <legend style={{ fontWeight: "bold" }}>Funkcja</legend>
      {children}
    </fieldset>
  );
};

export default FunctionFrameWidget;

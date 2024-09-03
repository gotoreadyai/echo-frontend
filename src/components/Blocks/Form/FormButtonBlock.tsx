// Button Block Component
export type FormButtonBlockT = {
  title: string;
  onClick: () => void;
};

export const FormButtonBlock: React.FC<FormButtonBlockT> = ({
  title,
  onClick,
}) => (
  <div className="container mx-auto">
    <button onClick={onClick} className="btn btn-primary capitalize">
      {title}
    </button>
  </div>
);

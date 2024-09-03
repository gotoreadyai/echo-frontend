import { Link } from "react-router-dom";

// Link Block Component
export type LinkBlockT = {
    to: string;
    text: string;
    target?: string;
  }
  
  export const LinkBlock: React.FC<LinkBlockT> = ({ to, text, target = "_self" }) => (
    <Link to={to} target={target} className="text-blue-500 hover:underline container mx-auto">
      dasdasdas{text}
    </Link>
  );
  
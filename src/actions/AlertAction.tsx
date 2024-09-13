/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

const AlertAction: React.FC = ({scope}:any) => {
  const handleAction = async () => {
    console.log("AlertAction",scope);
  };

  useEffect(() => {
    handleAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>AlertAction</>;
};
export default AlertAction;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useNav from "../hooks/useNav"; // Import useNav
import ActionBlock from "./ActionBlock";

interface Action {
  scope: string;
  action: string;
}

interface SubmitFormProps {
  className?: string;
  actions: Action[];
  successRedirect?: string;
}

const SubmitForm: React.FC<SubmitFormProps> = ({
  className,
  successRedirect,
  actions = [],
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [triggerActions, setTriggerActions] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  const { buildLink } = useNav(); // Wywołaj useNav i wyciągnij buildLink
  const navigate = useNavigate(); 

  const handleSubmit = async () => {
    setLoading(true);
    setTriggerActions(true);
    setResultMessage(null);
  };

  const handleActionsComplete = (success: boolean) => {
    setLoading(false);
    setTriggerActions(false);
    if (success) {
      setResultMessage("Akcje zakończone pomyślnie!");
      if (successRedirect) {
        const newPath = buildLink(successRedirect); // Użycie buildLink
        navigate(newPath, { replace: true });
      }
    } else {
      setResultMessage("Wystąpił błąd podczas wykonywania akcji.");
    }
  };

  return (
    <div className={className || "container mx-auto"}>
      <button
        onClick={handleSubmit}
        type="submit"
        className="btn btn-primary w-full no-animation"
        disabled={loading}
        aria-label="Submit Form"
      >
        {loading ? "Processing..." : "Submit Form"}
      </button>

      {triggerActions && (
        <ActionBlock
          actions={actions}
          reloadOnParamsChange={false}
          sendComplete={handleActionsComplete} // Pass the callback
        />
      )}

      {resultMessage && (
        <div
          className={`mt-4 ${
            resultMessage.includes("błąd") ? "text-red-500" : "text-green-500"
          }`}
        >
          {resultMessage}
        </div>
      )}
    </div>
  );
};

export default SubmitForm;

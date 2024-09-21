// SubmitForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
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
  const [resultMessage, setResultMessage] = useState<string | null>(null); // State for the message

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async () => {
    setLoading(true);
    setTriggerActions(true);
    setResultMessage(null); // Reset the message
  };

  const handleActionsComplete = (success: boolean) => {
    setLoading(false);
    setTriggerActions(false);
    if (success) {
      setResultMessage("Akcje zakończone pomyślnie!");

      // If a successRedirect URL is provided, navigate to it
      if (successRedirect) {
        // Option 1: Immediate Redirect
        navigate(successRedirect);

        // Option 2: Delayed Redirect (e.g., after 2 seconds)
        // setTimeout(() => {
        //   navigate(successRedirect);
        // }, 2000);
      }
    } else {
      setResultMessage("Wystąpił błąd podczas wykonywania akcji.");
    }
  };

  return (
    <div className={className || "container mx-auto"}>
      <button
        onClick={handleSubmit}
        type="button"
        className="btn btn-primary w-full no-animation"
        disabled={loading}
        aria-labelledby="Submit Form"
      >
        {loading ? "Processing..." : "Submit Form"}
      </button>

      {triggerActions && (
        <ActionBlock
          actions={actions}
          reloadOnParamsChange={false}
          onComplete={handleActionsComplete} // Pass the callback
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

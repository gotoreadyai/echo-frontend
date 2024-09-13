import React, { useState } from "react";
import { usePageStore } from "../stores/pageStore";

interface MutationModule {
  default: React.FC<{ scope: string }>; // Add the expected props here
}

const mutationFiles = import.meta.glob("../actions/*.tsx"); // Import component files dynamically

const SubmitForm: React.FC<{
  className?: string;
  actions: string[];
  scope: string;
}> = ({ className, actions = [], scope }) => {
  const [MutationComponent, setMutationComponent] = useState<React.FC<{
    scope: string;
  }> | null>(null); // State for the dynamic component
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if form has been submitted
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const pageData = usePageStore((state) => state.pageData); // Get form data from global state
  const resetPage = usePageStore((state) => state.resetPage); // Reset form function

  const loadActionComponent = async (action: string) => {
    try {
      const mutationPath = `../actions/${action}.tsx`; // Adjust the path dynamically based on the action prop
      if (mutationFiles[mutationPath]) {
        const mutationModule = await mutationFiles[mutationPath](); // Load the component file dynamically
        if (mutationModule && (mutationModule as MutationModule).default) {
          setMutationComponent(
            () => (mutationModule as MutationModule).default
          ); // Set the loaded component
        } else {
          console.error(`Component not found in module for action: ${action}`);
        }
      } else {
        console.error(`Mutation file: ${mutationPath} not found`);
      }
    } catch (error) {
      console.error("Error loading mutation component:", error);
    }
  };

  const handleSubmit = async () => {
    if (loading) return;

    console.log("Page Data:", pageData);
    setIsSubmitted(false);
    setLoading(true);

    // Process the actions in order
    for (const action of actions) {
      await loadActionComponent(action);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate async operation
    }

    setIsSubmitted(true);
    setLoading(false);

    false && resetPage();
  };

  return (
    <div className={className}>
      <button
        onClick={handleSubmit}
        type="button"
        className="btn btn-primary w-full no-animation"
        disabled={loading}
      >
        {loading ? "Processing..." : "Submit Form"}
      </button>
      {loading && MutationComponent && <MutationComponent scope={scope} />}{" "}
      {/* Pass scope as a prop */}
      {isSubmitted && !loading && <p>All actions completed.</p>}
    </div>
  );
};

export default SubmitForm;

import React, { useEffect, useState } from "react";
import { usePageStore } from "../stores/pageStore";

interface MutationModule {
  default: React.FC<{ scope: string }>;
}

const mutationFiles = import.meta.glob("../actions/*.tsx"); // Import component files dynamically

const ActionBlock: React.FC<{
  actions: string[];
  scope: string;
}> = ({ actions = [], scope }) => {
  const [MutationComponent, setMutationComponent] = useState<React.FC<{
    scope: string;
  }> | null>(null); // State for the dynamic component
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if actions have completed
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const pageData = usePageStore((state) => state.pageData); // Get form data from global state
  const resetPage = usePageStore((state) => state.resetPage); // Reset form function

  const loadActionComponent = async (action: string) => {
    try {
      const mutationPath = `../actions/${action}.tsx`; // Dynamically adjust path
      if (mutationFiles[mutationPath]) {
        const mutationModule = await mutationFiles[mutationPath]();
        if (mutationModule && (mutationModule as MutationModule).default) {
          setMutationComponent(() => (mutationModule as MutationModule).default);
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

  const executeActions = async () => {
    if (loading) return;

    console.log("Page Data:", pageData);
    setIsSubmitted(false);
    setLoading(true);

    // Execute all actions in order
    for (const action of actions) {
      await loadActionComponent(action);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate async operation
    }

    setIsSubmitted(true);
    setLoading(false);

    // Optionally reset page data if needed
    false && resetPage();
  };

  useEffect(() => {
    executeActions(); // Automatically trigger the actions when the component mounts
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="auto-submit-block">
      {loading && MutationComponent && <MutationComponent scope={scope} />}
      {isSubmitted && !loading && <p>All actions completed.</p>}
    </div>
  );
};

export default ActionBlock;

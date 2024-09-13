/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { createItem } from "../services/genericService";
import { usePageStore } from "../stores/pageStore";

const InsertAction: React.FC = ({scope}:any) => {
  const pageData = usePageStore((state) => state.pageData);
  const handleAction = async () => {
    try {
      const result = await createItem("workspaces", {
        title: pageData[scope].title,
        slug: "",
        content: {
          _pageData: {
            layout: "MainDashboard",
          },
        },
      });

      console.log("Sign In successful:", result);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    handleAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>RunSignInAction</>;
};
export default InsertAction;

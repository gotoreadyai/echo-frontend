type ListActionItem = {
  relation?: string;
  preview?: boolean;
};

type ListActions = {
  [key: string]: ListActionItem[];
};

export const listActions: ListActions = {
  workspaces: [{ relation: "documents" }, { preview: true }],
  languages: [{ relation: "lessonObjectives" }],
  lessonObjectives: [{ relation: "bookTitles" }],
};
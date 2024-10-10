export const editConditions = (action: string | undefined) =>
  
  action === "edit-document" ||
  action === "edit-workspace" ||
  action === "edit-side" ||
  action === "edit-block";

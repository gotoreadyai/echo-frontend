import { NavigateFunction, useParams } from "react-router-dom";
import { CrudManagerParams } from "../components/CrudManager/Types";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { workspace, model, related, id } = useParams<CrudManagerParams>();
export const setAction = (
  navigate: NavigateFunction,
  myModel: string,
  myAction: "list" | "create" | "edit",
  myRelated?: string,
  myId?: string
): void => {
  navigate(
    myRelated || related
      ? `/${workspace}/pl/${myModel ? myModel : model}/${myAction}/${
          myRelated ? myRelated : related
        }/${myId ? myId : id}`
      : `/${workspace}/pl/${myModel ? myModel : model}/${myAction}`
  );
};

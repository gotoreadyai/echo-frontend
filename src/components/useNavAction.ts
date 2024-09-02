import { useNavigate, useParams } from "react-router-dom";
import { CrudManagerParams } from "./CrudManager/Types";

export const useNavAction = () => {
  const navigate = useNavigate();
  const { workspace, model, related, id } = useParams<CrudManagerParams>();

  const navAction = (
    myModel: string,
    myAction: 'list' | 'create' | 'edit' | 'edit-blocks',
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

  return { navAction };
};

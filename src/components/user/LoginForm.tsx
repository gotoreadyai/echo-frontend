import { useContext } from "react";
import { CloseRight } from "../editor";
import SlotsRenderer from "../SlotsRenderer";
import { UserContext } from "../../providers/UserProvider";
import { formatDistanceToNow } from "date-fns";
import { signOut } from "../../services/authServices";

const LoginForm: React.FC = () => {
  //const { user, setUserToContext } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const slots = {
    loginForm: [
      {
        id: "75f19de7-4bab-4343-99eb-80a81dc38306",
        filename: "InputBlock",
        data: {
          label: "User email",
          fieldName: "user.email",
          type: "email",
          autocomplete: "username",
          className: "",
        },
      },
      {
        id: "9b7b7f4d-889c-440d-88ed-bf9f4920c256",
        filename: "InputBlock",
        data: {
          label: "Password",
          fieldName: "user.password",
          type: "password",
          autocomplete: "current-password",
          className: "",
        },
      },
      {
        id: "5b8d9266-a445-425b-aae2-59aa0b181314",
        filename: "SubmitForm",
        data: { actions: [{ scope: "user", action: "SignInAction" }] },
      },
    ],
  };

  return (
    <>
      <CloseRight callback={() => {}} label="Login form" />
      {user?.id ? (
        <div className="m-sm p-sm bg-base-200 rounded">
          <h2 className="text-lg font-semibold">User login as:</h2>
          <p className="text-xs font-semibold  mt-sm">Email:</p>
          <p>{user.email}</p>
          <p className="text-xs font-semibold mt-sm">Id:</p>
          <p className="truncate  whitespace-nowrap">{user.id}</p>
          <p className="text-xs font-semibold mt-sm">Expired at:</p>
          <p className="truncate  whitespace-nowrap">
            {formatDistanceToNow(new Date(user.exp * 1000), {
              addSuffix: true,
            })}
          </p>
          <button
            onClick={() => signOut()}
            className="btn btn-primary w-full no-animation btn-outline mt-md"
          >
            Logout
          </button>
        </div>
      ) : (
        <form action="#" className="flex flex-col gap-sm p-sm">
          <SlotsRenderer slots={slots} slotName="loginForm" />
        </form>
      )}
    </>
  );
};

export default LoginForm;

import { CloseRight } from "../editor";
import SlotsRenderer from "../SlotsRenderer";


const LoginForm: React.FC = () => {
  const slots = {
    loginForm: [
      {
        id: "75f19de7-4bab-4343-99eb-80a81dc38306",
        filename: "InputBlock",
        data: {
          label: "User email",
          fieldName: "user.email",
          className: "",
        },
      },
      {
        id: "9b7b7f4d-889c-440d-88ed-bf9f4920c256",
        filename: "InputBlock",
        data: {
          label: "Password",
          fieldName: "user.password",
          className: "",
        },
      },
      {
        id: "5b8d9266-a445-425b-aae2-59aa0b181314",
        filename: "SubmitForm",
        data: { actions: ["AlertAction", "SignInAction"] },
      },
    ],
  };

  return (
    <>
      <CloseRight callback={() => {}} label="Login form" />

      <form className="flex flex-col gap-sm p-sm">
        <SlotsRenderer slots={slots} slotName="loginForm" />
      </form>
    </>
  );
};

export default LoginForm;

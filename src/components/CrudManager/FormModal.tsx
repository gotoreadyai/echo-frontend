import { Logo } from "../Logo";

export const FormModal = ({ children, handleClose }: any) => (
  <dialog open className="modal modal-top">
    <div
      className="modal-backdrop bg-primary-content opacity-20"
      onClick={handleClose}
    ></div>
    <div className="modal-box w-full ">
      <div className="container m-auto flex flex-col gap-md">
        <div className="w-52">
          <Logo />{" "}
        </div>
        <h2 className="text-2xl font-bold">Create New Item</h2>
        <form method="dialog">{children}</form>
      </div>
    </div>
  </dialog>
);

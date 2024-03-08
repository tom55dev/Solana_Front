import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useRef } from "react";

interface ICustomModal {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notCloseOnClickOutside?: boolean;
  className?: string;
}
const CustomModal: React.FC<ICustomModal> = ({ children, ...props }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(ref, () => props.setOpen(false));

  return (
    <div
      className={`fixed w-[100vw] h-[100vh] backdrop-blur-[5px] top-0 left-0 ${
        props.open ? "flex" : "hidden"
      } justify-center items-center z-50`}
    >
      <div
        ref={props?.notCloseOnClickOutside ? null : ref}
        className={`bg-black rounded-[8px] p-[15px] w-[90%] overflow-auto max-h-[90%] lg:w-1/3 gap-5 flex flex-col shadow-[2px_0_1px_rgba(150,150,150,0.5)] text-white border-2 border-main_r ${
          props.className ? `${props.className}` : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomModal;

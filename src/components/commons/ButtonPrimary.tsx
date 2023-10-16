type ButtonPrimary = {
  value: string;
  width?: number;
  onClick?: () => void;
  submit?: boolean;
};
const ButtonPrimary = (props: ButtonPrimary) => {
  return (
    <button
      type={props.submit ? "submit" : ""}
      onClick={props.onClick}
      className={`h-10 flex ${
        props.width ? "w-" + props.width : "30"
      } px-2 text-white justify-center items-center bg-[#79AC78] rounded cursor-pointer`}
    >
      {props.value}
    </button>
  );
};

export default ButtonPrimary;

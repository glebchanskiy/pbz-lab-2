type ButtonItem = {
  content: string | number;
  onClick?: () => void;
};
const ButtonItem = (props: ButtonItem) => {
  return (
    <td onClick={props.onClick} class="px-2 items-center border border-[#D0E7D2] rounded cursor-pointer">
      {props.content}
    </td>
  );
};

export default ButtonItem;

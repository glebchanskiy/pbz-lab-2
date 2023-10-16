type ItemProps = {
  content: string | number;
  width?: number;
  center?: boolean;
  monospace?: boolean
};
const Item = (props: ItemProps) => {

  return (
    // <div
    //   className={`flex ${props.width ? "w-" + props.width : ""} px-2 py-1 ${
    //     props.center ? "justify-center" : "justify-end"
    //   } items-center rounded bg-[#D0E7D2] ${props.monospace ? "font-mono" : ""}`}
    // >
    //   {props.content}
    // </div>
        <td
        className={`px-4 py-1  bg-[#D0E7D2] ${props.monospace ? "font-mono" : ""}`}
      >
        {props.content}
      </td>
  );
};

export default Item;

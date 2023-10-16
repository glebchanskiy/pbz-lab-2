import type { FunctionalComponent, h } from "preact";

interface RowProps {
  children: h.JSX.Element | h.JSX.Element[];
}

const Table: FunctionalComponent<RowProps> = ({ children }) => {
  return (
    <table className="w-full text-left">
      {children}
    </table>
  );
};

export default Table

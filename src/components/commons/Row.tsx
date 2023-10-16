import type { FunctionalComponent, h } from "preact";

interface RowProps {
  children: h.JSX.Element | h.JSX.Element[];
}

const Row: FunctionalComponent<RowProps> = ({ children }) => {
  return (
    // <tr className="flex flex-row gap-1 justify-start">
    //   {children}
    // </tr>
      <tr className="mb-2 border-b border-[#B0D9B1]">
        {children}
      </tr>
  );
};

export default Row

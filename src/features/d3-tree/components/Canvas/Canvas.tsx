import React from "react";

export type Props = {
  height: number;
  width: number;
};
export const Canvas: React.FC<Props> = (props) => {
  const ref = React.useRef<SVGSVGElement>(null);
  const [viewBox, setViewBox] = React.useState([0, 0, 0, 0]);
  React.useEffect(() => {
    if (ref.current) {
      setViewBox(autoBox(ref.current));
    }
  }, []);
  return (
    <svg
      ref={ref}
      display="block"
      height={props.height}
      width={props.width}
      viewBox={viewBox.join(" ")}
    >
      {props.children}
    </svg>
  );
};

function autoBox(svg: SVGSVGElement) {
  const { x, y, width, height } = svg.getBBox();
  return [x, y, width, height];
}

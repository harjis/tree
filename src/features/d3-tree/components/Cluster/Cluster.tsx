import React from "react";

export type Props = {};
export const Cluster: React.FC<Props> = () => {
  const ref = React.useRef<SVGGElement>(null);
  return <g ref={ref} />;
};

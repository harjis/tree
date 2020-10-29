import React from "react";

export type Props = {
  height: number;
  width: number;
};
export const Canvas: React.FC<Props> = (props) => (
  <svg height={props.height} width={props.width}>
    {props.children}
  </svg>
);

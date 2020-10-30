import { select, cluster } from "d3";
import { Props } from "./Cluster";

export const render = <T>(wrapper: SVGGElement, props: Props<T>) => {
  const selection = select(wrapper);
  selection.selectAll("g").remove();

  const pathWrapper = selection
    .append("g")
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5);
  const pointsWrapper = selection.append("g");
  const textWrapper = selection.append("g");

  const dx = 50;
  const dy = props.width / (props.root.height + 1);
  const root = cluster<T>().nodeSize([dx, dy])(props.root);

  pathWrapper
    .selectAll("path")
    .data(root.links())
    .join("path")
    .attr(
      "d",
      (d) => `
        M${d.target.y},${d.target.x}
        C${d.source.y + dy / 2},${d.target.x}
         ${d.source.y + dy / 2},${d.source.x}
         ${d.source.y},${d.source.x}
      `
    );

  pointsWrapper
    .selectAll("circle")
    .data(root.descendants())
    .join("circle")
    .attr("cx", (d) => d.y)
    .attr("cy", (d) => d.x)
    .attr("fill", (d) => (d.children ? "#555" : "#999"))
    .attr("r", 2.5);

  textWrapper
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("stroke-linejoin", "round")
    .attr("stroke-width", 3)
    .selectAll("text")
    .data(root.descendants())
    .join("text")
    .attr("x", (d) => d.y)
    .attr("y", (d) => d.x)
    .attr("dy", "0.31em")
    .attr("dx", (d) => (d.children ? -6 : 6))
    .text((d) => String(d.data[props.labelKey]))
    .filter((d) => !!d.children)
    .attr("text-anchor", "end")
    .clone(true)
    .lower()
    .attr("stroke", "white");
};

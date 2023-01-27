type DistanceProps = {
  from_x: number;
  from_y: number;

  to_x: number;
  to_y: number;
};

export function distance(props: DistanceProps) {
  const { from_x, from_y, to_x, to_y } = props;

  return Math.sqrt((to_x - from_x) ** 2 + (to_y - from_y) ** 2);
}

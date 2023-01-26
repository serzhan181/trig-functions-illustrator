export function rad_to_deg(radian: number) {
  return Math.floor((radian * 180) / Math.PI);
}

export function deg_to_rad(degrees: number) {
  return (degrees * Math.PI) / 180;
}

import { Circle, getTheta } from "./circle";
import "./global.css";

const incrementTheta = getTheta(0);

export interface Pos {
  x: number;
  y: number;
}

export const CENTER: Pos = {
  x: Math.floor(1238 / 2),
  y: Math.floor(650 / 2),
};

document.addEventListener("DOMContentLoaded", () => {
  main();
});

function main() {
  requestAnimationFrame(draw);
}

function draw() {
  const canvas = document.getElementById("unit") as HTMLCanvasElement;

  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Ctx is not defined.");

  ctx.clearRect(0, 0, 1238, 650);

  const circle = new Circle(ctx, "center", 300);
  circle.draw();
  circle.draw_center();

  circle.point_at_angle(incrementTheta());

  window.requestAnimationFrame(draw);
}

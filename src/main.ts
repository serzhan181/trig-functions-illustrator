import { Circle, getTheta } from "./circle";
import "./global.css";

export interface Pos {
  x: number;
  y: number;
}

const incrementTheta = getTheta(0);

const CIRCLE_RAD = 300;

const INITIAL_CIRCLE_POS: Pos = {
  x: CIRCLE_RAD + 10,
  y: CIRCLE_RAD + 10,
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

  const circle = new Circle(ctx, INITIAL_CIRCLE_POS, 300);
  circle.draw();
  circle.draw_center();
  const incremented_theta = incrementTheta();
  circle.point_at_angle(incremented_theta, true);

  // Display the value of theta in terms of degrees;
  const theta = document.getElementById("theta") as HTMLSpanElement;
  theta.textContent = Math.floor(
    (incremented_theta * 180) / Math.PI
  ).toString();

  window.requestAnimationFrame(draw);
}

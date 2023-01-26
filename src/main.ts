import { Circle, getTheta } from "./lib/circle";
import "./global.css";
import { rad_to_deg } from "./helpers/rad_to_deg";

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
  animate();
}

function animate() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cur_theta = incrementTheta();
  const circle = new Circle(ctx, {
    at: INITIAL_CIRCLE_POS,
    radius: 200,
    theta: cur_theta,
    with_right_triangle: true,
  });
  circle.draw();

  // Display angle in degrees;
  const theta_el = document.getElementById("theta") as HTMLSpanElement;
  theta_el.innerText = rad_to_deg(cur_theta).toString();

  requestAnimationFrame(animate);
}

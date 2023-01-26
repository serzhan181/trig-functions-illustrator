import { Angle } from "./store/angle-store";
import { Circle } from "./lib/circle";
import "./global.css";
import { deg_to_rad, rad_to_deg } from "./helpers/convert_theta";
import { INITIAL_CIRCLE_POS, PAUSE_SVG_PATH, PLAY_SVG_PATH } from "./constants";

const angle = new Angle();

export interface Pos {
  x: number;
  y: number;
}

document.addEventListener("DOMContentLoaded", () => {
  main();
});

function main() {
  animate();

  const theta_input_el = document.getElementById(
    "theta-value"
  ) as HTMLInputElement;
  const animate_btn_img = document.getElementById(
    "animate-btn-img"
  ) as HTMLImageElement;

  theta_input_el.addEventListener("input", (e) => {
    // typescript... just... please.
    const value = (e.target as HTMLInputElement).value;

    angle.set_should_update = true;
    angle.update(deg_to_rad(+value));
    angle.set_should_update = false;
    animate_btn_img.src = PLAY_SVG_PATH;
  });

  const animate_btn = document.getElementById("animate-btn");
  animate_btn?.addEventListener("click", () => {
    angle.set_should_update = !angle.shouldUpdate;
    animate_btn_img.src = angle.shouldUpdate ? PAUSE_SVG_PATH : PLAY_SVG_PATH;
  });
}

function animate() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const circle = new Circle(ctx, {
    at: INITIAL_CIRCLE_POS,
    radius: 200,
    theta: angle.value,
    with_right_triangle: true,
  });
  circle.draw();

  // Display angle in degrees;
  const theta_el = document.getElementById("theta") as HTMLSpanElement;
  theta_el.innerText = rad_to_deg(angle.value).toString();

  angle.update(angle.value + 0.01);

  requestAnimationFrame(animate);

  return 1;
}

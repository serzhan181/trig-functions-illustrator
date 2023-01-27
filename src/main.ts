import { Ellipse } from "./lib/ellipse";
import { Angle } from "./store/angle-store";
import { Circle } from "./lib/circle";
import "./global.css";
import { deg_to_rad, rad_to_deg } from "./helpers/convert_theta";
import { CENTER, CIRCLE_RAD, PAUSE_SVG_PATH, PLAY_SVG_PATH } from "./constants";

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
  animate_ellipse();
  listeners();
}

function animate() {
  const canvas = document.getElementById("circle-canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // circle
  const circle = new Circle(ctx, {
    at: CENTER,
    radius: CIRCLE_RAD,
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

let x_par = 0;
let y_par = 0;

function animate_ellipse() {
  const canvas = document.getElementById("ellipse-canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const ellipse = new Ellipse(ctx, {
    at: CENTER,
    radiusX: 350,
    radiusY: 200,
  });
  ellipse.draw();

  ellipse.plot_from_focus(x_par, y_par);

  x_par += 0.5;
  y_par -= 0.5;

  requestAnimationFrame(animate_ellipse);

  return 1;
}

function listeners() {
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

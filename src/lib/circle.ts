import { Pos } from "../main";
import colors from "tailwindcss/colors";

const SIN_COLOR = colors.red[600];
const COS_COLOR = colors.blue[600];
const BACIC_COLOR = colors.neutral[900];

type CircleConfig = {
  at: Pos;
  radius: number;
  with_right_triangle: boolean;
  theta: number;
};

export class Circle {
  // horizontal shift
  k: number;
  // vertical shift
  v: number;

  with_right_triangle: boolean;
  radius: number;
  theta: number;

  constructor(private ctx: CanvasRenderingContext2D, cfg: CircleConfig) {
    this.k = cfg.at.x;
    this.v = cfg.at.y;

    this.with_right_triangle = cfg.with_right_triangle;
    this.radius = cfg.radius;
    this.theta = cfg.theta;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = BACIC_COLOR;
    this.ctx.arc(this.k, this.v, this.radius, 0, 2 * Math.PI);

    this.ctx.stroke();

    this.center_plot();
    this.point_at_angle();
  }

  private plot(x: number, y: number) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.radius * 0.03, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  private center_plot() {
    this.plot(this.k, this.v);
  }

  private point_at_angle() {
    const x_cor = this.radius * Math.cos(this.theta) + this.k;
    const y_cor = this.radius * -Math.sin(this.theta) + this.v;
    this.plot(x_cor, y_cor);

    if (this.with_right_triangle) this.right_triangle(x_cor, y_cor);
  }

  private right_triangle(x_cor: number, y_cor: number) {
    // radius line;
    this.ctx.beginPath();
    this.ctx.strokeStyle = BACIC_COLOR;
    this.ctx.moveTo(this.k, this.v);
    this.ctx.lineTo(x_cor, y_cor);
    this.ctx.stroke();

    // cos line;
    this.ctx.beginPath();
    this.ctx.strokeStyle = COS_COLOR;
    this.ctx.moveTo(this.k, this.v);
    this.ctx.lineTo(x_cor, this.v);
    this.ctx.stroke();

    // sin line;
    /**
     * * I wanted sin line to sit at the tip of the cos so it makes a right triangle.
     */
    this.ctx.beginPath();
    this.ctx.strokeStyle = SIN_COLOR;
    this.ctx.moveTo(x_cor, this.v);
    this.ctx.lineTo(x_cor, y_cor);
    this.ctx.stroke();
  }
}

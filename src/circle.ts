import { Pos } from "./main";
import colors from "tailwindcss/colors";

const SIN_COLOR = colors.red[600];
const COS_COLOR = colors.blue[600];
const BACIC_COLOR = colors.neutral[900];

export class Circle {
  x: number;
  y: number;

  constructor(
    private ctx: CanvasRenderingContext2D,
    public at: Pos,
    public radius: number
  ) {
    this.x = at.x;
    this.y = at.y;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = BACIC_COLOR;
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

    this.ctx.stroke();
  }

  private draw_point(x: number, y: number) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.radius * 0.03, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  draw_center() {
    this.draw_point(this.x, this.y);
  }

  point_at_angle(theta: number, with_right_triangle: boolean) {
    const edge_x = this.radius * Math.cos(theta);
    const edge_y = this.radius * Math.sin(-theta);
    this.draw_point(this.x + edge_x, this.y + edge_y);

    if (with_right_triangle) this.right_triangle(edge_x, edge_y);
  }

  right_triangle(edge_x: number, edge_y: number) {
    // side adjacent (cos)
    this.ctx.beginPath();
    this.ctx.strokeStyle = COS_COLOR;
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x + edge_x, this.y);

    this.ctx.stroke();

    // side opposite (sin)
    /**
     * * It need to be at the tip of cos line, it looks nicer this way (play around to get what i mean);
     */
    this.ctx.beginPath();
    this.ctx.strokeStyle = SIN_COLOR;
    this.ctx.moveTo(this.x + edge_x, this.y);
    this.ctx.lineTo(this.x + edge_x, this.y + edge_y);
    this.ctx.stroke();

    // hypotenuse
    this.ctx.beginPath();
    this.ctx.strokeStyle = BACIC_COLOR;
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x + edge_x, this.y + edge_y);
    this.ctx.stroke();
  }
}

export function getTheta(theta: number) {
  return function incrementTheta() {
    if (theta >= 2 * Math.PI) theta = 0;

    return (theta += 0.005);
  };
}

import { CENTER, Pos } from "./main";

export class Circle {
  x: number;
  y: number;

  constructor(
    private ctx: CanvasRenderingContext2D,
    public at: Pos | "center",
    public radius: number
  ) {
    let x, y;

    if (typeof at === "string" && at === "center") {
      x = CENTER.x;
      y = CENTER.y;
    } else {
      x = at.x;
      y = at.y;
    }

    this.x = x;
    this.y = y;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "black";
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

    this.ctx.stroke();
  }

  private draw_point(x: number, y: number) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.radius * 0.03, 0, 2 * Math.PI, true);
    this.ctx.fill();
  }

  draw_center() {
    this.draw_point(this.x, this.y);
  }

  point_at_angle(theta: number) {
    const edge_x = this.radius * Math.cos(theta);
    const edge_y = this.radius * Math.sin(theta);
    this.draw_point(this.x + edge_x, this.y + edge_y);

    // side adjacent (cos)
    this.ctx.beginPath();
    this.ctx.strokeStyle = "blue";
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x + edge_x, this.y);

    this.ctx.stroke();

    // side opposite (sin)
    /**
     * * It need to be at the tip of cos line, it looks nicer this way (play around to get what i mean);
     */
    this.ctx.beginPath();
    this.ctx.strokeStyle = "red";
    this.ctx.moveTo(this.x + edge_x, this.y);
    this.ctx.lineTo(this.x + edge_x, this.y + edge_y);
    this.ctx.stroke();

    // hypotenuse
    this.ctx.beginPath();
    this.ctx.strokeStyle = "black";
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

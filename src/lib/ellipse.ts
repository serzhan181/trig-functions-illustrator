import { PRIMARY_COLOR } from "../constants";
import { distance } from "../helpers/distance";
import { Pos } from "./../main";

type EllipseConfig = {
  at: Pos;
  radiusX: number;
  radiusY: number;
};

export class Ellipse {
  // horizontal shift
  k: number;
  // vertical shift
  v: number;

  foci: [[number, number], [number, number]] = [
    [0, 0],
    [0, 0],
  ];

  radiusX: number;
  radiusY: number;
  c: number;

  constructor(public ctx: CanvasRenderingContext2D, cfg: EllipseConfig) {
    this.k = cfg.at.x;
    this.v = cfg.at.y;

    this.radiusX = cfg.radiusX;
    this.radiusY = cfg.radiusY;

    const a = Math.max(this.radiusX, this.radiusY);
    const b = Math.min(this.radiusX, this.radiusY);

    const r = Math.sqrt(a ** 2 - b ** 2);

    if (this.radiusX > this.radiusY) {
      this.foci[0][0] = r + this.k;
      this.foci[0][1] = this.v;

      this.foci[1][0] = -r + this.k;
      this.foci[1][1] = this.v;
    } else if (this.radiusX < this.radiusY) {
      this.foci[0][0] = this.k;
      this.foci[0][1] = r + this.v;

      this.foci[1][0] = this.k;
      this.foci[1][1] = -r + this.v;
    }

    this.c = 2 * Math.max(this.radiusX, this.radiusY);
  }

  draw() {
    // Draw the ellipse
    this.ctx.beginPath();
    this.ctx.ellipse(
      this.k,
      this.v,
      this.radiusX,
      this.radiusY,
      0,
      0,
      2 * Math.PI
    );
    this.ctx.stroke();

    this.locate_foci();
  }

  locate_foci() {
    const focus_1_x = this.foci[0][0];
    const focus_1_y = this.foci[0][1];

    const focus_2_x = this.foci[1][0];
    const focus_2_y = this.foci[1][1];

    this.plot(focus_1_x, focus_1_y);
    this.plot(focus_2_x, focus_2_y);
  }

  plot_from_focus(x: number, y: number) {
    const focus_x = this.foci[0][0];
    const focus_y = this.foci[0][1];

    const plot_x = focus_x + x;
    const plot_y = focus_y + y;

    const local_c = this.calculate_point_from_foci(plot_x, plot_y);

    if (local_c >= this.c) {
      this.plot(focus_x - x, focus_y - y, "red");
      console.log("collision");
      return { move_x: 0.5, move_y: 0.5 };
    } else {
      this.plot(plot_x, plot_y);
      return { move_x: 0.5, move_y: 0.5 };
    }
  }

  private calculate_point_from_foci(x: number, y: number) {
    const focus_1_x = this.foci[0][0];
    const focus_1_y = this.foci[0][1];

    const focus_2_x = this.foci[1][0];
    const focus_2_y = this.foci[1][1];

    const d1 = distance({
      from_x: focus_1_x,
      from_y: focus_1_y,

      to_x: x,
      to_y: y,
    });

    const d2 = distance({
      from_x: focus_2_x,
      from_y: focus_2_y,

      to_x: x,
      to_y: y,
    });

    return d1 + d2;
  }

  private plot(x: number, y: number, color?: string) {
    this.ctx.beginPath();

    if (color) {
      this.ctx.fillStyle = color;
    } else {
      this.ctx.fillStyle = PRIMARY_COLOR;
    }

    this.ctx.arc(x, y, 5, 0, 2 * Math.PI);
    this.ctx.fill();
  }
}

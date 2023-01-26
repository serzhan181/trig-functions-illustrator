// Value is assumed to be in radians;
export class Angle {
  value: number;
  shouldUpdate?: boolean;
  constructor(initial = 0) {
    this.value = initial;
    this.shouldUpdate = true;
  }

  update(angle: number) {
    if (!this.shouldUpdate) return;
    if (angle > 2 * Math.PI) {
      this.value = 0;
    } else {
      this.value = angle;
    }
  }

  set set_should_update(shouldUpdate: boolean) {
    this.shouldUpdate = shouldUpdate;
  }
}

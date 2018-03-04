import Point from "../basic/point";

export default class Wall {
    constructor(private bounds: Point[]) {
    }

    public getBounds(): Point[] {
        return this.bounds;
    }
}

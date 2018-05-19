export default class Point {
    constructor(private x: number, private y: number) {
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public equalTo(point: Point): boolean {
        return (this.getX() === point.getX()) && (this.getY() === point.getY());
    }
}

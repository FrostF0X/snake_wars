import { BoardCell } from "../../application/configuration";
import Point from "../basic/point";
import Snake from "../snake/snake";
import Board from "./board";

export default class BoarToArrayMapper {
    public static mapToArray(board: Board): any[][] {
        const array: any[] = this.createArray(board);
        this.addApple(board, array);
        this.fillWithAliveSnakes(board, array);
        this.fillWithDeadSnakes(board, array);
        return array;
    }

    private static addApple(board: Board, array: any[][]): void {
        array[board.getApple().getX()][board.getApple().getY()] = BoardCell.Apple;
    }

    private static fillWithAliveSnakes(board: Board, array: any[][]): void {
        board.getAliveSnakes().forEach((snake: Snake) => {
            this.fillWithAliveSnake(array, snake);
        });
    }

    private static fillWithDeadSnakes(board: Board, array: any[][]): void {
        board.getDeadSnakes().forEach((snake: Snake) => {
            this.fillWithDeadSnake(array, snake);
        });
    }

    private static fillWithAliveSnake(array: any[][], snake: Snake): void {
        array[snake.getHead().getX()][snake.getHead().getX()] = {
            [BoardCell.Player]: snake.getIndex(), [BoardCell.Head]: snake.getDirection(),
        };

        snake.getBody().forEach((point: Point) => {
            array[point.getX()][point.getY()] = {[BoardCell.Player]: snake.getIndex()};
        });
    }

    private static fillWithDeadSnake(array: any[][], snake: Snake): void {
        const bounds: Point[] = snake.getBounds();
        bounds.forEach((point: Point) => {
            array[point.getX()][point.getY()] = {[BoardCell.Dead]: true};
        });
    }

    private static createArray(board: Board): any[][] {
        const array: any[] = (new Array(board.getSize().getHeight())).fill(undefined);
        for (let i: number = 0; i < board.getSize().getWidth(); i++) {
            array[i] = (new Array(board.getSize().getWidth())).fill(undefined);
        }
        return array;
    }
}

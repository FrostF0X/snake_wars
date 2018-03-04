import Dimension from "../game/basic/dimension";
import { Direction } from "../game/basic/direction";
import Point from "../game/basic/point";
import InitialSnakeConfiguration from "../game/snake/initial-snake-configuration";
import InitialWallConfiguration from "../game/wall/initial-wall-configuration";

export const INITIAL_SNAKES_DATA: InitialSnakeConfiguration[] = [
    new InitialSnakeConfiguration(new Point(15, 15), Direction.Left, 3),
    new InitialSnakeConfiguration(new Point(15, 45), Direction.Right, 3),
    new InitialSnakeConfiguration(new Point(45, 15), Direction.Left, 3),
    new InitialSnakeConfiguration(new Point(45, 45), Direction.Right, 3),
];

export const INITIAL_WALLS_DATA: InitialWallConfiguration[] = [
    new InitialWallConfiguration(new Point(-1, 0), Direction.Down, 60),
    new InitialWallConfiguration(new Point(0, -1), Direction.Right, 60),
    new InitialWallConfiguration(new Point(60, 0), Direction.Down, 60),
    new InitialWallConfiguration(new Point(0, 60), Direction.Right, 60),
];

export const TIMEOUT: number = 200;

export const SIZE: Dimension = new Dimension(59, 59);

export const SNAKES_DIR: string = "snakes";
export const INDEX_FILE: string = "index.js";

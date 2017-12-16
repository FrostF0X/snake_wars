import SnakeGordon from "../../snake-gordon/src/index";
import BatmanSnake from "../../batman/index";
import Michal from "../../snake/snake";

export const TOP = "N";
export const LEFT = "W";
export const RIGHT = "E";
export const DOWN = "S";

export const INITIAL_SNAKES = [
    {head: {x: 15, y: 15}, direction: LEFT, length: 3},
    {head: {x: 15, y: 45}, direction: RIGHT, length: 3},
    {head: {x: 45, y: 15}, direction: RIGHT, length: 3},
    {head: {x: 15, y: 45}, direction: RIGHT, length: 3},
];

export const PLAYERS_ALGORITHMS = [
    SnakeGordon,
    BatmanSnake,
    Michal
];

export const INITIAL_WALLS = [
    {start: {x: -1, y: 0}, direction: DOWN, length: 60},
    {start: {x: 0, y: -1}, direction: RIGHT, length: 60},
    {start: {x: 60, y: 0}, direction: DOWN, length: 60},
    {start: {x: 0, y: 60}, direction: RIGHT, length: 60},
];

export const TIMEOUT = 200;

export const SIZE = {width: 59, height: 59};

export const DEAD = false;
export const ALIVE = true;

export const TURN_LEFT = "L";
export const TURN_RIGHT = "R";

export const PLAYER_MARKER = "player";
export const HEAD_MARKER = "head";
export const DEAD_MARKER = "dead";
export const APPLE_MARKER = "🍎";



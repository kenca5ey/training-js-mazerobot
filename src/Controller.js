import {matrix, types} from './Config';
import {obstacleAhead, pathAhead, moveInDirection} from './ControlRoom';

export function isPositionAvailable(matrix, position) {
    return typeof matrix[position.y] !== 'undefined'
        && typeof matrix[position.y][position.x] !== 'undefined'
        && types[matrix[position.y][position.x]] !== 'obstacle';
}

export function isPositionInFrontAvailable(matrix, position, direction) {
    switch (direction) {
        case 'east':
            return isPositionAvailable(matrix, {
                x: position.x + 1,
                y: position.y
            });
        case 'south':
            return isPositionAvailable(matrix, {
                x: position.x,
                y: position.y + 1
            });
        case 'west':
            return isPositionAvailable(matrix, {
                x: position.x - 1,
                y: position.y
            });
        case 'north':
            return isPositionAvailable(matrix, {
                x: position.x,
                y: position.y - 1
            });
    }
}

export function isPositionToLeftOfTravelAvailable(matrix, position, direction) {
    switch (direction) {
        case 'east':
            return isPositionAvailable(matrix, {
                x: position.x,
                y: position.y - 1
            });
        case 'south':
            return isPositionAvailable(matrix, {
                x: position.x + 1,
                y: position.y
            });
        case 'west':
            return isPositionAvailable(matrix, {
                x: position.x,
                y: position.y + 1
            });
        case 'north':
            return isPositionAvailable(matrix, {
                x: position.x - 1,
                y: position.y
            });
    }
}

export function isPositionToRightOfTravelAvailable(matrix, position, direction) {
    switch (direction) {
        case 'east':
            return isPositionAvailable(matrix, {
                x: position.x,
                y: position.y + 1
            });
        case 'south':
            return isPositionAvailable(matrix, {
                x: position.x - 1,
                y: position.y
            });
        case 'west':
            return isPositionAvailable(matrix, {
                x: position.x,
                y: position.y - 1
            });
        case 'north':
            return isPositionAvailable(matrix, {
                x: position.x + 1,
                y: position.y
            });
    }
}

function getDirectionToLeft(direction) {
    switch (direction) {
        case 'east':
            return 'north';
        case 'south':
            return 'east';
        case 'west':
            return 'south';
        case 'north':
            return 'west';
    }
}

function getDirectionToRight(direction) {
    switch (direction) {
        case 'east':
            return 'south';
        case 'south':
            return 'west';
        case 'west':
            return 'north';
        case 'north':
            return 'east';
    }
}

export default function (robot) {
    // return isPositionInFrontAvailable(matrix, robot.position, robot.direction) ?
    //     pathAhead(robot.position, robot.direction) :
    //     obstacleAhead(robot.position, robot.direction);

    if (isPositionToLeftOfTravelAvailable(matrix, robot.position, robot.direction)) {
        return moveInDirection(robot.position, getDirectionToLeft(robot.direction));
    } else if (isPositionInFrontAvailable(matrix, robot.position, robot.direction)) {
        return moveInDirection(robot.position, robot.direction);
    } else if (isPositionToRightOfTravelAvailable(matrix, robot.position, robot.direction)) {
        return moveInDirection(robot.position, getDirectionToRight(robot.direction));
    }
}

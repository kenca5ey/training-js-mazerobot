import {matrix, types} from './Config';
import {moveToEast, fireMissile} from './ControlRoom';

export function isPositionAvailable(matrix, position) {
    return typeof matrix[position.y] !== 'undefined'
        && typeof matrix[position.y][position.x] !== 'undefined'
        && types[matrix[position.y][position.x]] !== 'obstacle';
}

export function isWallWithinThreeStepsToEast(matrix, position) {
    for (let i = position.x + 1; i < position.x + 3; i++) {
        if (matrix[0][i]) {
            return true;
        }
    }
    return false;
}

export default function (robot) {
    if (isWallWithinThreeStepsToEast(matrix, robot.position)) {
        return fireMissile(robot.position);
    } else {
        return moveToEast(robot.position);
    }
}

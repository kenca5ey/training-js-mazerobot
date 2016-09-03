import {matrix} from './Config';

export function isMissileHittingWall(matrix, position) {
    return matrix[position.y][position.x];
}

export default function (missile, robot) {
    if (robot.missileFired) {
        if (isMissileHittingWall(matrix, missile.position)) {
            return {
                position: {
                    x: robot.position.x,
                    y: robot.position.y
                },
                explosionPosition: {
                    x: missile.position.x,
                    y: missile.position.y
                },
                transition: 'off',
                hitWall: true,
                direction: robot.direction,
                log: 'Missile spawning back on Robot!'
            }
        } else {
            return {
                position: {
                    x: missile.position.x + 1,
                    y: missile.position.y
                },
                transition: 'on',
                direction: 'east',
                log: 'Missile moving east!'
            };
        }
    } else {
        return {
            position: {
                x: robot.position.x,
                y: robot.position.y
            },
            transition: 'on',
            direction: robot.direction,
            log: 'Missile staying on Robot!'
        }
    }
}
export function moveToEast(position) {
    return {
        position: {
            x: position.x + 1,
            y: position.y
        },
        direction: 'east',
        log: 'I am moving east!'
    };
}

export function fireMissile(position) {
    return {
        position: {
            x: position.x,
            y: position.y
        },
        missileFired: true,
        direction: 'east',
        log: 'I am Firing'
    }
}
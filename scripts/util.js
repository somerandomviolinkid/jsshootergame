let c = document.getElementById("gameWindow");
let ctx = c.getContext("2d");

function distance(point1, point2) {
    //if you don't know what this does go to a mental hopsital
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}

function lineInt(point1, point2, point3, point4) {
    //calculates where two line segments intersect
    let a = point1.x - point3.x;
    let b = point3.y - point4.y;
    let c = point1.y - point3.y;
    let d = point3.x - point4.x;
    let e = point1.x - point2.x;
    let f = point1.y - point2.y;

    let num1 = (a * b) - (c * d);
    let num2 = (a * f) - (c * e);

    let den = (e * b) - (f * d);

    let t = num1 / den;
    let u = num2 / den;

    if (0 <= t && t <= 1 && 0 <= u && u <= 1) {
        let intersection = {
            x: point1.x + (t * (point2.x - point1.x)),
            y: point1.y + (t * (point2.y - point1.y))
        };
        return intersection;
    } else {
        return null;
    }
}

function verline(x, y0, y1, r, g, b) {
    //draws a vertical line on screen
    ctx.beginPath();
    ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
    ctx.fillRect(x, y0, x, y1);
}

function convertCoordinatesToObject(x, y) {
    //converts two numbers into object format for easier calculation
    let pointObj = { x: x, y: y }
    return pointObj;
}

function normalizeAngle(angle) {
    //converts angle to between 0 and 2pi
    if (angle < 0) {
        angle += Math.PI * 2;
    }
    if (angle >= Math.PI * 2) {
        angle -= Math.PI * 2;
    }
    return angle;
}

function worldPosToCameraPos(position) {
    //translates a world position into camera space ??
    const result = {x: position.x - playerPos.x, y: position.y - playerPos.y};
    return {
        x: (result.x * Math.sin(playerDirection)) - (result.y * Math.cos(playerDirection)),
        y: (result.x * Math.cos(playerDirection)) + (result.y * Math.sin(playerDirection))
    }
}
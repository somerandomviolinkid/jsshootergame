let c = document.getElementById("gameWindow");
let ctx = c.getContext("2d");

let pi = Math.PI;

function distance(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}

function lineInt(point1, point2, point3, point4) {
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
            y: point1.y + (t * (point2.y - point1.y)) };
        return intersection;
    } else {
        return null;
    }
}
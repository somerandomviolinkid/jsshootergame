function drawWalls() {
    for (let screenX = 0; screenX < screenWidth; screenX++) {
        let playerViewEnd = {
            x: playerPos.x + (Math.cos(
                playerDirection - (playerFov / 2) + (playerFov * (screenX / screenWidth))) * renderDistance
            ),
            y: playerPos.y + (Math.sin(
                playerDirection - (playerFov / 2) + (playerFov * (screenX / screenWidth))) * renderDistance
            )
        }

        let wallDists = []

        for (let i = 1; i < mapData.length; i++) {
            let intersection = lineInt(playerPos, playerViewEnd, mapData[i], mapData[i - 1]);
            if (intersection != null) {
                let dist = distance(playerPos, intersection) + playerSize;
                //dist /= Math.cos(((playerFov / 2) + (playerFov * (screenX / screenWidth))) - playerDirection);
                wallDists.push(dist);
            }
        }

        wallDists.sort((a, b) => a - b);
        let finalDist = wallDists[0];
        let color = 256 / finalDist;

        ctx.beginPath();
        ctx.strokeStyle = "rgb(" + color + "," + color + "," + color + ")";
        ctx.moveTo(screenX, screenHeight2 - (screenHeight / finalDist));
        ctx.lineTo(screenX, screenHeight2 + (screenHeight / finalDist));
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "gray";
        ctx.moveTo(screenX, (0));
        ctx.lineTo(screenX, screenHeight2 - (screenHeight / finalDist));
        ctx.moveTo(screenX, screenHeight2 + (screenHeight / finalDist));
        ctx.lineTo(screenX, screenHeight);
        ctx.stroke();
    }
}

/*
function drawPoints() {
    for (const i in points) {
        let pointPos = points[i].position;
        let endPlayerPos = {
            x: playerPos.x + (Math.cos(playerDirection) * pointRenderDistance),
            y: playerPos.y + (Math.sin(playerDirection) * pointRenderDistance)
        }
        let pointAngle = (
            Math.atan2(pointPos.y - playerPos.y, pointPos.x - playerPos.x) -
            Math.atan2(endPlayerPos.y - playerPos.y, endPlayerPos.x - playerPos.x));
        if (pointAngle < (playerFov / 2)) {
            let pointDist = distance(pointPos, playerPos);
            ctx.fillrect(, screenHeight2)
        }
    }
}
*/


function frame3d() {
    ctx.clearRect(0, 0, screenWidth, screenHeight)
    drawWalls();
    //drawPoints();
    tickCounter++;
}


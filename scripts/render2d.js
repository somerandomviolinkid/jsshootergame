function drawMap() {

    ctx.clearRect(0, 0, screenWidth, screenHeight);

    ctx.beginPath();
    ctx.strokeStyle = "black"
    ctx.moveTo(screenWidth / 2, 0);
    ctx.lineTo(screenWidth / 2, screenHeight);
    ctx.moveTo(0, screenHeight / 2);
    ctx.lineTo(screenWidth, screenHeight / 2);
    ctx.stroke();

    for (let i = 0; i < mapData[mapSelect].length; i++) {
        let m = mapData[mapSelect][i];

        ctx.beginPath();
        ctx.strokeStyle = "rgb(" + m.r + "," + m.g + "," + m.b + ")";
        ctx.moveTo(screenWidth2 + (m.x1 * scale2d), screenHeight2 - (m.y1 * scale2d));
        ctx.lineTo(screenWidth2 + (m.x2 * scale2d), screenHeight2 - (m.y2 * scale2d));
        ctx.stroke();
    }
}

function drawPlayer() {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.ellipse(
        screenWidth2 + (playerPos.x * scale2d),
        screenHeight2 - (playerPos.y * scale2d),
        playerSize * scale2d,
        playerSize * scale2d,
        0, 0, pi * 2, false);
    ctx.moveTo(
        screenWidth2 + (playerPos.x * scale2d),
        screenHeight2 - (playerPos.y * scale2d));
    ctx.lineTo(
        screenWidth2 + (Math.cos(playerDirection - (playerFov / 2)) * scale2d) + (playerPos.x * scale2d),
        screenHeight2 - (Math.sin(playerDirection - (playerFov / 2)) * scale2d) - (playerPos.y * scale2d))
    ctx.moveTo(
        screenWidth2 + (playerPos.x * scale2d),
        screenHeight2 - (playerPos.y * scale2d)
    );
    ctx.lineTo(
        screenWidth2 + (Math.cos(playerDirection + (playerFov / 2)) * scale2d) + (playerPos.x * scale2d),
        screenHeight2 - (Math.sin(playerDirection + (playerFov / 2)) * scale2d) - (playerPos.y * scale2d)
    );
    ctx.stroke();
}

function playerView() {

    for (let screenX = 0; screenX <= screenWidth; screenX++) {

        let rayAngle = playerDirection + (playerFov / 2) - ((playerFov * screenX) / screenWidth);

        let rayPos = {
            x: playerPos.x + (
                Math.cos(rayAngle) * renderDistance
            ),
            y: playerPos.y + (
                Math.sin(rayAngle) * renderDistance
            ),
        }

        let intersections = [];

        for (let i = 0; i < mapData[mapSelect].length; i++) {
            let currentWall = mapData[mapSelect][i];
            let vertex1 = convertCoordinatesToObject(currentWall.x1, currentWall.y1);
            let vertex2 = convertCoordinatesToObject(currentWall.x2, currentWall.y2);
            let intPoint = lineInt(playerPos, rayPos, vertex1, vertex2);
            if (intPoint != null) {
                let dist = distance(playerPos, intPoint);
                intersections.push(dist);
            }
        }

        intersections.sort((a, b) => a - b);
        let finalDist = intersections[0];

        ctx.beginPath();
        ctx.moveTo(
            screenWidth2 + (playerPos.x * scale2d),
            screenHeight2 - (playerPos.y * scale2d));
        ctx.lineTo(
            screenWidth2 + (playerPos.x * scale2d) + (finalDist * Math.cos(rayAngle) * scale2d),
            screenHeight2 - (playerPos.y * scale2d) - (finalDist * Math.sin(rayAngle) * scale2d));
        ctx.stroke();
    }

}

function frame2d() {
    drawMap();
    drawPlayer();
    playerView();
    tickCounter++;
}
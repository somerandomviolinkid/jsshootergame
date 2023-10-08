function drawMap() {

    ctx.clearRect(0, 0, screenWidth, screenHeight);

    ctx.beginPath();
    ctx.moveTo(screenWidth / 2, 0);
    ctx.lineTo(screenWidth / 2, screenHeight);
    ctx.moveTo(0, screenHeight / 2);
    ctx.lineTo(screenWidth, screenHeight / 2);
    ctx.stroke();

    for (let i = 1; i < mapData.length; i++) {
        let m = mapData[i - 1];
        let n = mapData[i];

        ctx.beginPath();
        ctx.moveTo(screenWidth2 + (m.x * scale2d), screenHeight2 + (m.y * scale2d));
        ctx.lineTo(screenWidth2 + (n.x * scale2d), screenHeight2 + (n.y * scale2d));
        ctx.stroke();
    }
}

function drawPlayer() {
    ctx.beginPath();
    ctx.ellipse(
        screenWidth2 + (playerPos.x * scale2d),
        screenHeight2 + (playerPos.y * scale2d),
        playerSize * scale2d,
        playerSize * scale2d,
        0, 0, pi * 2, false);
    ctx.moveTo(
        screenWidth2 + (playerPos.x * scale2d),
        screenHeight2 + (playerPos.y * scale2d));
    ctx.lineTo(
        screenWidth2 + (Math.cos(playerDirection - (playerFov / 2)) * scale2d) + (playerPos.x * scale2d),
        screenHeight2 + (Math.sin(playerDirection - (playerFov / 2)) * scale2d) + (playerPos.y * scale2d))
    ctx.moveTo(
        screenWidth2 + (playerPos.x * scale2d),
        screenHeight2 + (playerPos.y * scale2d));
    ctx.lineTo(
        screenWidth2 + (Math.cos(playerDirection + (playerFov / 2)) * scale2d) + (playerPos.x * scale2d),
        screenHeight2 + (Math.sin(playerDirection + (playerFov / 2)) * scale2d) + (playerPos.y * scale2d))
    ctx.stroke();
}

function playerView() {

    let playerViewEnd = {
        x: playerPos.x + (Math.cos(playerDirection) * renderDistance),
        y: playerPos.y + (Math.sin(playerDirection) * renderDistance)
    }

    let intersections = [];

    for (let i = 1; i < mapData.length; i++) {
        let intPoint = lineInt(playerPos, playerViewEnd, mapData[i], mapData[i - 1]);
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
        screenHeight2 + (playerPos.y * scale2d));
    ctx.lineTo(
        screenWidth2 + (playerPos.x * scale2d) + (finalDist * Math.cos(playerDirection) * scale2d),
        screenHeight2 + (playerPos.y * scale2d) + (finalDist * Math.sin(playerDirection) * scale2d));
    ctx.stroke();
}

function frame2d() {
    drawMap();
    drawPlayer();
    playerView();
    tickCounter++;
}
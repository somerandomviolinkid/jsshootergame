function drawWalls() {
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

        let renderList = []

        for (let i = 0; i < mapData[mapSelect].length; i++) {
            let currentWall = mapData[mapSelect][i];
            let vertex1 = convertCoordinatesToObject(currentWall.x1, currentWall.y1);
            let vertex2 = convertCoordinatesToObject(currentWall.x2, currentWall.y2);
            let intersection = lineInt(playerPos, rayPos, vertex1, vertex2);
            if (intersection != null) {
                let dist = distance(playerPos, intersection);
                let wallData = {d: dist, red: currentWall.r, green: currentWall.g, blue: currentWall.b}
                renderList.push(wallData);
            }
        }

        renderList.sort((a, b) => a.d - b.d);
        let finalDist = renderList[0].d;
        finalDist *= Math.cos(playerDirection - rayAngle);
        let shading = ((Math.pow(2, 5)) * Math.sqrt(finalDist));

        let screen1 = screenHeight2 - Math.floor(screenHeight2 / finalDist);
        let screen2 = screenHeight2 + Math.floor(screenHeight2 / finalDist)

        verline(screenX, 0, screen1, 96, 96, 96);
        verline(screenX, screen1, screen2, renderList[0].red - shading, renderList[0].green - shading, renderList[0].blue - shading);
        verline(screenX, screen2, screenHeight, 64, 64, 64);

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

function drawBullets() {
    for (let i = 0; i < bullets.length; i++) {
        if (bullets[i].playerDist > bullets[i].endDist) {
            bullets.splice(i, 1);
            continue;
        }
        ctx.fillStyle = "red";
        ctx.fillRect(screenWidth2, screenHeight - ((screenHeight2 / 2) + ((screenHeight2 / 2) * (bullets[i].playerDist / bullets[i].endDist))), 5, 5);
        bullets[i].playerDist += 10 / maxFPS;
    }
}


function frame3d() {
    ctx.clearRect(0, 0, screenWidth, screenHeight)
    drawWalls();
    drawBullets();
    //drawPoints();
    tickCounter++;
}



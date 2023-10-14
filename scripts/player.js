function verifyMovement() {

}

function shoot() {
    let wallDists = [];
    for (let i = 0; i < mapData[mapSelect].length; i++) {
        let currentWall = mapData[mapSelect][i];
        let vertex1 = convertCoordinatesToObject(currentWall.x1, currentWall.y1);
        let vertex2 = convertCoordinatesToObject(currentWall.x2, currentWall.y2);
        let end = {
            x: playerPos.x + (Math.cos(playerDirection) * renderDistance),
            y: playerPos.y + (Math.sin(playerDirection) * renderDistance)
        }
        let intersection = intersection(playerPos, end, vertex1, vertex2);
        if (intersection != null) {
            let dist = distance(playerPos, intersection);
        }
        wallDists.push(dist);
    }
    renderList.sort((a, b) => a - b);
    let finalDist = renderList[0];

}


document.getElementById("body").addEventListener(
    "keydown",
    (event) => {
        if (event.defaultPrevented) {
            return;
        }
        let playerCos = Math.cos(playerDirection);
        let playerSin = Math.sin(playerDirection);
        let playerMoveCos = playerSpeed * playerCos;
        let playerMoveSin = playerSpeed * playerSin;
        let playerSizeCos = playerSize * playerCos;
        let playerSizeSin = playerSize * playerSin;

        let playerEnd = { x: 0, y: 0 }
        let playerEndSize = { x: 0, y: 0 }
        let move = true;

        switch (event.code) {
            case "KeyW":
                playerEnd = { x: playerPos.x + playerMoveCos, y: playerPos.y + playerMoveSin };
                playerEndSize = {
                    x: playerPos.x + playerMoveCos + playerSizeCos,
                    y: playerPos.y + playerMoveSin + playerSizeSin
                }

                for (let i = 0; i < mapData[mapSelect].length; i++) {
                    let currentWall = mapData[mapSelect][i];
                    let vertex1 = convertCoordinatesToObject(currentWall.x1, currentWall.y1);
                    let vertex2 = convertCoordinatesToObject(currentWall.x2, currentWall.y2);
                    let intersection = lineInt(playerPos, playerEndSize, vertex1, vertex2);
                    if (intersection === null) {
                        continue;
                    } else {
                        move = false;
                    }
                }
                if (move === true) {
                    playerPos = playerEnd;
                }
                break;
            case "KeyS":
                playerEnd = { x: playerPos.x - playerMoveCos, y: playerPos.y - playerMoveSin };
                playerEndSize = {
                    x: playerPos.x - playerMoveCos - playerSizeCos,
                    y: playerPos.y - playerMoveSin - playerSizeSin
                }
                for (let i = 0; i < mapData[mapSelect].length; i++) {
                    let currentWall = mapData[mapSelect][i];
                    let vertex1 = convertCoordinatesToObject(currentWall.x1, currentWall.y1);
                    let vertex2 = convertCoordinatesToObject(currentWall.x2, currentWall.y2);
                    let intersection = lineInt(playerPos, playerEndSize, vertex1, vertex2);
                    if (intersection === null) {
                        continue;
                    } else {
                        move = false;
                    }
                }
                if (move === true) {
                    playerPos = playerEnd;
                }
                break;
            case "KeyA":
                playerEnd = { x: playerPos.x - playerMoveSin, y: playerPos.y + playerMoveCos };
                playerEndSize = {
                    x: playerPos.x - playerMoveSin,
                    y: playerPos.y + playerMoveCos
                }
                for (let i = 0; i < mapData[mapSelect].length; i++) {
                    let currentWall = mapData[mapSelect][i];
                    let vertex1 = convertCoordinatesToObject(currentWall.x1, currentWall.y1);
                    let vertex2 = convertCoordinatesToObject(currentWall.x2, currentWall.y2);
                    let intersection = lineInt(playerPos, playerEndSize, vertex1, vertex2);
                    if (intersection === null) {
                        continue;
                    } else {
                        move = false;
                    }
                }
                if (move === true) {
                    playerPos = playerEnd;
                }
                break;
            case "KeyD":
                playerEnd = { x: playerPos.x + playerMoveSin, y: playerPos.y - playerMoveCos };
                playerEndSize = {
                    x: playerPos.x + playerMoveSin,
                    y: playerPos.y - playerMoveCos
                }
                for (let i = 0; i < mapData[mapSelect].length; i++) {
                    let currentWall = mapData[mapSelect][i];
                    let vertex1 = convertCoordinatesToObject(currentWall.x1, currentWall.y1);
                    let vertex2 = convertCoordinatesToObject(currentWall.x2, currentWall.y2);
                    let intersection = lineInt(playerPos, playerEndSize, vertex1, vertex2);
                    if (intersection === null) {
                        continue;
                    } else {
                        move = false;
                    }
                }
                if (move === true) {
                    playerPos = playerEnd;
                }
                break;
            case "KeyE":
                playerDirection -= playerRotateSpeed;
                break;
            case "KeyQ":
                playerDirection += playerRotateSpeed;
                break;
            case "Space":
                console.log("booyah")
        }

    }, true);
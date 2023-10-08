let playerPos = { x: 0, y: 0 }
let playerDirection = 0;
let playerSpeed = 0.25;
let playerSize = 0.5;
let playerRotateSpeed = pi / 32;
let playerFov = pi / 2;
let renderDistance = 50;
let pointRenderDistance = 25;

document.getElementById("gameWindow").addEventListener(
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

        let playerEnd = {x: 0, y: 0}
        let playerEndSize = {x: 0, y: 0}
        let move = true;

        switch (event.code) {
            case "KeyW":
                playerEnd = {x: playerPos.x + playerMoveCos, y: playerPos.y + playerMoveSin};
                playerEndSize = {
                    x: playerPos.x + playerMoveCos, 
                    y: playerPos.y + playerMoveSin
                }
                for (let i = 1; i < mapData.length; i++) {
                    let intersection = lineInt(playerPos, playerEndSize, mapData[i], mapData[i - 1]);
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
                playerEnd = {x: playerPos.x - playerMoveCos, y: playerPos.y - playerMoveSin};
                playerEndSize = {
                    x: playerPos.x - playerMoveCos, 
                    y: playerPos.y - playerMoveSin
                }
                for (let i = 1; i < mapData.length; i++) {
                    let intersection = lineInt(playerPos, playerEndSize, mapData[i], mapData[i - 1]);
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
                playerEnd = {x: playerPos.x + playerMoveSin, y: playerPos.y - playerMoveCos};
                playerEndSize = {
                    x: playerPos.x + playerMoveSin, 
                    y: playerPos.y - playerMoveCos
                }
                for (let i = 1; i < mapData.length; i++) {
                    let intersection = lineInt(playerPos, playerEnd, mapData[i], mapData[i - 1]);
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
                playerEnd = {x: playerPos.x - playerMoveSin, y: playerPos.y + playerMoveCos};
                playerEndSize = {
                    x: playerPos.x - playerMoveSin, 
                    y: playerPos.y + playerMoveCos
                }
                for (let i = 1; i < mapData.length; i++) {
                    let intersection = lineInt(playerPos, playerEnd, mapData[i], mapData[i - 1]);
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
                playerDirection += playerRotateSpeed;
                break;
            case "KeyQ":
                playerDirection -= playerRotateSpeed;
                break;
        }

        if (event.code !== "Tab") {
            event.preventDefault();
        }
    },
    true
);
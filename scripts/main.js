function updateTPS() {
    document.getElementById("tpsCounter").innerHTML = "TPS: " + tickCounter;
    tickCounter = 0;
}

setInterval(updateTPS, 1000);

let interval2;
let interval3;
function switchRenderer(rendererID) {
    clearInterval(interval2);
    clearInterval(interval3)
    interval2 = setInterval(frame2d, 1000 / maxFPS);
    interval3 = setInterval(frame3d, 1000 / maxFPS);

    switch (rendererID) {
        case 0:
            playerPos = { x: 0, y: 0 }
            clearInterval(interval2);
            document.getElementById("mapPoints").style.display = "none";
            document.getElementById("newMapPointDiv").style.display = "none";
            document.getElementById("gameWindow").removeEventListener("click", selectPoint);
            break;
        case 1:
            playerPos = { x: 0, y: 0 }
            clearInterval(interval3);
            document.getElementById("mapPoints").style.display = "none";
            document.getElementById("newMapPointDiv").style.display = "none";
            document.getElementById("gameWindow").removeEventListener("click", selectPoint);
            break;
        case 2:
            playerPos = { x: 0, y: 0 }
            drawMap();
            drawPlayer();
            createList();
            clearInterval(interval2);
            clearInterval(interval3);
            document.getElementById("mapPoints").style.display = "block";
            document.getElementById("newMapPointDiv").style.display = "block";
            document.getElementById("gameWindow").addEventListener("click", selectPoint);
    }
}

switchRenderer(renderer);

createMapList();
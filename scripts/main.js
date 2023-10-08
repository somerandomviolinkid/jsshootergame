function updateTPS() {
    document.getElementById("tpsCounter").innerHTML = "TPS: " + tickCounter;
    tickCounter = 0;
}

setInterval(updateTPS, 1000);

switch (renderer) {
    case 0:
        setInterval(frame3d, 1000 / maxFPS);  
        enableMovement();
        break;
    case 1:
        setInterval(frame2d, 1000 / maxFPS); 
        enableMovement();
        break;
    case 2:
        drawMap();
        drawPlayer();
        createList();
        document.getElementById("mapPoints").style.display = "block";
        document.getElementById("newMapPointDiv").style.display = "block"; 
        document.getElementById("gameWindow").addEventListener("click", selectPoint);
}

createMapList();
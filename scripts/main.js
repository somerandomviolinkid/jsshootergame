function updateTPS() {
    document.getElementById("tpsCounter").innerHTML = "TPS: " + tickCounter;
    tickCounter = 0;
}

setInterval(updateTPS, 1000);

switch (renderer) {
    case 0:
        setInterval(frame3d, 1000 / maxFPS);  
        document.getElementById("mapPoints").display = "none";
        document.getElementById("newMapPointDiv").display = "none";
        break;
    case 1:
        setInterval(frame2d, 1000 / maxFPS); 
        document.getElementById("mapPoints").display = "none";
        document.getElementById("newMapPointDiv").display = "none"; 
        break;
    case 2:
        drawMap();
        createList();
}
function updateTPS() {
    document.getElementById("tpsCounter").innerHTML = "TPS: " + tickCounter;
    tickCounter = 0;
}

setInterval(updateTPS, 1000);

function changeRenderer(renderer) {
    let interval1 = setInterval(frame3d, 1000 / maxFPS);   
    let interval2 = setInterval(frame2d, 1000 / maxFPS);
    switch (renderer) {
        case 0:
            clearInterval(interval2);
            document.getElementById("mapPoints").display = "none";
            document.getElementById("newMapPointDiv").display = "none";
            break;
        case 1:
            clearInterval(interval1);
            document.getElementById("mapPoints").display = "none";
            document.getElementById("newMapPointDiv").display = "none"; 
            break;
        case 2:
            clearInterval(interval1);
            clearInterval(interval2);
            drawMap();
            createList();
    }
}

changeRenderer(0);
function createList() {
    const mapPointDivs = document.getElementsByClassName("mapPointDiv");
    while (mapPointDivs[0]) {
        mapPointDivs[0].parentNode.removeChild(mapPointDivs[0]);
    }
    for (let i = 0; i < mapData[mapSelect].length; i++) {
        const newDiv = document.createElement("div");
        newDiv.className = "mapPointDiv";
        newDiv.id = "mapPoint" + i;

        const newP = document.createElement("p");
        newP.className = "mapCoordinateP";
        newP.id = "mapCoordinates" + i;

        const removeButton = document.createElement("button");
        removeButton.className = "removeButtons";
        removeButton.id = "removeButton" + i;

        const editButton = document.createElement("button");
        editButton.className = "editButtons";
        editButton.id = "editButton" + i;

        let coordinates = JSON.stringify(mapData[mapSelect][i]);
        coordinates = coordinates.replaceAll(":", ": ");

        document.getElementById("mapPoints").appendChild(newDiv);
        document.getElementById("mapPoint" + i).appendChild(newP);
        document.getElementById("mapPoint" + i).appendChild(removeButton);
        document.getElementById("removeButton" + i).innerHTML = "Delete";
        document.getElementById("removeButton" + i).onclick = function () {
            removeMapPoint(i);
        }
        document.getElementById("mapPoint" + i).appendChild(editButton);
        document.getElementById("editButton" + i).innerHTML = "Edit";
        document.getElementById("editButton" + i).onclick = function () {
            editMapPoint(i);
        }
        document.getElementById("mapCoordinates" + i).innerHTML = i + ": " + coordinates;

    }
}

function removeMapPoint(index) {
    mapData[mapSelect].splice(index, 1);
    createList();
    drawMap();
    drawPlayer();
    document.getElementById("newPointIndex").value = mapData[mapSelect].length;
}

function addMapPoint() {
    let wall = new newWall(
        Number(document.getElementById("newPointX1").value),
        Number(document.getElementById("newPointY1").value),
        Number(document.getElementById("newPointX2").value),
        Number(document.getElementById("newPointY2").value),
        Number(document.getElementById("newPointColorR").value),
        Number(document.getElementById("newPointColorG").value),
        Number(document.getElementById("newPointColorB").value)
    )
    let index = Number(document.getElementById("newPointIndex").value);
    mapData[mapSelect].splice(index, 0, wall);
    createList();
    drawMap();
    drawPlayer();
    document.getElementById("newPointIndex").value = mapData[mapSelect].length;
}

function editMapPoint(index) {
    document.getElementById("mapPoint" + index).style.backgroundColor = "blue";

    document.getElementById("newPointX1").value = mapData[mapSelect][index].x1;
    document.getElementById("newPointY1").value = mapData[mapSelect][index].y1;
    document.getElementById("newPointX2").value = mapData[mapSelect][index].x2;
    document.getElementById("newPointY2").value = mapData[mapSelect][index].y2;
    document.getElementById("newPointColorR").value = mapData[mapSelect][index].r;
    document.getElementById("newPointColorG").value = mapData[mapSelect][index].g;
    document.getElementById("newPointColorB").value = mapData[mapSelect][index].b;
    document.getElementById("newPointIndex").value = index;

    document.getElementById("editButton").onclick = function () {
        confirmEdit(index);
    }

    let buttons1 = document.getElementsByClassName("editButtons");
    let buttons2 = document.getElementsByClassName("removeButtons");

    for (let i = 0; i < buttons1.length; i++) {
        buttons1[i].disabled = true;
    } 

    for (let i = 0; i < buttons2.length; i++) {
        buttons2[i].disabled = true;
    } 
}

function confirmEdit(index) {
    mapData[mapSelect][index].x1 = document.getElementById("newPointX1").value;
    mapData[mapSelect][index].y1 = document.getElementById("newPointY1").value;
    mapData[mapSelect][index].x2 = document.getElementById("newPointX2").value;
    mapData[mapSelect][index].y2 = document.getElementById("newPointY2").value;
    mapData[mapSelect][index].r = document.getElementById("newPointColorR").value;
    mapData[mapSelect][index].g = document.getElementById("newPointColorG").value;
    mapData[mapSelect][index].b = document.getElementById("newPointColorB").value;
    
    document.getElementById("mapPoint" + index).style.backgroundColor = "white";

    let buttons1 = document.getElementsByClassName("editButtons");
    let buttons2 = document.getElementsByClassName("removeButtons");

    for (let i = 0; i < buttons1.length; i++) {
        buttons1[i].disabled = false;
    } 

    for (let i = 0; i < buttons2.length; i++) {
        buttons2[i].disabled = false;
    } 

    createList();
    drawMap();
    drawPlayer();
}

function exportMapData() {
    const json = JSON.stringify(mapData[mapSelect]);
    const fileName = "mapData.json";
    const a = document.createElement('a');
    const type = fileName.split(".").pop();
    a.href = URL.createObjectURL(new Blob([json], { type: `text/${type === "txt" ? "plain" : type}` }));
    a.download = fileName;
    a.click();
}

async function importMapData() {
    try {
        const [fileHandle] = await window.showOpenFilePicker();
        const file = await fileHandle.getFile();
        const contents = await file.text();
        mapData.push(JSON.parse(contents));
        createMapList();
        createList();
        drawMap();
    } catch (err) { }
}


function selectMap(number) {
    mapSelect = number;
    playerPos = {x: 0, y: 0}
    createList();
    drawMap();
    drawPlayer();
}

function createMapList() {
    const mapSelectDivs = document.getElementsByClassName("mapSelectDiv");
    while (mapSelectDivs[0]) {
        mapSelectDivs[0].parentNode.removeChild(mapSelectDivs[0]);
    }

    for (let i = 0; i < mapData.length; i++) {
        const newDiv = document.createElement("div");
        newDiv.className = "mapSelectDiv";
        newDiv.id = "mapSelectDiv" + i;

        const newButton = document.createElement("button");
        newButton.className = "mapSelectButton";
        newButton.id = "mapSelectButton" + i;

        document.getElementById("mapSelectorDiv").appendChild(newDiv);
        document.getElementById("mapSelectDiv" + i).appendChild(newButton);
        document.getElementById("mapSelectButton" + i).innerHTML = "Select map " + i;
        document.getElementById("mapSelectButton" + i).onclick = function () {
            selectMap(i);
        }
    }
}

function createNewMap() {
    mapData.push([]);
    createMapList();
}

function deleteMap() {
    mapData.splice(mapSelect, 1);
    createMapList();
    createList();
    drawMap();
    drawPlayer();
}

let pointSelect = 1;

function selectPoint(event) {
    if (pointSelect === 1) {
        document.getElementById("newPointX1").value = (event.clientX - screenWidth2) / scale2d;
        document.getElementById("newPointY1").value = (screenHeight2 - event.clientY) / scale2d;
        pointSelect++;
    } else {
        document.getElementById("newPointX2").value = (event.clientX - screenWidth2) / scale2d;
        document.getElementById("newPointY2").value = (screenHeight2 - event.clientY) / scale2d;
        pointSelect = 1;
    }
    document.getElementById("newPointIndex").value = mapData[mapSelect].length;
}
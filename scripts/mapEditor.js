function createList() {
    const mapPointDivs = document.getElementsByClassName("mapPointDiv");
    while (mapPointDivs[0]) {
        mapPointDivs[0].parentNode.removeChild(mapPointDivs[0]);
    }
    for (let i = 0; i < mapData.length; i++) {
        const newDiv = document.createElement("div");
        newDiv.className = "mapPointDiv";
        newDiv.id = "mapPoint" + i;

        const newP = document.createElement("p");
        newP.className = "mapCoordinateP";
        newP.id = "mapCoordinates" + i;

        const removeButton = document.createElement("button");
        removeButton.className = "removeButtons";
        removeButton.id = "removeButton" + i;

        const coordinates = JSON.stringify(mapData[i]);

        document.getElementById("mapPoints").appendChild(newDiv);
        document.getElementById("mapPoint" + i).appendChild(newP);
        document.getElementById("mapPoint" + i).appendChild(removeButton);
        document.getElementById("removeButton" + i).innerHTML = "X";
        document.getElementById("removeButton" + i).onclick = function () {
            removeMapPoint(i);
        }
        document.getElementById("mapCoordinates" + i).innerHTML = i + ": " + coordinates;

    }
}

function removeMapPoint(index) {
    mapData.splice(index, 1);
    createList();
    drawMap();
}

function addMapPoint() {
    let newPoint = {
        x: document.getElementById("newPointX").value,
        y: document.getElementById("newPointY").value
    }
    let index = document.getElementById("newPointPosition").value;
    mapData.splice(index, 0, newPoint);
    createList();
    drawMap();
    document.getElementById("newPointPosition").value = mapData.length;
}

function exportMapData() {
    const json = JSON.stringify(mapData);
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
        mapData = JSON.parse(contents);
        createList();
        drawMap();
    } catch (err) { }
}
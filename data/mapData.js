let mapData = [
    [
        { x1: -9, y1: 15, x2: -9, y2: -2, r: 0, g: 255, b: 0 },
        { x1: -9, y1: 15, x2: 3, y2: 17, r: 255, g: 0, b: 0 },
        { x1: 3, y1: 17, x2: 23, y2: 1, r: 0, g: 0, b: 0 },
        { x1: 23, y1: 1, x2: 21, y2: -7, r: 0, g: 0, b: 255 },
        { x1: 21, y1: -7, x2: -9, y2: -2, r: 0, g: 255, b: 255 }
    ]
]

class newLevelData {
    constructor(meta) {
        this.meta = meta;
        this.portals = [];
        this.sectors = [];
    }
}

class newMeta {
    constructor(title, playerStartX, playerStartY, playerSector) {
        this.title = title;
        this.playerStartX = playerStartX;
        this.playerStartY = playerStartY;
        this.playerSector = playerSector;
    }
}

class newPortal {
    constructor(x1, y1, x2, y2, sector1, sector2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;

        this.sector1 = sector1;
        this.sector2 = sector2;
    }
}

class newWall {
    constructor(x1, y1, x2, y2, r, g, b) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;

        this.r = r;
        this.g = g;
        this.b = b;
    }
}
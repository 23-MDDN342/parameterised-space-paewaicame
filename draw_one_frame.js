let shapeList = [];
let shapeLcgIndex = 0;
let shapeLcgIndexOffset = 0;
let colorStopList;

let gradientShift = 0;

// unused
// let frameStep = 0;
// let frame = 0;

let colorLight = [159, 159, 159];
let colorDark = [95, 95, 95];

let firstFrame = true;

function draw_one_frame() {
    gradientShift += 1 / 12;
    colorStopList = [
        {
            position: 0,
            color: colorDark
        },
        {
            position: 0.2,
            color: colorLight
        },
        {
            position: 0.4,
            color: colorDark
        },
        {
            position: 0.6,
            color: colorLight
        },
        {
            position: 0.8,
            color: colorDark
        },
        {
            position: 1,
            color: colorLight
        },
    ]
    background(0);

    // generates shapes on startup
    if (firstFrame) {   
        for (let i=0;i<200;i++) {
            addShape();
        }
    }
    firstFrame = false;

    shapeList.forEach(element => {
        drawShape(element);
    });
    
    circle()
    
    buffer.background(0);
    buffer.fill(255,95,127);
    buffer.circle(canvasWidth/4,canvasHeight/4,300);
    buffer.fill(0);
    buffer.circle(canvasWidth/4,canvasHeight/4,150);
    blendMode(OVERLAY);
    image(imageNoise,0,0,canvasWidth,canvasHeight,0,0,imageNoise.width,imageNoise.height,COVER);
    drawingContext.drawImage(buffer.canvas, 0, 0);
}

function linearGradient(x1,y1,x2,y2,colorStops) {
    let gradient = drawingContext.createLinearGradient(x1, y1, x2, y2);
    colorStops.forEach(element => {
        gradient.addColorStop(element.position, color(element.color));
    });
    return gradient;
}
function returnLcg(fraction,total) {
    return lcgArray[(shapeLcgIndex + shapeLcgIndexOffset + (Math.floor(lcgArrayLength * fraction / total))) % lcgArrayLength];
}

function addRing(x,y,w) {
    buffer.circle
}

function addShape() {
    let cornerRadii = 100;
    let sizeFactor = 100;
    let spacingFactor = sizeFactor;
    let minSizeFactor = 2;
    let maxSizeFactor = 3;
    
    let maxHorizontalShapes = Math.floor(canvasWidth / spacingFactor);
    let maxVerticalShapes = Math.floor(canvasHeight / spacingFactor);
    
    let widthMultiplier = Math.floor(map(returnLcg(0,12), 0, 1, minSizeFactor, maxSizeFactor + 1));
    let heightMultiplier = Math.floor(map(returnLcg(1,12), 0, 1, minSizeFactor, maxSizeFactor + 1));
    
    let width = widthMultiplier * spacingFactor;
    let height = heightMultiplier * spacingFactor;

    let widthExtensionDirection = Math.round(returnLcg(2,12)) * 2 - 1;
    let heightExtensionDirection = Math.round(returnLcg(3,12)) * 2 - 1;

    let xOffsetCanvasCenter = canvasWidth / 2
    let xOffsetRandomGridPlacement = (Math.round(returnLcg(4,12) * (maxHorizontalShapes+1) - ((maxHorizontalShapes+1)/2))) * spacingFactor;
    let xOffsetExtension = widthExtensionDirection * 0.5 * (widthMultiplier % 2 == 0 ? 1 : 0) * spacingFactor;
    
    let yOffsetCanvasCenter = canvasHeight / 2
    let yOffsetRandomGridPlacement = (Math.round(returnLcg(5,12) * (maxVerticalShapes+1) - ((maxVerticalShapes+1)/2))) * spacingFactor;
    let yOffsetExtension = heightExtensionDirection * 0.5 * (heightMultiplier % 2 == 0 ? 1 : 0) * spacingFactor;

    let xOffset = xOffsetCanvasCenter + xOffsetRandomGridPlacement + xOffsetExtension;
    let yOffset = yOffsetCanvasCenter + yOffsetRandomGridPlacement + yOffsetExtension;

    let gradientChoice = Math.floor(returnLcg(6,12) * 4);
    let cornerRadiiChance = 0.667;
    let cornerRadiiList = [
        returnLcg(7,12) > cornerRadiiChance ? 0 : cornerRadii,
        returnLcg(8,12) > cornerRadiiChance ? 0 : cornerRadii,
        returnLcg(9,12) > cornerRadiiChance ? 0 : cornerRadii,
        returnLcg(10,12) > cornerRadiiChance ? 0 : cornerRadii
    ];

    let gradientShiftDirection = Math.round(returnLcg(11,12)) * 2 - 1;

    shapeList.push(
        {
            x: xOffset,
            y: yOffset,
            w: width,
            h: height,
            cr: cornerRadiiList,
            g: gradientChoice,
            gs: gradientShiftDirection
        }
    );

    shapeLcgIndex++;
}
function drawShape(element) {
    push();
    let gradients = [
        [-0.5, 0, 0.5, 0],
        [0, -0.5, 0, 0.5],
        [0.5, 0, -0.5, 0],
        [0, 0.5, 0, -0.5]
    ]
    let gradientsRandomChoice = gradients[element.g];
    let gradientScaleFactor = 5;

    let gradientShiftHorizontal = (element.w * (gradientShift % 2 * element.gs));
    let gradientShiftVertical = (element.h * (gradientShift % 2 * element.gs));

    drawingContext.fillStyle = linearGradient(
        element.x + (element.w * gradientsRandomChoice[0] * gradientScaleFactor + gradientShiftHorizontal),
        element.y + (element.h * gradientsRandomChoice[1] * gradientScaleFactor + gradientShiftVertical),
        element.x + (element.w * gradientsRandomChoice[2] * gradientScaleFactor + gradientShiftHorizontal),
        element.y + (element.h * gradientsRandomChoice[3] * gradientScaleFactor + gradientShiftVertical),
        colorStopList
    );
    rect(
        element.x,
        element.y,
        element.w,
        element.h, 
        element.cr[0],
        element.cr[1],
        element.cr[2],
        element.cr[3]
    );
    pop();
}
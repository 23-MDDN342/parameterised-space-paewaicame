let shapeList = [];
let frameStep = 2;
let frame = 0;
let colorStopList;

function draw_one_frame() {
    colorStopList = [
        {
            position: 0,
            color: color(0, 0, 0, 100)
        },
        {
            position: 1,
            color: color(0, 0, 100, 100)
        },
    ]
    background(0);
    // stroke(0);
    // strokeWeight(2);
    shapeList.forEach(element => {
        drawShape(element);
    });
    
    if (frame < frameStep) {
        frame++;
    } else {
        addShape();
        if (shapeList.length > 50) {
            shapeList.shift();
        }
        frame = 0;
    }
}

function linearGradient(x1,y1,x2,y2,colorStops) {
    let gradient = drawingContext.createLinearGradient(x1, y1, x2, y2);
    colorStops.forEach(element => {
        gradient.addColorStop(element.position, element.color);
    });
    return gradient;
}
function radialGradient(x1,y1,r1,x2,y2,r2,colorStops) {
    let gradient = drawingContext.createRadialGradient(x1, y1, r1, x2, y2, r2);
    colorStops.forEach(element => {
        gradient.addColorStop(element.position, element.color);
    });
    return gradient;
}
function addShape() {
    let xColumns = 4;
    let yRows = 3;
    let cornerRadii = 100;
    let sizeFactor = 100;
    let minSizeFactor = 2;
    let maxSizeFactor = 4;
    let spacingFactor = 200;

    let xOffset = Math.floor(random()*xColumns) * spacingFactor;
    let yOffset = Math.floor(random()*yRows) * spacingFactor;
    let width = Math.round(map(random(),0,1,minSizeFactor,maxSizeFactor)) * sizeFactor;
    let height = Math.round(map(random(),0,1,minSizeFactor,maxSizeFactor)) * sizeFactor;
    let gradientChoice = Math.floor(random()*4);
    let cornerRadiiChance = 0.67;
    let cornerRadiiList = [
        random() > cornerRadiiChance ? 0 : cornerRadii,
        random() > cornerRadiiChance ? 0 : cornerRadii,
        random() > cornerRadiiChance ? 0 : cornerRadii,
        random() > cornerRadiiChance ? 0 : cornerRadii
    ];
    shapeList.push(
        {
            x: xOffset,
            y: yOffset,
            w: width,
            h: height,
            cr: cornerRadiiList,
            g: gradientChoice
        }
    );
}
function drawShape(element) {
    push();
    let gradients = [
        [0,0,1,0],
        [0,0,0,1],
        [1,0,0,0],
        [0,1,0,0]
    ]
    let gradientsRandomChoice = gradients[element.g]
    drawingContext.fillStyle = linearGradient(
        element.x + (element.w * gradientsRandomChoice[0]),
        element.y + (element.h * gradientsRandomChoice[1]),
        element.x + (element.w * gradientsRandomChoice[2]),
        element.y + (element.h * gradientsRandomChoice[3]),
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
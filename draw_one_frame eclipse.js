function draw_one_frame() {
    // let gradient = drawingContext.createLinearGradient(width/2-200, height/2-200, width/2+200, height/2+200);
    // gradient.addColorStop(0, color(310, 100, 100, 100));
    // gradient.addColorStop(1, color(250, 100, 100, 100));
    let colorStopList = [
        {
            position: 0,
            color: color(310, 100, 100, 0)
        },
        {
            position: 1,
            color: color(40, 100, 100, 100)
        },
    ]
    
    // drawingContext.fillStyle = linearGradient(width/2-200, height/2-200, width/2+200, height/2+200, colorStopList);
    drawingContext.fillStyle = radialGradient(width/2, height/2+150, 0, width/2, height/2, 200, colorStopList);

    blendMode(SCREEN);
    ellipse(width/2,height/2,400,400);
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
let increment = 0.1;
let scale = 50;
let cols, rows;
let zOff =0
let particles = []

let flowField 
function setup() {
    createCanvas(innerWidth, innerHeight)
    cols = floor(width / scale);
    rows = floor(height / scale);
    flowField = new Array(cols*rows)
	for(let i = 0; i < 20; i++){

		particles[i]=  new Particle()
	}
}
 

function draw() {
    background(255);
    let yOff = 0;
    for (let y = 0; y < rows; y++) {
        let xOff = 0;
        for (let x = 0; x < cols; x++) {
            let index = (x + y * cols);
            let angle = noise(xOff, yOff,zOff) * TWO_PI ;
            let v = p5.Vector.fromAngle(angle);
            // v.setMag(0.1)
            flowField[index] = v
            xOff += increment;
            fill(random(255))
            stroke(0,50);
            push();
            translate(x * scale, y * scale);
            rotate(v.heading());
            strokeWeight(1)
            line(0, 0, scale, 0);
            // // ellipse(scale,0, 5,5)
            pop();
        }
        yOff += increment;
		zOff+=0.001
    }
	for(let i = 0; i < particles.length;i++){
        particles[i].follow(flowField)
        particles[i].update()
        particles[i].edges()
		particles[i].show()
		particles[i].applyForce()
	}

}

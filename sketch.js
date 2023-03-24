let increment = 0.5;
let scale = 10;
let cols, rows;
let zOff =0
let particles = []

let flowField 
function setup() {
    // createCanvas(500, 500);
    createCanvas(innerWidth, innerHeight)
    cols = floor(width / scale);
    rows = floor(height / scale);
    // put setup code here
    flowField = new Array(cols*rows)
	for(let i = 0; i < 50; i++){

		particles[i]=  new Particle()
	}
    background("white");
}


function draw() {
    // put drawing code here
    let yOff = 0;
    for (let y = 0; y < rows; y++) {
        let xOff = 0;
        for (let x = 0; x < cols; x++) {
            let index = (x + y * cols);
            let angle = noise(xOff, yOff,zOff) * TWO_PI * 2;
            // if(y == floor(rows/3)){
            //     angle = -PI/2
            // }
            // if(x ==floor(cols/2)){
            //     angle =0 
            // }
            let v = p5.Vector.fromAngle(angle);
            // v.setMag(0.1)
            flowField[index] = v
            xOff += increment;
            // stroke(0);
            // push();
            // translate(x * scale, y * scale);
            // rotate(v.heading());
            // line(0, 0, scale, 0);
            // // ellipse(scale,0, 5,5)
            // pop();
        }
        yOff += increment;
		zOff+=0.0001
    }
	for(let i = 0; i < particles.length;i++){
        particles[i].follow(flowField)
		particles[i].show()
        particles[i].update()
        particles[i].edges()
		// particles[i].applyForce()
	}

}

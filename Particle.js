class Particle {
    constructor() {
        // this.pos = createVector(0,0)
        this.pos = createVector(random(width), random(height));
        // this.vel = createVector(0,0)
        this.vel = p5.Vector.random2D();
        this.acc = createVector(0, 0);
        this.maxSpeed = 4
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed)
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    applyForce(f) {
        this.acc.add(f);
    }

    show() {
        stroke(0,5);
        // fill('black')
        point(this.pos.x, this.pos.y);
    }

    edges() {
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.y > height) this.pos.y = 0;
        if (this.pos.y < 0) this.pos.y = height;
    }

    follow(flowField){
        let x = floor(this.pos.x/scale)
        let y = floor(this.pos.y/scale)
        let index = x + y * cols
        let force = flowField[index]
        this.applyForce(force)
    }
}

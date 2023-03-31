class Particle {
    constructor(x, y) {
        // this.pos = createVector(0,0)
        if (x && y) {
            this.pos = createVector(x, y);
        } else {
            this.pos = createVector(random(width), random(height));
        }
        // this.vel = createVector(0,0)
        this.vel = p5.Vector.random2D();
        this.acc = createVector(0, 0);
        this.maxSpeed = 4;

        this.prevPos = this.pos.copy();
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    applyForce(f) {
        this.acc.add(f);
    }

    show() {
        // line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        stroke(0);
        strokeWeight(5);
        point(this.pos.x, this.pos.y);
        this.updatePrev();
    }

    updatePrev() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    edges() {
        if (this.pos.x > width) {
            this.pos.x = 0;
            this.updatePrev();
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrev();
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
            this.updatePrev();
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
            this.updatePrev();
        }
    }

    follow(flowField) {
        let x = floor(this.pos.x / scale);
        let y = floor(this.pos.y / scale);
        let index = x + y * cols;
        let force = flowField[index];
        this.applyForce(force);
    }
}

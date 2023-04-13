
import * as THREE from 'three';
import { CSG } from '../FireBase/CSGMesh';

class Fence extends THREE.Mesh {
    constructor() { 
        super(new THREE.BoxGeometry(0.5, 2, 0.3), new THREE.MeshLambertMaterial({color:"gray"}));
    }
};

class Laser extends THREE.Mesh {
    constructor(color) { 
        super(new THREE.CylinderGeometry(0.1, 0.1, 2, 64, 64), new THREE.MeshLambertMaterial({color:color, transparent:true, opacity: 0.5}));
    }
};

class LaserFence extends THREE.Object3D {  
   constructor(type){
        super();
        this.index = 0
        this.x = 0
        this.z = 0
        this.state = type
        this.active = true
        this.type = type;

        // fences
        let laserFence1 = new Fence;
        laserFence1.position.set(0, 0, -1)
        let laserFence2 = new Fence;
        laserFence2.position.set(0, 0, 1)

        // blue lasers
        let laserBlue1 = new Laser("blue")
        laserBlue1.rotateX(-Math.PI / 2);
        laserBlue1.position.set(0, 0.6, 0)
        let laserBlue2 = new Laser("blue")
        laserBlue2.rotateX(-Math.PI / 2);
        laserBlue2.position.set(0, 0, 0)
        let laserBlue3 = new Laser("blue")
        laserBlue3.rotateX(-Math.PI / 2);
        laserBlue3.position.set(0, -0.6, 0)
        this.blueLasers = [laserBlue1, laserBlue2, laserBlue3]
        
        // red lasers
        let laserRed1 = new Laser("red")
        laserRed1.rotateX(-Math.PI / 2);
        laserRed1.position.set(0, 0.6, 0)
        let laserRed2 = new Laser("red")
        laserRed2.rotateX(-Math.PI / 2);
        laserRed2.position.set(0, 0, 0)
        let laserRed3 = new Laser("red")
        laserRed3.rotateX(-Math.PI / 2);
        laserRed3.position.set(0, -0.6, 0)
        this.redLasers =[laserRed1, laserRed2, laserRed3]
        if(type == "blue"){  
            this.blueLasers.forEach(laser => laser.visible = true)
            this.redLasers.forEach(laser => laser.visible = false)

        }
        else if(type == "red" || type == "multiColor"){
            this.blueLasers.forEach(laser => laser.visible = false)
        }

        this.add(laserFence1);
        this.add(laserFence2);
        this.add(laserBlue1);
        this.add(laserBlue2);
        this.add(laserBlue3);      
        this.add(laserRed1);
        this.add(laserRed2);
        this.add(laserRed3);
        return this;
   }

   setVisible()
   {
        this.active = true
   }

   setNotVisible(){
        this.blueLasers.forEach(laser => laser.visible = false)
        this.redLasers.forEach(laser => laser.visible = false)
        this.active = false
   }

   setBlue(){
        if(this.active == true){
            this.blueLasers.forEach(laser => laser.visible = true)
            this.redLasers.forEach(laser => laser.visible = false)
            this.state = 'blue'
        }
   }

   setRed(){
        if(this.active == true){
            this.blueLasers.forEach(laser => laser.visible = false)
            this.redLasers.forEach(laser => laser.visible = true)
            this.state = 'red'
        }
   }
}

export default LaserFence;

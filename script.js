var that;
var BouncingBalls = function(){
	this.scene = new THREE.Scene();
	that = this; 
};


BouncingBalls.prototype.init = function(){
	this.createCamera();
	this.createRenderer();

	this.createBoxes();

	this.createFloor();
	this.createLights();

	this.animateBalls();

	this.render();
	// this.datGUI();


}

//camera setting
BouncingBalls.prototype.createCamera = function(){
	this.camera =new THREE.OrthographicCamera(window.innerWidth/-2,
		window.innerWidth/2,window.innerHeight/2, window.innerHeight/-2,-1000,1000);
	this.camera.position.x=200;
	this.camera.position.y=70;
	this.camera.position.z=100;

	this.camera.lookAt(new THREE.Vector3(0,0,0));
	this.camera.zoom=0.5;
	this.camera.updateProjectionMatrix();



   this.scene.position.z = 170;
    this.scene.position.y = -70;
	
};





//create floor
BouncingBalls.prototype.createFloor = function(){
	var geometry2 =new THREE.PlaneGeometry(1000,1000,20,20);
	var material2 = new THREE.MeshLambertMaterial({color:0xededed});
    var floor = new THREE.Mesh( geometry2, material2 );
    floor.position.set(0,0,0);
    floor.material.side = THREE.DoubleSide;
    floor.rotation.x = 90*Math.PI/180;
    floor.doubleSided = true;
    floor.receiveShadow = true;
    this.scene.add(floor);




}

//create balls
BouncingBalls.prototype.createBoxes = function(){
	this.spheres =[];
	var materials =[];
	var spherePosY=50;
	var spherePosZ=0;
	var geometry =new THREE.SphereGeometry(40,32,32);



	materials[1]= new THREE.MeshBasicMaterial({color: 0xff0000,emissive:0xff3d3d, flatShading:true});
	materials[2]= new THREE.MeshPhongMaterial({color: 0xff0000,emissive:0xff3d3d, flatShading:true});
	materials[3]= new THREE.MeshPhongMaterial({color: 0xff0000,emissive:0xff3d3d, flatShading:true});
	materials[4]= new THREE.MeshPhongMaterial({color: 0xff0000,emissive:0xff3d3d, flatShading:true});
	materials[5]= new THREE.MeshPhongMaterial({color: 0xff0000,emissive:0xff3d3d, flatShading:true});
	materials[6]= new THREE.MeshPhongMaterial({color: 0xff0000,emissive:0xff3d3d, flatShading:true});
	materials[7]= new THREE.MeshPhongMaterial({color: 0xff0000,emissive:0xff3d3d, flatShading:true});

	for(var i=1; i<8; i++){
		this.spheres[i] = new THREE.Mesh(geometry, materials[i]);
		this.spheres[i].position.y =spherePosY;
		this.spheres[i].position.z =spherePosZ;
		this.spheres[i].castShadow =true;
		this.spheres[i].recieveShadow =true;
		this.scene.add(this.spheres[i]);
		spherePosZ+= -120;
		


	}


}



//create light
BouncingBalls.prototype.createLights= function(){

 // 

	var shadowLight= new THREE.SpotLight(0xffffff,1);
	shadowLight.position.set(100,1500,300);

	shadowLight.target.position.set(this.scene.position);
	shadowLight.castShadow = true;
	shadowLight.receiveShadow = true;
		//Set up shadow properties for the light
	shadowLight.shadow.mapSize.width = 2048;  // default
	shadowLight.shadow.mapSize.height = 2048; // default
	shadowLight.shadow.camera.near = 0.1;       // default
	shadowLight.shadow.camera.far = 500      // default
    shadowLight.shadow.bias = -0.005;

	this.scene.add(shadowLight);


var helper = new THREE.CameraHelper( shadowLight.shadow.camera );
this.scene.add( helper );


};



BouncingBalls.prototype.animateBalls = function(){
    this.tl = new TimelineMax({repeat: -1 , repeatDelay:0});
    this.tl.to(this.spheres[1].position, 0.56, {y: 250, ease: Power2.easeOut});
    this.tl.to(this.spheres[1].position, 0.3, {y: 50, ease: Circ.easeIn});

    this.t2 = new TimelineMax({repeat: -1 , repeatDelay:0});
   	this.t2.to(this.spheres[2].position, 0.56, {y: 250, ease: Power2.easeOut});
    this.t2.to(this.spheres[2].position, 0.3, {y: 50, ease: Circ.easeIn});

   //  this.t3 = new TimelineMax({repeat: -1 , repeatDelay:0});
   // this.t3.to(this.spheres[3].position, 0.56, {y: 250, ease: Power2.easeOut});
   //  this.t3.to(this.spheres[3].position, 0.3, {y: 50, ease: Circ.easeIn});

   //  this.t4 = new TimelineMax({repeat: -1 , repeatDelay:0});
   // this.t4.to(this.spheres[4].position, 0.56, {y: 250, ease: Power2.easeOut});
   //  this.t4.to(this.spheres[4].position, 0.3, {y: 50, ease: Circ.easeIn});

   //  this.t5 = new TimelineMax({repeat: -1 , repeatDelay:0});
   // this.t5.to(this.spheres[5].position, 0.56, {y: 250, ease: Power2.easeOut});
   //  this.t5.to(this.spheres[5].position, 0.3, {y: 50, ease: Circ.easeIn});

   //  this.t6 = new TimelineMax({repeat: -1 , repeatDelay:0});
   // this.t6.to(this.spheres[6].position, 0.56, {y: 250, ease: Power2.easeOut});
   //  this.t6.to(this.spheres[6].position, 0.3, {y: 50, ease: Circ.easeIn});

   //   this.t7 = new TimelineMax({repeat: -1 , repeatDelay:0});
   // this.t7.to(this.spheres[7].position, 0.56, {y: 250, ease: Power2.easeOut});
   //  this.t7.to(this.spheres[7].position, 0.3, {y: 50, ease: Circ.easeIn});

};

BouncingBalls.prototype.render = function(){
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, that.camera);
};

BouncingBalls.prototype.onWindowResize = function(){
    that.camera.left = window.innerWidth / -2;
    that.camera.right = window.innerWidth / 2;
    that.camera.top = window.innerHeight / 2;
    that.camera.bottom = window.innerHeight / -2;
    that.camera.updateProjectionMatrix(); 
    that.renderer.setSize(window.innerWidth, window.innerHeight); 
};

/*User interface - display or not 2D view*/
// BouncingBalls.prototype.datGUI = function(){
//     var Configuration = function(){
//       this.view2D = false;
//     };
//     var config = new Configuration();

//     var gui = new dat.GUI();
//     gui.add(config, 'view2D').onFinishChange(function(){
//         that.swap2DView(config.view2D);
//     });

// };

BouncingBalls.prototype.createRenderer = function(){
	this.renderer =new THREE.WebGLRenderer({antialias:true});
	this.renderer.setSize(
		window.innerWidth, window.innerHeight
		);
	this.renderer.setClearColor(0xededed);
	this.renderer.shadowMap.enabled = true;

	this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
 	this.renderer.shadowMapSoft =true;

 	document.body.appendChild(this.renderer.domElement);
 	window.addEventListener('resize',this.onWindowResize, false);
 	this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
 	this.controls.enablePan =false;
 	
};

var bouncingBalls = new BouncingBalls();
bouncingBalls.init();

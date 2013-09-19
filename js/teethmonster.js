$(function () {
  // set the scene size
  var WIDTH = 1024,
    HEIGHT = 768;

  // set some camera attributes
  var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;

  // get the DOM element to attach to
  // - assume we've got jQuery to hand
  var $container = $('#container');

  // create a WebGL renderer, camera
  // and a scene
  var renderer = new THREE.WebGLRenderer();
  var camera =
    new THREE.PerspectiveCamera(
      VIEW_ANGLE,
      ASPECT,
      NEAR,
      FAR);

  var scene = new THREE.Scene();
  scene.add(camera);
  camera.position.y = 300;
  camera.position.z = 300;
  renderer.setSize(WIDTH, HEIGHT);
  $container.append(renderer.domElement);

  // create a point light
  var pointLight =
    new THREE.AmbientLight(0x404040);

  // set its position
  pointLight.position.x = 0;
  pointLight.position.y = 50;
  pointLight.position.z = 130;

  // add to the scene
  scene.add(pointLight);
  
  // draw!
  renderer.render(scene, camera);
  
  var cubes = [],
    frameCount = 0;
  var COLORS = [0xCC0000, 0x00CC00, 0x0000CC]; 
  
  var moveLeft = false,
      moveRight = false;
  $("body").keydown(function (ev) {
    var LEFT_ARROW = 37,
      RIGHT_ARROW = 39;

    if (ev.which === LEFT_ARROW) {
      moveLeft = true;
    }
    
    if (ev.which === RIGHT_ARROW) {
      moveRight = true;
    }
  });
  
  $("body").keyup(function () {
    moveLeft = false;
    moveRight = false;
  });
  
  function animate() {
    requestAnimationFrame(animate);
    frameCount++;
    
    if (frameCount % 4 === 0) {
        frameCount = 0;
        var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xCCCC00 });
        var cubeGeometry = new THREE.CubeGeometry(50, 50, 50);
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        
        var maxX = WIDTH * 8,
          minX = 0 - maxX;
        
        cube.position.x = Math.floor(Math.random() * (maxX - minX) + minX);
        
        cube.position.y = HEIGHT / 4;
        cube.position.z = -10000;

        scene.add(cube);
        cubes.push(cube);  
    }
    
    for (var i = 0; i < cubes.length; i++) {
      var speed = 72;
      cubes[i].position.z += speed;
      
      if (cubes[i].position.z > 300) {
        scene.remove(cubes[i]);
        cubes.splice(i, 1);      
      }
    }
    
    var moveSpeed = 32;
    if (moveLeft) {
      camera.position.x -= moveSpeed;
    }
    
    if (moveRight) {
      camera.position.x += moveSpeed;
    }
    
    renderer.render(scene, camera);
  }
  animate();
});

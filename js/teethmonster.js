$(function () {
  // set the scene size
  var WIDTH = 1024,
    HEIGHT = 768;

  // set some camera attributes
  var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 50000;

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
  camera.position.z = 300;
  renderer.setSize(WIDTH, HEIGHT);
  $container.append(renderer.domElement);

  // create a point light
  var pointLight =
    new THREE.AmbientLight(0x404040);

  // set its position
  pointLight.position.x = 10;
  pointLight.position.y = 50;
  pointLight.position.z = 130;

  // add to the scene
  scene.add(pointLight);
  
  // draw!
  renderer.render(scene, camera);
  
  var spheres = [],
    segments = 16,
    rings = 16,
    frameCount = 0;
  var COLORS = [0xCC0000, 0x00CC00, 0x0000CC]; 
  
  function animate() {
    requestAnimationFrame(animate);

    var rMin = 50;
    var rMax = 1000;    
    var radius = Math.floor(Math.random() * (rMax - rMin) + rMin);

    var color = COLORS[Math.floor(Math.random() * COLORS.length)];
    var sphereMaterial = new THREE.MeshBasicMaterial({ color: color });
    var sphereGeometry = new THREE.SphereGeometry(radius, segments, rings);
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    
    sphere.position.x = Math.floor(Math.random() * WIDTH*100) - WIDTH/2*100;
    sphere.position.y = Math.floor(Math.random() * HEIGHT*100) - HEIGHT/2*100;
    sphere.position.z = -50000;
    
    scene.add(sphere);
    spheres.push(sphere);    
    
    for (var i = 0; i < spheres.length; i++) {
      var speedMin = 192;
      var speedMax = 256;
      var speed = Math.floor(Math.random() * (speedMax - speedMin) + speedMin);
      spheres[i].position.z += speed;
      
      if (spheres[i].position.z > 300) {
        scene.remove(spheres[i]);
        spheres.splice(i, 1);      
      }
    }
    
    renderer.render(scene, camera);
  }
  animate();
});

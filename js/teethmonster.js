$(function () {
  // set the scene size
  var WIDTH = 400,
    HEIGHT = 300;

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

  // add the camera to the scene
  scene.add(camera);

  // the camera starts at 0,0,0
  // so pull it back
  camera.position.z = 300;

  // start the renderer
  renderer.setSize(WIDTH, HEIGHT);

  // attach the render-supplied DOM element
  $container.append(renderer.domElement);

  // set up the sphere vars
  var radius = 50,
      segments = 16,
      rings = 16;
      
  // create the sphere's material
  var cubeMaterial =
    new THREE.MeshBasicMaterial(
      {
        color: 0xCC0000
      });
  var cubeGeometry = new THREE.CubeGeometry(50, 50, 50);
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  // add the sphere to the scene
  scene.add(cube);
  
  // create a point light
  var pointLight =
    new THREE.PointLight(0xFFFFFF);

  // set its position
  pointLight.position.x = 10;
  pointLight.position.y = 50;
  pointLight.position.z = 130;

  // add to the scene
  scene.add(pointLight);
  
  // draw!
  renderer.render(scene, camera);
  
  function animate() {
    requestAnimationFrame(animate);
    
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.02;
    
    renderer.render(scene, camera);
  }
  animate();
});

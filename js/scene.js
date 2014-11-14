			var container, stats, GROUND, effect;
			var cameras = [],
			  activeCamera, oculuscamera, camera, orbitcamera, scene, projector, raycaster, renderer, controls;

			var skyboxMesh, skyboxWidth;
			var pressedLeft = false,
			  pressedRight = false,
			  autoRotate = false;

			var radius = 200,
			  theta = 0;

			function initScene() {

			  container = document.getElementById('container');
			  scene = new THREE.Scene();

			  renderer = new THREE.WebGLRenderer({
			    "antialias": true
			  });
			  renderer.sortObjects = true;
			  renderer.setSize(window.innerWidth, window.innerHeight);
			  container.appendChild(renderer.domElement);

			  stats = new Stats();
			  stats.domElement.style.position = 'absolute';
			  stats.domElement.style.top = '0px';
			  stats.domElement.style.zIndex = '1000';
			  container.appendChild(stats.domElement);

			  //camera rotation
			  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
			  cameras.push(camera);

			  //camera 'libre'
			  orbitcamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
			  orbitcamera.position.set(-70, 6, -205);
			  cameras.push(orbitcamera);
			  scene.add(orbitcamera);

			  //Cardboard Camera
			  effect = new THREE.StereoEffect(renderer);
			  effect.setSize(window.innerWidth, window.innerHeight);
			  oculuscamera = new THREE.PerspectiveCamera(90, 1, 0.001, 700);
			  oculuscamera.position.set(-70, -50, -105);
			  cameras.push(oculuscamera);
			  scene.add(oculuscamera);

			  //controls CbCamera
			  oculuscontrols = new THREE.OrbitControls(oculuscamera, renderer.domElement);
			  oculuscontrols.rotateUp(Math.PI / 4);
			  oculuscontrols.target.set(
			    oculuscamera.position.x + 0.1,
			    oculuscamera.position.y,
			    oculuscamera.position.z
			  );
			  oculuscontrols.noZoom = true;
			  oculuscontrols.noPan = true;

			  //gestion de l'orientation
			  function setOrientationControls(e) {
			    oculuscontrols = new THREE.DeviceOrientationControls(oculuscamera, true);
			    oculuscontrols.connect();
			    oculuscontrols.update();

			    window.removeEventListener('deviceorientation', setOrientationControls);
			  }
			  window.addEventListener('deviceorientation', setOrientationControls, false);

			  window.addEventListener('resize', onWindowResize, false);

			  // Set the background color of the scene.
			  renderer.setClearColor(0x333F47, 1);

			  // ## Begining of the Skybox Code

			  // load the cube textures
			  var urlPrefix = "./object3D/textures/skyBox/";
			  var urls = [urlPrefix + "posx.jpg", urlPrefix + "negx.jpg",
			    urlPrefix + "posy.jpg", urlPrefix + "negy.jpg",
			    urlPrefix + "posz.jpg", urlPrefix + "negz.jpg"
			  ];
			  var textureCube = THREE.ImageUtils.loadTextureCube(urls);
			  textureCube.format = THREE.RGBFormat;

			  var shader = THREE.ShaderLib["cube"];
			  shader.uniforms["tCube"].value = textureCube;

			  var cubeShader = new THREE.ShaderMaterial({

			      fragmentShader: shader.fragmentShader,
			      vertexShader: shader.vertexShader,
			      uniforms: shader.uniforms,
			      depthWrite: false,
			      side: THREE.BackSide

			    }),

			    // build the skybox Mesh
			    skyboxWidth = 350;
			  GROUND = skyboxWidth / 2;
			  skyboxMesh = new THREE.Mesh(new THREE.BoxGeometry(skyboxWidth, skyboxWidth, skyboxWidth), cubeShader);

			  // add it to the scene
			  scene.add(skyboxMesh);

			  var light = new THREE.DirectionalLight(0xffffff, 2);
			  light.position.set(1, 1, 1).normalize();
			  scene.add(light);

			  var light = new THREE.DirectionalLight(0xffffff);
			  light.position.set(-1, -1, -1).normalize();
			  scene.add(light);

			  initTable();

			  /*projector = new THREE.Projector();
				raycaster = new THREE.Raycaster();*/

			  // Add OrbitControls so that we can pan around with the mouse.
			  controls = new THREE.OrbitControls(orbitcamera, renderer.domElement);
			  controls.maxDistance = 250;
			  //set default camera
			  activeCamera = orbitcamera;
			}

			function onWindowResize() {

			  cameras.forEach(function (camera) {
			    camera.aspect = window.innerWidth / window.innerHeight;
			    camera.updateProjectionMatrix();
			  });

			  renderer.setSize(window.innerWidth, window.innerHeight);
			  effect.setSize(window.innerWidth, window.innerHeight);
			}

			function animate() {
			  requestAnimationFrame(animate);
			  render();
			  controls.update();
			  oculuscontrols.update();
			  stats.update();
			}

			function render() {
			  if (pressedRight) {
			    theta -= 3;
			  } else if (pressedLeft) {
			    theta += 3;
			  } else {
			    theta += 0.5;
			  }
			  if (activeCamera == oculuscamera) {
			    effect.render(scene, activeCamera);
			    if (autoRotate) {
			      table.rotation.y += 0.01;
			    }
			  } else {
			    camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
			    camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
			    camera.lookAt(table.position);
			    orbitcamera.lookAt(table.position);
			    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
			    renderer.render(scene, activeCamera);
			  }
			}
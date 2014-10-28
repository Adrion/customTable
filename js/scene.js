			var container, stats, GROUND;
			var camera,orbitcamera, scene, projector, raycaster, renderer, controls;

			var skyboxMesh, skyboxWidth;
			var pressedLeft = 0, pressedRight = 0;

			var radius = 120, theta = 0;

			function initScene() {

				container = document.createElement( 'div' );
				container.setAttribute("id", "container");
				document.body.appendChild( container );

				scene = new THREE.Scene();
				
				renderer = new THREE.WebGLRenderer();
				renderer.setClearColor( 0xf0f0f0 );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.sortObjects = false;
				container.appendChild(renderer.domElement);

				stats = new Stats();
				stats.domElement.style.position = 'absolute';
				stats.domElement.style.top = '0px';
				container.appendChild( stats.domElement );
				
				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
				
			    orbitcamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000);
				orbitcamera.position.set(120,6,0);
				scene.add(orbitcamera);

				window.addEventListener( 'resize', onWindowResize, false );

				// Set the background color of the scene.
			    renderer.setClearColor(0x333F47, 1);

			    // ## Begining of the Skybox Code
	
				// load the cube textures
				var urlPrefix	= "./object3D/textures/skyBox/";
				var urls = [ urlPrefix + "posx.jpg", urlPrefix + "negx.jpg",
						urlPrefix + "posy.jpg", urlPrefix + "negy.jpg",
						urlPrefix + "posz.jpg", urlPrefix + "negz.jpg" ];
				var textureCube	= THREE.ImageUtils.loadTextureCube( urls );
				textureCube.format = THREE.RGBFormat;

				var shader = THREE.ShaderLib[ "cube" ];
				shader.uniforms[ "tCube" ].value = textureCube;

				var cubeShader = new THREE.ShaderMaterial( {

					fragmentShader: shader.fragmentShader,
					vertexShader: shader.vertexShader,
					uniforms: shader.uniforms,
					depthWrite: false,
					side: THREE.BackSide

				} ),

				// build the skybox Mesh
				skyboxWidth = 350;
				GROUND = skyboxWidth/2;
				skyboxMesh	= new THREE.Mesh( new THREE.BoxGeometry( skyboxWidth, skyboxWidth, skyboxWidth ), cubeShader );

				// add it to the scene
				scene.add( skyboxMesh );


				var light = new THREE.DirectionalLight( 0xffffff, 2 );
				light.position.set( 1, 1, 1 ).normalize();
				scene.add( light );

				var light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( -1, -1, -1 ).normalize();
				scene.add( light );

				initTable();

				/*projector = new THREE.Projector();
				raycaster = new THREE.Raycaster();*/

				// Add OrbitControls so that we can pan around with the mouse.
		     	controls = new THREE.OrbitControls(orbitcamera, renderer.domElement);

			}


			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				orbitcamera.aspect = window.innerWidth / window.innerHeight;
				orbitcamera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}


			//

			function animate() {

				requestAnimationFrame( animate );
				render();
				controls.update();
				stats.update();
			}

			function render() {

				if(pressedRight){
					theta -= 3;
				}
				if(pressedLeft){
					theta += 3;
				}
				else{
					theta += 0.5;
				}
				camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
				camera.position.y = 50;
				camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
				camera.lookAt( scene.position );
				//camera2.lookAt( scene.position );

				//renderer.render( scene, camera );

				// Render for testing
				renderer.render( scene, orbitcamera );

			}
			var container, stats, loaderTexture;
			var camera,orbitcamera, scene, projector, raycaster, renderer, controls;

			var table, plate, editable = [];
			var textureTable;
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
			    renderer.setClearColorHex(0x333F47, 1);

				var light = new THREE.DirectionalLight( 0xffffff, 2 );
				light.position.set( 1, 1, 1 ).normalize();
				scene.add( light );

				var light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( -1, -1, -1 ).normalize();
				scene.add( light );

				table = new THREE.Object3D();
				plate = new THREE.Object3D();
				legsGroup = new THREE.Object3D();
				textureTable = new THREE.Texture();
				
				table.add( plate );
				table.add( legsGroup );

				var loaderOBJ = new THREE.OBJLoader();
				loaderOBJ.load( modelsPath+'/PTELC1B14/model.obj', loaderTableCallback );
				
				//loadModel('PTELC1A');
				loadModel('21246');
				/*var loaderJSON = new THREE.AssimpJSONLoader();
				loaderJSON.load( modelsPath+'/pieds/21862/model.json', loaderLegCallback );
*/
				table.position.y = 20;
				scene.add(table);

				/*projector = new THREE.Projector();
				raycaster = new THREE.Raycaster();*/

				// Add OrbitControls so that we can pan around with the mouse.
		      controls = new THREE.OrbitControls(orbitcamera, renderer.domElement);

			}


			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

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
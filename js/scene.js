			var container, stats, loaderTexture;
			var camera, scene, projector, raycaster, renderer, controls;

			var table, plate, editable = [];
			var textureTable;
			var pressedLeft = 0, pressedRight = 0;

			var radius = 120, theta = 0;

			
			

			function initScene() {

				container = document.createElement( 'div' );
				container.setAttribute("id", "container");
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );

				scene = new THREE.Scene();

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

				


				projector = new THREE.Projector();
				raycaster = new THREE.Raycaster();



				renderer = new THREE.WebGLRenderer();
				renderer.setClearColor( 0xf0f0f0 );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.sortObjects = false;
				container.appendChild(renderer.domElement);

				stats = new Stats();
				stats.domElement.style.position = 'absolute';
				stats.domElement.style.top = '0px';
				container.appendChild( stats.domElement );


				window.addEventListener( 'resize', onWindowResize, false );
			}


			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onDocumentMouseMove( event ) {

				event.preventDefault();

				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			}

			//

			function animate() {

				requestAnimationFrame( animate );
				render();
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

				renderer.render( scene, camera );

			}
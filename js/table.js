var table, plate,textureTable;				
				
function initTable(){
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


	scene.add(table);
}

function updateTablePosition(table){
	var tableBoxV3 = new THREE.Box3().setFromObject(table);

	console.log(tableBoxV3.size());

	table.position.y = -GROUND + tableBoxV3.size().y;
}
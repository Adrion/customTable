var modelsPaths = {},
loaderOBJ = new THREE.OBJLoader(),
loaderJSON = new THREE.AssimpJSONLoader();

function initModelLoader(catalogueJSON){
	var dataRoot = catalogueJSON.root.data;

	//on enregistre les urls des ref de plateaux
	dataRoot.plateaux.plateau.forEach(function(aPlateau){
		modelsPaths[aPlateau.reference] = {
			urlModel: aPlateau.urlObjet3D,
			type: 'plateau'
		};
	});

	//on enregistre les urls des ref des pieds
	dataRoot.pieds.pied.forEach(function(aPied){
		modelsPaths[aPied.reference] = {
			urlModel: aPied.urlObject3D,
			type: 'pied'
		};
	});
}

function loadModel(refModel){
	modelPath = modelsPaths[refModel];

	if(modelPath.type == 'plateau'){
		loaderOBJ.load( modelsPath+'/PTELC1B12/model.obj', loaderTableCallback );
	}
	else if(modelPath.type == 'pied'){
		loaderJSON.load( modelsPath+'/pieds/21862/model.json', loaderLegCallback );
	}
}

function loaderTableCallback(plt){
	table.remove(plate);
	plate=plt;

	table.add( plate );
	loadTexture('object3D/textures/882/normalMap.jpg');	
}

function loaderLegCallback(jsonModel) {
	var legs = [];
	
	for (var i = 0; i < 4; i++) {
		legs[i] = jsonModel.clone();
		legsGroup.add(legs[i]);
	};
			
	//positionnement des pieds
	legs[0].position.x = -30;
	legs[1].position.x = -30;
	legs[2].position.x =  30;
	legs[3].position.x =  30;

	legs[0].position.z = -30;
	legs[3].position.z = -30;
	legs[1].position.z = 30;
	legs[2].position.z = 30

	legs[0].rotation.z =  1.5707963268;
	legs[1].rotation.z =  3.1415926536;
	legs[2].rotation.z = -1.5707963268;
				
	legsGroup.position.y = -1;
	table.add(legsGroup);
} 
var modelsPaths = {},
  loaderOBJ = new THREE.OBJLoader(),
  loaderJSON = new THREE.AssimpJSONLoader();

function initModelLoader(catalogueJSON) {
  var dataRoot = catalogueJSON.root.data;

  //on enregistre les urls des ref de plateaux
  dataRoot.plateaux.plateau.forEach(function (aPlateau) {
    modelsPaths[aPlateau.reference] = {
      urlModel: aPlateau.urlObjet3D,
      type: 'plateau'
    };
  });

  //on enregistre les urls des ref des pieds
  dataRoot.pieds.pied.forEach(function (aPied) {
    modelsPaths[aPied.reference] = {
      urlModel: aPied.urlObject3D,
      type: 'pied'
    };
  });
}

function loadModel(refModel) {
  modelPath = modelsPaths[refModel];

  console.log(modelPath);
  if (modelPath.type == 'plateau') {
    loaderOBJ.load(modelPath.urlModel, loaderTableCallback);
  } else if (modelPath.type == 'pied') {
    loaderJSON.load(modelPath.urlModel, loaderLegCallback);
  }
}

function loaderTableCallback(plt) {
  table.remove(plate);
  plate = plt;

  table.add(plate);
  loadTexture('object3D/textures/882/normalMap.jpg');
  updateLegsPositions(plate);
}

function loaderLegCallback(jsonModel) {
  var legs = [],
    test = 0;

  //on efface les pieds présents
  for (var j = 0; j < 4; j++) {
    legsGroup.remove(legsGroup.children[0]);
  };

  //legsGroup.remove();
  for (var i = 0; i < 4; i++) {
    legs[i] = jsonModel.clone();
    legsGroup.add(legs[i]);
  };

  //positionnement des pieds
  legs[0].position.x = -30;
  legs[1].position.x = -30;
  legs[2].position.x = 30;
  legs[3].position.x = 30;

  legs[0].position.z = -30;
  legs[3].position.z = -30;
  legs[1].position.z = 30;
  legs[2].position.z = 30

  var box3 = new THREE.Box3().setFromObject(plate);
  legsGroup.scale.x = ((box3.size().x) / 2) / 60;
  legsGroup.scale.z = ((box3.size().z) / 2) / 60;

  legs[0].rotation.z = 1.5707963268;
  legs[1].rotation.z = 3.1415926536;
  legs[2].rotation.z = -1.5707963268;

  legsGroup.position.y = -1;
  table.add(legsGroup);

  updateTablePosition(table);
  updateLegsPositions(plate);
}

function updateLegsPositions(plate) {
  var box3 = new THREE.Box3().setFromObject(plate);
  legsGroup.scale.x = ((box3.size().x) / 2) / 60;
  legsGroup.scale.z = ((box3.size().z) / 2) / 60;

  /*legsGroup.scale.x = 0.9;
	legsGroup.scale.z = 0.7;*/
}
function loadTexture(texturePath){
	
	var textureName = new THREE.Texture(),
	loaderTexture = new THREE.ImageLoader();

	loaderTexture.load( texturePath, function ( image ) {
		textureName.image = image;
		textureName.needsUpdate = true;
		textureName.wrapS = THREE.RepeatWrapping;
		textureName.wrapT = THREE.RepeatWrapping;
		textureName.repeat.set( 4, 4 );
	} );

	scene.traverse( function ( child ) {
		if ( child instanceof THREE.Mesh ) {
			child.material.map = textureName;
		}
	} );
}


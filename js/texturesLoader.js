$(document).ready(function(){
		$('#test img').on('click',function(){
			console.log('test');

			var textureName = new THREE.Texture(),
			loaderTexture = new THREE.ImageLoader(),
			texturePath = $(this).attr('src');
			console.log(texturePath);

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
		});

});
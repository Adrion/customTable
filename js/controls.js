function initControls(){
	var btnRight = $('#right')[0],
	btnLeft = $('#left')[0],
    textures = $('#test img'),
    models = $('#FormesItems li');

	//Touch Events
	btnRight.addEventListener("touchstart", onHoldBtnRight, false);
    btnLeft.addEventListener("touchstart", onHoldBtnLeft, false);
    textures.on('touchstart',function(){
        loadTexture($(this).attr('src'));
    });
    models.on('touchstart',function(){
        loadModel($(this).attr('id'));
    });

    //Click Events
    btnRight.addEventListener("mousedown", onHoldBtnRight, false);
    btnLeft.addEventListener("mousedown", onHoldBtnLeft, false);
    textures.on('click', function(){
        loadTexture($(this).attr('src'));
    });
    models.on('click', function(){
        loadModel($(this).attr('id'));
    });

    //Release Events
    document.addEventListener("touchend", onRelease, false);
    document.addEventListener("mouseup", onRelease, false);
    

    function onHoldBtnRight(e){
    	e.preventDefault();
    	pressedRight = 1;
    }

    function onRelease(e){
    	e.preventDefault();
    	pressedRight = 0;
    	pressedLeft = 0;
    }

    function onHoldBtnLeft(e){
    	e.preventDefault();
    	pressedLeft = 1;
    }

}
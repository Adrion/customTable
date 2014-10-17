$(document).ready(function(){
	var btnRight = $('#right')[0],
	btnLeft = $('#left')[0],
    textures = $('#test img');

	//Touch Events
	btnRight.addEventListener("touchstart", onHoldBtnRight, false);
    btnLeft.addEventListener("touchstart", onHoldBtnLeft, false);
    textures.on('touchstart',function(){
        loadTexture($(this).attr('src'));
    });

    //Click Events
    btnRight.addEventListener("mousedown", onHoldBtnRight, false);
    btnLeft.addEventListener("mousedown", onHoldBtnLeft, false);
    textures.on('click',function(){
        loadTexture($(this).attr('src'));
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

});
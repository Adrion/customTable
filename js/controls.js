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
    $("#menuU2Y h3").on("touchstart", menuSlideHandler);

    //Click Events
    btnRight.addEventListener("mousedown", onHoldBtnRight, false);
    btnLeft.addEventListener("mousedown", onHoldBtnLeft, false);
    textures.on('click', function(){
        loadTexture($(this).attr('src'));
    });
    models.on('click', function(){
        loadModel($(this).attr('id'));
    });

    $("#menuU2Y h3").click(menuSlideHandler);


    //Release Events
    document.addEventListener("touchend", onRelease, false);
    document.addEventListener("mouseup", onRelease, false);
}

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

function menuSlideHandler(){
        //slide up all the link lists
        $("#menuU2Y ul ul").slideUp();
        //slide down the link list below the h3 clicked - only if its closed
        if(!$(this).next().is(":visible"))
        {
            $(this).next().slideDown();
        }
    }
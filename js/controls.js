$(document).ready(function(){
	var btnRight = $('#right')[0],
	btnLeft = $('#left')[0];

	//Touch Events
	btnRight.addEventListener("touchstart", onClickBtnRight, false);
	btnRight.addEventListener("touchend", onReleaseBtnRight, false);

	btnLeft.addEventListener("touchstart", onClickBtnLeft, false);
	btnLeft.addEventListener("touchend", onReleaseBtnLeft, false);

	//Click Events
	btnRight.addEventListener("mousedown", onClickBtnRight, false);
	btnRight.addEventListener("mouseup", onReleaseBtnRight, false);
	
	btnLeft.addEventListener("mousedown", onClickBtnLeft, false);
	btnLeft.addEventListener("mouseup", onReleaseBtnLeft, false);
    
    function onClickBtnRight(e){
    	e.preventDefault();
    	pressedRight = 1;
    }

    function onReleaseBtnRight(e){
    	e.preventDefault();
    	pressedRight = 0;
    }

    function onClickBtnLeft(e){
    	e.preventDefault();
    	pressedLeft = 1;
    }

    function onReleaseBtnLeft(e){
    	e.preventDefault();
    	pressedLeft = 0;
    }
});
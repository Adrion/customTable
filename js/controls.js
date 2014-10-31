function initControls() {
  var btnRight = $('#right')[0],
    btnLeft = $('#left')[0];

  //Click Events
  btnRight.addEventListener("mousedown", onHoldBtnRight, false);
  btnLeft.addEventListener("mousedown", onHoldBtnLeft, false);

}

function onHoldBtnRight(e) {
  e.preventDefault();
  pressedRight = 1;
}

function onRelease(e) {
  e.preventDefault();
  pressedRight = 0;
  pressedLeft = 0;
}

function onHoldBtnLeft(e) {
  e.preventDefault();
  pressedLeft = 1;
}
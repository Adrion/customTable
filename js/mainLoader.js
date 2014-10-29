var texturesPath = "object3D/textures",
  modelsPath = "object3D/models";

$(document).ready(function () {
  if (!Detector.webgl) Detector.addGetWebGLMessage();
  $.getJSON("datas/interface.json", function (interfaceJSON) {
    var interfaceRoot = interfaceJSON.root.data;

    $.getJSON("datas/catalogue.json", mainInit);

  });
});

function mainInit(catalogueJSON) {
  initMenu(catalogueJSON);
  initModelLoader(catalogueJSON);
  initControls();
  initScene();
  animate();
}
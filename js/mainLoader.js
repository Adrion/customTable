  var texturesPath = "object3D/textures",
    modelsPath = "object3D/models",
    isDevice = false;

  function onDeviceReady() {
    angular.element(document).ready(function () {
      if (!Detector.webgl) Detector.addGetWebGLMessage();

      //en attente d'un initController
      $.getJSON("datas/interface.json", function (interfaceJSON) {
        var interfaceRoot = interfaceJSON.root.data;
        $.getJSON("datas/catalogue.json", mainInit);
      });
    });
  }

  //On lance l'application une fois chargée.
  //On vérifie si c'est un device
  function onLoad() {
    if (document.URL.indexOf('file:///C:/') === -1 && document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1) {
      // Cordova application
      isDevice = true;
      document.addEventListener("deviceready", onDeviceReady, false);
    } else {
      // Web page
      onDeviceReady();
    }
  }

  function mainInit(catalogueJSON) {
    initMenu(catalogueJSON);
    initModelLoader(catalogueJSON);
    initScene();
    animate();
  }
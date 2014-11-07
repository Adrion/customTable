(function () {
  var app = angular.module('app', ["mobile-angular-ui"]);

  //gestion du Menu (Données)
  app.controller('DataMenuController', function () {
    var that = this;

    this.formes = [{
      reference: "PTSPC1",
      name: "test forme"
    }, {
      reference: "une deuxieme reference",
      name: "test 2 forme"
    }];
    this.dimensions = [];
    this.coloris = [{
      url: "object3D/textures/882/normalMap.jpg"
    }, {
      url: "object3D/textures/882/diffuse.jpg"
    }, {
      url: "object3D/textures/882/speculaire.jpg"
    }];
    this.pieds = [];
    this.cameras = [{
      label: "camera rotative",
      nomCamera: "camera"
    }, {
      label: "camera libre",
      nomCamera: "orbitcamera"
    }, {
      label: "camera immersive",
      nomCamera: "oculuscamera"
    }];
    //methods
    this.addElement = function (obj, type) {
      that.menu[type].push(obj);
    };

    this.selectForme = function (reference) {
      loadModel(reference);
    };

    this.selectColori = function (textureUrl) {
      loadTexture(textureUrl);
    };

    this.selectCamera = function (nomCamera) {
      activeCamera = window[nomCamera];
    };

    //controls
    this.left = function () {
      pressedLeft = 1;
    }
    this.right = function () {
      pressedRight = 1;
    }
    this.stop = function () {
      pressedRight = 0;
      pressedLeft = 0;
    }
  });

  //Gestion de l'interface du menu
  app.controller('panelController', function () {
    this.tab = 1;

    this.selectTab = function (setTab) {
      this.tab = setTab;
    };

    this.isSelected = function (checkTab) {
      return this.tab === checkTab;
    };
  });

  app.controller('rotationController', function () {

  });

})();
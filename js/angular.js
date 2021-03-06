(function () {
  var app = angular.module('app', ["mobile-angular-ui"]);

  //gestion du Menu (Données)
  app.controller('DataMenuController', function () {
    var that = this;

    this.formes = [{
      reference: "PTELC1A",
      name: "Plan table elipse"
    }, {
      reference: "PTSPC1",
      name: "Plan table rectangle"
    }];
    this.dimensions = [];
    this.coloris = [{
      url: "object3D/textures/882/normalMap.jpg"
    }, {
      url: "object3D/textures/882/diffuse.jpg"
    }, {
      url: "object3D/textures/882/speculaire.jpg"
    }];
    this.pieds = [{
      reference: "21247",
      name: "Pied No1"
    }, {
      reference: "21246",
      name: "Pied No2"
    }];
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
    this.showControls = false;
    //methods
    this.addElement = function (obj, type) {
      that.menu[type].push(obj);
    };

    this.selectElement = function (reference) {
      loadModel(reference);
    };

    this.selectColori = function (textureUrl) {
      loadTexture(textureUrl);
    };

    this.selectCamera = function (nomCamera) {
      activeCamera = window[nomCamera];

      //on affiche les boutons de rotation uniquement avec la camera rotative.
      if (nomCamera == "camera") that.showControls = true;
      else that.showControls = false;

      //On désactive la veille lorsque l'application est en mode stéreo.
      if (nomCamera == "oculuscamera") {
        window.addEventListener('click', that.switchAutoRotate, false);
        window.plugins.insomnia.keepAwake();
      } else {
        window.removeEventListener('click', that.switchAutoRotate);
        window.plugins.insomnia.allowSleepAgain();
      }
    };

    //gestion des controles de rotation
    this.left = function () {
      pressedLeft = true;
    };
    this.right = function () {
      pressedRight = true;
    };
    this.stop = function () {
      pressedRight = false;
      pressedLeft = false;
    };
    this.switchAutoRotate = function () {
      autoRotate = !autoRotate;
    };

  });

  //Gestion de l'interface du menu
  app.controller('panelController', function () {
    this.tab = 1;
    this.selectTab = function (setTab) {
      if (this.tab === setTab)
        this.tab = 0;
      else
        this.tab = setTab;
    };

    this.isSelected = function (checkTab) {
      return this.tab === checkTab;
    };

    this.checkToggle = function () {
      //toggle menu on item only with smartphones.
      if (isDevice)
        return 'off'
      else
        return 'on'
    };
  });

})();
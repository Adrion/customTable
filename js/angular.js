(function () {
  var app = angular.module('app', []);

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

  var gems = [];
})();
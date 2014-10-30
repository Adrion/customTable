(function () {
  var app = angular.module('app', []);

  app.controller('DataController', function () {
    var that = this;
    this.menu.formes = [];
    this.menu.dimensions = [];
    this.menu.coloris = [];
    this.menu.pieds = [];

    //methods
    this.addElement = function (obj, type) {
      that.menu[type].push(obj);
    };
  });

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
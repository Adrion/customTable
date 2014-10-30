(function () {
  var app = angular.module('app', []);

  app.controller('DataMenuController', function () {
    var that = this;
    this.formes = [{
      name: "test forme"
    }, {
      name: "test 2 forme"
    }];
    this.dimensions = [];
    this.coloris = [];
    this.pieds = [];
    //console.log(this.menu);

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
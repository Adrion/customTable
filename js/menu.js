function initMenu(catalogueJSON) {
  var dataRoot = catalogueJSON.root.data;

  //Gestion données des plateaux dans le menu.
  dataRoot.plateaux.plateau.forEach(function (aPlateau) {
    var descriptionP = aPlateau.description.replace('Plan table ', '');
    $('<li id="' + aPlateau.reference + '">' + descriptionP + '</li>').appendTo('#FormesItems');
    //$('<li id="'+aPlateau.reference+'">'+descriptionP+'</li>').appendTo('#DimensionsItems');
  });

  //Gestion données des pieds dans le menu.
  dataRoot.pieds.pied.forEach(function (aPied) {
    var descriptionP = aPied.description.replace('Table ', '');
    $('<li id="' + aPied.reference + '">' + descriptionP + '</li>').appendTo('#PiedsItems');
  });
}
function initMenu(catalogueJSON) {
	var dataRoot = catalogueJSON.root.data;    
    console.log(dataRoot);
    console.log(dataRoot.plateaux.plateau);

    //Gestion données des plateaux dans le menu.
    dataRoot.plateaux.plateau.forEach(function(aPlateau){
    	var descriptionP = aPlateau.description.replace('Plan table ',''); 
    	$('<li id="'+aPlateau.reference+'">'+descriptionP+'</li>').appendTo('#FormesItems');
    	//$('<li id="'+aPlateau.reference+'">'+descriptionP+'</li>').appendTo('#DimensionsItems');
   });
}
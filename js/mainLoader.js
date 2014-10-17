$(document).ready(function(){
$.getJSON("datas/interface.json", function(interfaceJSON) {
	var interfaceRoot = interfaceJSON.root.data;

	$.getJSON("datas/catalogue.json", initMenu);

});
});
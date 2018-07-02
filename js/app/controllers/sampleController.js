tipJS.controller({
	name : "app.sampleController",
	async: true,
	invoke : function( params ){
		var sampleText = this.loadModel("parserModel").getSampleText();
		this.loadView("parserView").set$txt_origin(sampleText);
	}
});

tipJS.controller({
	name : "app.listController",
	async: true,

	sample : function () {
		var parserModel = this.loadModel("parserModel");
		var parserView = this.loadView("parserView");
		var sampleText = parserModel.getSampleText();
		parserView.set$txt_origin (sampleText);
	},

	invoke : function( params ){
		var parserModel = this.loadModel("parserModel");
		var parserView = this.loadView("parserView");
		var list = parserModel.getListParsedSQL();
		if (list.length === 0) {
			parserView.set$div_alertType("Warning");
			parserView.set$div_alertMsg("저장된 ParseSQL 이 없습니다.");
			parserView.get$class_alert().show();
			return false;
		}
		parserView.set$div_history(list);
		parserView.set$span_cnt(list.length);

	}
});

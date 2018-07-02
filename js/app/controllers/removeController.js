tipJS.controller({
	name : "app.removeController",
	async: true,

	beforeInvoke:function(){
		tipJS.debug(this.name + ".beforeInvoke");
	},
	invoke : function( params ){
		var parserModel = this.loadModel("parserModel");
		var parserView = this.loadView("parserView");

		if ( parserModel.getListParsedSQL().length === 0 ) {
			parserView.set$div_alertType("Warning");
			parserView.set$div_alertMsg("저장된 ParseSQL 이 없습니다.");
			parserView.get$class_alert().show();
			return false;
		}

		if (params === "clear") {
			parserModel.clear();
		}
		parserModel.removeMaxParsedSQL();
		var list = parserModel.getListParsedSQL();
		parserView.set$div_history(list);
		parserView.set$span_cnt(list.length);
	}
});

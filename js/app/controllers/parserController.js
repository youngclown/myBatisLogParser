
tipJS.controller({
	name : "app.parserController",
	async: true,

	beforeInvoke:function(){
		tipJS.debug(this.name + ".beforeInvoke");
	},

	parse : function () {

		var parserModel = this.loadModel("parserModel");
		var parserView = this.loadView("parserView");

		var i=0, lastIdx = 0;

		var $txt_origin = parserView.get$txt_origin();
		var $txt_parsing = parserView.get$txt_parsing();

		var originArr = [], parsingArr = [], paramArr = [];
		var paramCnt = 0;
		var result,preparing = "";
		var param = {};

		originArr = $txt_origin.val().split("\n");
		parsingArr[0] = originArr[0].substring ( originArr[0].indexOf ("PRE> ") );
		parsingArr[1] = originArr[1].trim();

		if (originArr.length > 2) {
			for (i =2; i < originArr.length; i++ ) {
				parsingArr[1] += originArr[i];
			}
		}
		preparing  = parsingArr[0];
		paramArr = parsingArr[1].split(",");
		tipJS.debug("paramArr:"+paramArr);
		for (i = 0; i < paramArr.length; i++) {
			var tempParams = paramArr[i];
			lastIdx = tempParams.lastIndexOf("(");

			param.val = $.trim ( tempParams.substring(0, lastIdx ) );

			if (lastIdx < 0) {
				param.val  = "null";
			}

			param.typ = tempParams.substring(tempParams.lastIndexOf("(")+1, paramArr[i].lastIndexOf(")"));

			if (preparing.indexOf("'@{") > preparing.indexOf("?")) {
				param.val = "'"+param.val+"'";
				preparing = preparing.replace(/'@{[0-9]?[0-9][0-9]?}'/, param.val);
			} else {
				param.val = "'"+param.val+"'";
				preparing = preparing.replace("?", param.val);
			}

		}
		result = preparing;

		parserView.set$txt_parsing(result);
	},

	save : function () {
		var parserModel = this.loadModel("parserModel");
		var parserView = this.loadView("parserView");

		var maxKey = parserModel.getMaxKey();
		var parsedSql = parserView.get$txt_parsing().val();

		parserModel.setParsedSQL(maxKey, parsedSql);
	},

	remove : function () {
		var parserModel = this.loadModel("parserModel");
		var parserView = this.loadView("parserView");

		parserModel.removeMaxParsedSQL();
	},

	list : function () {
		var parserModel = this.loadModel("parserModel");
		var parserView = this.loadView("parserView");

		var list = parserModel.getListParsedSQL();
		parserView.set$div_history(list);

		parserView.set$span_cnt(list.length);
	},

	sample : function () {
		var parserModel = this.loadModel("parserModel");
		var parserView = this.loadView("parserView");
		var sampleText = parserModel.getSampleText();
		parserView.set$txt_origin (sampleText);
	},

	invoke : function( params ){
		var actName = params;
		switch (actName) {
			case "parse":
				this.parse();
			break;
			case "sample":
				this.sample();
			break;
			case "save":
				this.save();
			break;
			case "remove":
				this.remove();
			break;
			case "list":
			this.list();
			break;
			case "clear":
			localStorage.clear();
			break;
		}


	}
});

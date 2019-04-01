
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
		var preparing = "";
		var param = {};

		originArr = $txt_origin.val().split("\n");
		parsingArr[0] = originArr[0].substring ( originArr[0].indexOf ("PRE> ") +5 );
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

			if (preparing.indexOf("@{") >= 0) {
				if(preparing.indexOf("'@{") > preparing.indexOf("@{") && preparing.indexOf("@{") != -1) {
					// scouter 가 "/"를 유실시켜, 쿼리 자체가 완성이 안되는 경우 때문에 강제로 해당 구분에 "/"를 넣어줌.
					if (param.val == 10 && (preparing.indexOf("@{") - preparing.indexOf("} ) OR ")) <10) {
						preparing = preparing.replace(/@{[0-9]?[0-9][0-9]?}/, "/ " + param.val);
					} else {
						preparing = preparing.replace(/@{[0-9]?[0-9][0-9]?}/, param.val);
					}
					continue;
				} else if(preparing.indexOf("'@{") >= 0) {
					preparing = preparing.replace(/[']@{[0-9]?[0-9][0-9]?}[']/, param.val);
					continue;
				} else {
					// scouter 가 "/"를 유실시켜, 쿼리 자체가 완성이 안되는 경우 때문에 강제로 해당 구분에 "/"를 넣어줌.
					if (param.val == 10 && (preparing.indexOf("@{") - preparing.indexOf("} ) OR ")) <10) {
						preparing = preparing.replace(/@{[0-9]?[0-9][0-9]?}/, "/ " + param.val);
					} else {
						preparing = preparing.replace(/@{[0-9]?[0-9][0-9]?}/, param.val);
					}
					continue;
				}
			}

			if (preparing.indexOf("?") >= 0){
				preparing = preparing.replace("?", param.val);
				continue;
			}

		}
				parserView.set$txt_parsing(preparing);
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

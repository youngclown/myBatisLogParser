tipJS.controller({
	name : "app.parseController",
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

		parsingArr[1] = parsingArr[1].substring ( parsingArr[1].indexOf ("[")+1,parsingArr[1].indexOf ("]"));
		paramArr = parsingArr[1].split(",");

		tipJS.debug("paramArr:"+paramArr);


		for (i = 0; i < paramArr.length; i++) {
			var tempParams = paramArr[i];
			param.val = $.trim ( tempParams );

			if (lastIdx < 0) {
				param.val  = "null";
			}

			if (preparing.indexOf("'@{") >= 0 && preparing.indexOf("'@{") < preparing.indexOf("?")) {
				param.val = param.val;
				preparing = preparing.replace(/[']@{[0-9]?[0-9][0-9]?}[']/, param.val);
			} else if (preparing.indexOf("?") >= 0){
				param.val = param.val;
				preparing = preparing.replace("?", param.val);
			}
		}


		result = preparing;

		parserView.set$txt_parsing(result);
	},
	isRequiredOk : function ( params ) {
		var parserView = this.loadView("parserView");
		if ( $.trim ( parserView.get$txt_origin().val() ) === "" ) {
			parserView.set$div_alertType("Required Error");
			parserView.set$div_alertMsg("Original Log 를 입력하세요. (잘모르겠으면 sample 버튼 누르세요)");
			parserView.get$txt_origin().focus();
			parserView.get$class_alert().show();
			return false;
		}
		return true;
	},
	invoke : function( params ){

		if ( !this.isRequiredOk() ) {
			return false;
		}

		this.parse();
	}
});

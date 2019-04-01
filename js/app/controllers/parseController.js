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
		var preparing = "";
		var param = {};

		originArr = $txt_origin.val().split("\n");
		parsingArr[0] = originArr[0].substring ( originArr[0].indexOf ("PRE> ") + 5);
		parsingArr[1] = originArr[1].trim();

		if (originArr.length > 2) {
			for (i =2; i < originArr.length; i++ ) {
				parsingArr[1] += originArr[i];
			}
		}
		preparing  = parsingArr[0];

		parsingArr[1] = parsingArr[1].substring ( parsingArr[1].indexOf ("[")+1,parsingArr[1].indexOf ("]"));
		paramArr = parsingArr[1].split(",");

		tipJS.log("paramArr:"+paramArr);


		for (i = 0; i < paramArr.length; i++) {
			var tempParams = paramArr[i];
			param.val = $.trim ( tempParams );

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
				}
				// @{ 형태만 있는 경우, "@{ 보다 숫자가 낮는 경우의 수 존재.
				else {
					// scouter 가 "/"를 유실시켜, 쿼리 자체가 완성이 안되는 경우 때문에 강제로 해당 구분에 "/"를 넣어줌.
					if (param.val == 10 && (preparing.indexOf("@{") - preparing.indexOf("} ) OR ")) <10) {
						preparing = preparing.replace(/@{[0-9]?[0-9][0-9]?}/, "/ " + param.val);
					} else {
						preparing = preparing.replace(/@{[0-9]?[0-9][0-9]?}/, param.val);
					}
					continue;
				}
			}

			// scouter 에서 @{1} 형태가 다 끝나면 ? 형태를 치환함.
			if (preparing.indexOf("?") >= 0){
				preparing = preparing.replace("?", param.val);
				continue;
			}

		}
		parserView.set$txt_parsing(preparing);
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

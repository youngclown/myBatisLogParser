tipJS.model({
	__name : "app.parserModel",
	sampleText: "",
	savedCount: 0,
	getSampleText : function(){
		this.sampleText = "    -    [000002] 13:38:46.439        0      0  PRE> /* rtbShop.selMobileShopData ymkim*/   SELECT url, pcode, pnm, price,   imgpath, purl, cate1, NO, kakao_status FROM MOB_SHOP_DATA   WHERE   status='@{1}'   AND liveChk='@{2}'   AND userid=?   AND    pcode=?      AND    kakao_status=?";
		this.sampleText += "\n                                                ['Y','Y','lfmall','A229XX00132','A'] 1 ms"
		return this.sampleText;
	},
	getParsedSQL : function(key) {
		return localStorage.getItem(key);
	},
	setParsedSQL : function(key, value) {
		localStorage.setItem(key, value);
	},
	getMaxKey : function() {
		return localStorage.length;
	},
	getListParsedSQL : function() {
		var list = [];
		$.each ( localStorage, function (k,v) {
			list[k] = v;
		});
		return list;
	},
	removeMaxParsedSQL : function (key) {
		var maxKey = this.getMaxKey();
 		localStorage.removeItem(parseInt(maxKey-1));
	},
	clear : function () {
		localStorage.clear();
	}
});

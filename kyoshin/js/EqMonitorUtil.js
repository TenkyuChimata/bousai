var EqMonitor;
if(!EqMonitor){EqMonitor = {};}
EqMonitor.Util = function(){
};
EqMonitor.Util.prototype = {
	getNowStr: function(){
		var now = new Date();
		var year = now.getFullYear();
		var month = now.getMonth()+1;
		var day = now.getDate();
		var hour = now.getHours();
		var min = now.getMinutes();
		var sec = now.getSeconds();
		var msec = now.getMilliseconds();
		var ary = new Array();
		ary[ary.length] = year;
		ary[ary.length] = this.dblDigitStr(month);
		ary[ary.length] = this.dblDigitStr(day);
		ary[ary.length] = this.dblDigitStr(hour);
		ary[ary.length] = this.dblDigitStr(min);
		ary[ary.length] = this.dblDigitStr(sec);
		ary[ary.length] = this.trpDigitStr(msec);
		return ary.join('-');
	},
	dblDigitStr: function(num){
		return num < 10 ? '0' + String(num) : String(num);
	},
	trpDigitStr: function(num){
		if(num < 10) return '00' + String(num);
		if(num < 100) return '0' + String(num);
		return String(num);
	},
	addSecond: function(now,addsec){
		var time = new Date();
		time.setTime(now.getTime()+addsec*1000);
		return time;
	},
	getReqTimeStr: function(now){
		var year = now.getFullYear();
		var month = now.getMonth()+1;
		var day = now.getDate();
		var hour = now.getHours();
		var min = now.getMinutes();
		var sec = now.getSeconds();
		var ary = new Array();
		ary[ary.length] = year;
		ary[ary.length] = this.dblDigitStr(month);
		ary[ary.length] = this.dblDigitStr(day);
		ary[ary.length] = this.dblDigitStr(hour);
		ary[ary.length] = this.dblDigitStr(min);
		ary[ary.length] = this.dblDigitStr(sec);
		return ary.join('');
	}
};

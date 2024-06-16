var EqMonitor;
if(!EqMonitor){EqMonitor = {};}
EqMonitor.TimeCtrl = function(){
	this.time = { sld: null, now: null, tooltip: null };
	this.timebtn = { rdo: null, status: null };
	this.latest = { btn: null };
};
EqMonitor.TimeCtrl.prototype = {
	init: function(){
		this.mkTimeSld();
		this.mkTimerRdo();
		this.mkLatestTimeBtn();
	},
	mkTimeSld: function(){
		this.time.sld = $("#time-slider");
		this.time.sld.slider({
			disabled: false,
			max: CONF.TIME_SLIDER.RANGE_SEC,
			min: 0,
			step: CONF.TIME_SLIDER.RANGE_STEP,
			value: CONF.TIME_SLIDER.RANGE_SEC,
			animate: false,
			orientation: "horizontal"
		});
		this.time.tooltip = $('#main-timectrl-slider-text');
		this.time.tooltip.hide();
	},
	mkTimerRdo: function(){
		this.timebtn.rdo = $("input[name='time-button-radio']:radio");
		for(var i=0; i<CONF.UPDATE_TIME_RADIO.length; i++){
			this.timebtn.rdo[i].value = CONF.UPDATE_TIME_RADIO[i].VALUE;
			this.timebtn.rdo[i].checked = CONF.UPDATE_TIME_RADIO[i].CHECKED;
			$("#time-button-radio"+i+" + label")[0].innerHTML=CONF.UPDATE_TIME_RADIO[i].TEXT;
		}
		$("#timectrl-time-button").buttonset();
	},
	mkLatestTimeBtn: function(){
		this.latest.btn = $("#latesttime-button");
		this.latest.btn.button({
			disabled: false
		});
		this.latest.btn.button("option","label",CONF.LATEST_TIME_BTN.LABEL);
		this.latest.btn.button( "option", "icons", {primary:'ui-icon-seek-end'});
	},
	setSldChgEvt: function(obj,fnc){
		this.time.sld.bind("slidechange",obj,fnc);
	},
	setSldStartEvt: function(obj,fnc){
		this.time.sld.bind("slidestart",obj,fnc);
	},
	setSldStopEvt: function(obj,fnc){
		this.time.sld.bind("slidestop",obj,fnc);
	},
	setSldSlideEvt: function(obj,fnc){
		this.time.sld.bind("slide",obj,fnc);
	},
	setTmRdoChgEvt: function(obj,fnc){
		this.timebtn.rdo.bind('change',obj,fnc);
	},
	setLtsBtnClickEvt: function(obj,fnc){
		this.latest.btn.bind("click",obj,fnc);
	},
	getTimeRdoVal: function(){
		return this.timebtn.rdo.filter(":checked").val();
	},
	getTimeRdoPlay: function(){
		if(this.getTimeRdoVal() == "play") return true;
		return false;
	},
	getSlideVal: function(){
		return this.time.sld.slider("value") - this.time.sld.slider("option","max");
	},
	viewToolTip: function(){
		var slider_text = "";
		if(this.getSlideVal() == 0){
			slider_text = "現在";
		}else{
			slider_text = String(Math.floor(this.getSlideVal()/60))+"分";
		}
		var slider_width = parseInt(this.time.sld.css("width").replace("px",""));
		var mypos = slider_width + (this.getSlideVal()*slider_width)/CONF.TIME_SLIDER.RANGE_SEC - 10;
		this.time.tooltip.css('left',mypos).text(slider_text);
		this.time.tooltip.css('top',this.time.sld.position().top-20).text(slider_text);
	},
	viewSildeTime: function(){
		this.viewToolTip();
		this.time.tooltip.fadeIn('fast');
	},
	hideSildeTime: function(){
		this.viewToolTip();
		this.time.tooltip.fadeOut('fast');
	},
	setNowTime: function(time){
		this.time.now = time;
	},
	getNowTime: function(){
		return this.time.now;
	},
	moveSlide: function(val){
		var value = this.time.sld.slider("option","max") + val;
		this.time.sld.slider('value',value);
	}
};

var EqMonitor;
if(!EqMonitor){EqMonitor = {};}
EqMonitor.Ctrl = function(){
	this.util = null;
	this.lyrctrl = null;
	this.timectrl = null;
	this.mapctrl = null;
	this.mssgctrl = null;
	this.audioctrl = null;
	this.isTimerLock = false;
	this.slide_event = false;
	this.is_init_view = false;
	var timerid = null;
	var timereset_timerid = null;
};
EqMonitor.Ctrl.prototype = {
	init: function(){
		this.util = new EqMonitor.Util();
		this.lyrctrl = new EqMonitor.LayerCtrl();
		this.lyrctrl.init();
		this.timectrl = new EqMonitor.TimeCtrl();
		this.timectrl.init();
		this.mapctrl = new EqMonitor.MapCtrl();
		this.mapctrl.init();
		this.audioctrl = new EqMonitor.AudioCtrl({is_on:CONF.AUDIO_VOLUME.DEFAULT_IS_ON});
		this.audioctrl.init();
		this.mssgctrl = new EqMonitor.MessageCtrl({audio:this.audioctrl});
		this.mssgctrl.init();
		this.setEvent();
		this.setInitNowTime();
	},
	setEvent: function(){
		this.lyrctrl.setLyrChgEvt(this,this.onChgLyr);
		this.lyrctrl.setSfBhChgEvt(this,this.onChgSfBh);
		this.lyrctrl.setAlKyChgEvt(this,this.onChgAlKy);
		this.lyrctrl.setWMBMChgEvt(this,this.onChgWMBM);
		this.lyrctrl.setEstimateShindoChgEvt(this,this.onChgEstShindo);
		this.lyrctrl.setPSWaveChgEvt(this,this.onChgPSWave);
		this.timectrl.setSldChgEvt(this,this.onChgTime);
		this.timectrl.setSldStartEvt(this,this.onStartChgTime);
		this.timectrl.setSldStopEvt(this,this.onStopChgTime);
		this.timectrl.setSldSlideEvt(this,this.onSlidChgTime);
		this.timectrl.setTmRdoChgEvt(this,this.onChgTimeBtn);
		this.timectrl.setLtsBtnClickEvt(this,this.onClickLatestTimerBtn);
		this.mapctrl.setShihyoImgErrEvt(this,this.onShihyoImgErr);
		this.mapctrl.setPSWaveImgErrEvt(this,this.onPSWaveImgErr);
		this.mapctrl.setEstShindoImgErrEvt(this,this.onEstShindoImgErr);
		this.mapctrl.setPSWaveOnloadEvt(this,this.onPSWaveOnload);
		this.mapctrl.setEstShindoOnloadEvt(this,this.onEstShindoOnload);
	},
	start: function(){
		this.view();
		if(this.isTimerBtnOn()){
			this.startTimer();
		}
		this.startRestNowTimeTimer();
		this.updateBaseMapImage();
		this.updateScaleImage();
	},
	updateView: function(){
		this.view();
		this.updateNowTime();
	},
	view: function(){
		var lyr = this.getLyrVal();
		var sfbh = this.getSfBhVal();
		var alky = this.getAlKyVal();
		var time = this.getTimeVal();
		var hypo = this.getHypoKindVal();
		var hypo_is_on = this.getPSWaveVal();
		var estshindo_is_on = this.getEstShindoVal();
		this.mapctrl.view(lyr,sfbh,hypo,hypo_is_on,estshindo_is_on,time,alky);
		this.getHypoInfo(hypo,time);
	},
	resetNowTime: function(){
		this.setNowTime();
	},
	onChgLyr: function(event){
		var ctrl = event.data;
		var check = ctrl.isEnableEstShindo(ctrl.lyrctrl.getLyrVal(),ctrl.lyrctrl.getSfBhVal());
		if(check){
			ctrl.lyrctrl.enableEstShindo();
		}else{
			ctrl.lyrctrl.disableEstShindo();
		}
		ctrl.view();
		ctrl.updateScaleImage();
	},
	onChgSfBh: function(event){
		var ctrl = event.data;
		var check = ctrl.isEnableEstShindo(ctrl.lyrctrl.getLyrVal(),ctrl.lyrctrl.getSfBhVal());
		if(check){
			ctrl.lyrctrl.enableEstShindo();
		}else{
			ctrl.lyrctrl.disableEstShindo();
		}
		ctrl.view();
		ctrl.updateScaleImage();
	},
        onChgAlKy: function(event){
                var ctrl = event.data;
		ctrl.view();
		ctrl.updateBaseMapImage();
		ctrl.updateScaleImage();
        },
        onChgWMBM: function(event){
                var ctrl = event.data;
                ctrl.view();
		ctrl.setBaseMapLabel();
                ctrl.updateBaseMapImage();
		ctrl.updateScaleImage();
        },
	onChgEstShindo: function(event){
		var ctrl = event.data;
		if(!ctrl.lyrctrl.getEstShindoVal()){
			ctrl.mapctrl.hideEstShindo();
		}
		ctrl.setEstShindoLabel();
	},
	onChgPSWave: function(event){
		var ctrl = event.data;
		if(!ctrl.lyrctrl.getPSWaveVal()){
			ctrl.mapctrl.hidePSWave();
		}
		ctrl.setPSWaveLabel();
	},
	onChgTime: function(event){
		var ctrl = event.data;
	},
	onStartChgTime: function(event){
		var ctrl = event.data;
		ctrl.timectrl.viewSildeTime();
	},
	onStopChgTime: function(event){
		var ctrl = event.data;
		ctrl.timectrl.hideSildeTime();
	},
	onSlidChgTime: function(event){
		var ctrl = event.data;
		if( ctrl.slide_event == false ){
			//ctrl.slide_event = true;
			ctrl.timectrl.viewToolTip();
			ctrl.view();
			setTimeout(function(){ctrl.changeSldEvtFlg();},CONF.TIME_SLIDER.SLIDE_EVT_SLEEP_MSEC);
		}else{
			event.preventDefault();
		}
	},
	changeSldEvtFlg: function(){
		if( this.slide_event == true ){
			this.slide_event = false;
		}
	},
	onChgTimeBtn: function(event){
		var ctrl = event.data;
		if(ctrl.isTimerBtnOn()){
			ctrl.is_init_view = true;
			ctrl.stopTimer();
			ctrl.setNowTime();
			ctrl.view();
			ctrl.startTimer();
			ctrl.is_init_view = false;
		}else{
			ctrl.stopTimer();
		}
	},
	onClickLatestTimerBtn: function(event){
		var ctrl = event.data;
		ctrl.timectrl.moveSlide(0);
	},
	onPSWaveOnload: function(event){
		var ctrl = event.data;
		if(!ctrl.isPSWaveImgAuth()){
			window.location = AUTH_CONF.TOP_LOCATION_URL;
		}
	},
	onEstShindoOnload: function(event){
		var ctrl = event.data;
		if(!ctrl.isEstShindoImgAuth()){
			window.location = AUTH_CONF.TOP_LOCATION_URL;
		}
	},
	onShihyoImgErr: function(event){
		var ctrl = event.data;
		ctrl.hideShihyoImage();
	},
	onPSWaveImgErr: function(event){
		var ctrl = event.data;
		ctrl.hidePSWaveImage();
	},
	onEstShindoImgErr: function(event){
		var ctrl = event.data;
		ctrl.hideEstShindoImage();
	},
	isEnableEstShindo: function(shihyo,sfbh){
		if(shihyo == CONF.LAYER_SELECT[0].VALUE && sfbh == CONF.SURFACE_BOREHOLE_RADIO[0].VALUE) return true;
		return false;
	},
	startTimer: function(){
		if(!this.isTimerLock){
			this.lockTimer();
			var self = this;
			this.timerid = setInterval(function(){self.updateView();},CONF.TIMER_INTERVAL_SEC*1000);
			this.unlockTimer();
		}
	},
	stopTimer: function(){
		if(!this.isTimerLock){
			this.lockTimer();
			clearInterval(this.timerid);
			this.unlockTimer();
		}
	},
	startRestNowTimeTimer: function(){
		var self = this;
		this.timereset_timerid = setInterval(function(){self.resetNowTime();},CONF.TIMER_NOWTIME_RESET_INTERVAL_SEC*1000);
	},
	stopRestNowTimeTimer: function(){
		clearInterval(this.timereset_timerid);
	},
	isTimerLock: function(){
		return this.TimeLock;
	},
	lockTimer: function(){
		this.isTimerLock = true;
	},
	unlockTimer: function(){
		this.isTimerLock = false;
	},
	getLyrVal: function(){
		return this.lyrctrl.getLyrVal();
	},
	getSfBhVal: function(){
		return this.lyrctrl.getSfBhVal();
	},
        getAlKyVal: function(){
                return this.lyrctrl.getAlKyVal();
        },
        getBaseMapVal: function(){
                return this.lyrctrl.getBaseMapVal();
        },
	getEstShindoVal: function(){
		return this.lyrctrl.getEstShindoVal();
	},
	getPSWaveVal: function(){
		return this.lyrctrl.getPSWaveVal();
	},
	getHypoKindVal: function(){
		return this.lyrctrl.getHypocenterKindVal();
	},
        setBaseMapLabel: function(){
                this.lyrctrl.setBaseMapLabel();
                return;
        },
	setEstShindoLabel: function(){
		this.lyrctrl.setEstimateShindoLabel();
		return;
	},
	setPSWaveLabel: function(){
		this.lyrctrl.setPSWaveLabel();
		return;
	},
	hideShihyoImage: function(){
		if(this.mapctrl.isShowShihyo()){
			this.mapctrl.hideShihyo();
		}
	},
	hidePSWaveImage: function(){
		if(this.mapctrl.isShowPSWave()){
			this.mapctrl.hidePSWave();
		}
	},
	hideEstShindoImage: function(){
		if(this.mapctrl.isShowEstShindo()){
			this.mapctrl.hideEstShindo();
		}
	},
	updateScaleImage: function(){
		var lyr = this.getLyrVal();
		var sfbh = this.getSfBhVal();
		var wmbm = "";
		if(this.getBaseMapVal()) wmbm = 'w';
		else wmbm = 'b';
		this.mapctrl.scaleView(lyr,sfbh,wmbm);
	},
        updateBaseMapImage: function(){
		var alky = this.getAlKyVal();
		if(this.getBaseMapVal())
		{
			this.mapctrl.kmonibasemapView('w',alky);
		}
		else
		{
			this.mapctrl.kmonibasemapView('b',alky);
		}
        },
	isPSWaveImgAuth: function(){
		var imgsize = this.mapctrl.getPSWaveNaturalSize();
		if( imgsize.widht == AUTH_CONF.AUTH_ERROE_IMG_SIZE.WIDTH || imgsize.height == AUTH_CONF.AUTH_ERROE_IMG_SIZE.HEIGHT ){
			return false;
		}
		return true;
	},
	isEstShindoImgAuth: function(){
		var imgsize = this.mapctrl.getEstShindoNaturalSize();
		if( imgsize.widht == AUTH_CONF.AUTH_ERROE_IMG_SIZE.WIDTH || imgsize.height == AUTH_CONF.AUTH_ERROE_IMG_SIZE.HEIGHT ){
			return false;
		}
		return true;
	},
	getTimeVal: function(){
		var sld_value = this.timectrl.getSlideVal();
		var now_time = this.timectrl.getNowTime();
		var res = this.util.addSecond(now_time,sld_value);
		return this.util.getReqTimeStr(res);
	},
	updateNowTime: function(){
		var now_time = this.timectrl.getNowTime();
		var new_time = this.util.addSecond(now_time,CONF.TIMER_INTERVAL_SEC);
		this.timectrl.setNowTime(new_time);
	},
	isTimerBtnOn: function(){
		return this.timectrl.getTimeRdoPlay();
	},
	setNowTime: function(){
		var self = this;
		$.ajax({
			type: "GET",
			url: WEB_SERVICE_CONF.LATEST_DATA_TIME_URL,
			datatype: "json",
			async: true,
			timeout: 0,
			cache: false,
			success: function(data,status){
				var tmp = data.JST.str.split(" ");
				var day = tmp[0].split("-");
				var time = tmp[1].split(":");
				var latesttime = new Date();
				latesttime.setFullYear(parseInt(day[0],10));
				latesttime.setMonth(parseInt(day[1],10)-1);
				latesttime.setDate(parseInt(day[2],10));
				latesttime.setHours(parseInt(time[0],10));
				latesttime.setMinutes(parseInt(time[1],10));
				latesttime.setSeconds(parseInt(time[2] - 1,10));
				self.timectrl.setNowTime(latesttime);
				self=null;
			},
			error: function(xhr, status, err){
				var latesttime = new Date();
				self.timectrl.setNowTime(latesttime);
				self=null;
			}
		});
	},
	setInitNowTime: function(){
		var self = this;
		$.ajax({
			type: "GET",
			url: WEB_SERVICE_CONF.LATEST_DATA_TIME_URL,
			dataType: "json",
			async: false,
			timeout: 0,
			cache: false,
			success: function(data,status, xhr){
				var jsonObj = JSON.parse(xhr.responseText);
				var tmp = jsonObj.JST.str.split(" ");
				var day = tmp[0].split("-");
				var time = tmp[1].split(":");
				var latesttime = new Date();
				latesttime.setFullYear(parseInt(day[0],10));
				latesttime.setMonth(parseInt(day[1],10)-1);
				latesttime.setDate(parseInt(day[2],10));
				latesttime.setHours(parseInt(time[0],10));
				latesttime.setMinutes(parseInt(time[1],10));
				latesttime.setSeconds(parseInt(time[2] - 1,10));
				self.timectrl.setNowTime(latesttime);
				self=null;
			},
			error: function(xhr, status, err){
				var latesttime = new Date();
				self.timectrl.setNowTime(latesttime);
				self=null;
			}
		});
	},
	getHypoInfo: function(hypo,time){
		var self = this;
		$.ajax({
			type: "GET",
			url: WEB_SERVICE_CONF.HYPO_DATA_URL+'/'+hypo+'/'+time+'.json',
			dataType: "jsonp",
			data: {},
			async: true,
			timeout: 0,
			cache: true,
			jsonp: "jsoncallback",
			success: function(data,status){
				if(data.result.status == "failure" && data.result.is_auth == false){
					window.location = AUTH_CONF.TOP_LOCATION_URL;
				}else{
					sld = self.timectrl.getSlideVal();
					self.mssgctrl.setHypoMessage(data,sld);
				}
				data=null;
				self=null;
			},
			error: function(xhr,status,err){
				self=null;
			}
		});
	}
};

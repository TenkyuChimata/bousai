var EqMonitor;
if(!EqMonitor){EqMonitor = {};}
EqMonitor.MapCtrl = function(){
	this.shihyo = null;
	this.scale = null;
	this.kmonibasemap = null;
	this.pswave = null;
	this.estshindo = null;
};
EqMonitor.MapCtrl.prototype = {
	init: function(){
		this.shihyo = $("#map-shihyo");
		this.pswave = $("#map-pswave");
		this.estshindo = $("#map-estshindo");
		this.scale = $("#map-scale");
		this.kmonibasemap = $("#map-basemap");
	},
	setPSWaveOnloadEvt: function(obj,fnc){
		this.pswave.bind("load",obj,fnc);
	},
	setEstShindoOnloadEvt: function(obj,fnc){
		this.estshindo.bind("load",obj,fnc);
	},
	setShihyoImgErrEvt: function(obj,fnc){
		this.shihyo.bind("error",obj,fnc);
	},
	setPSWaveImgErrEvt: function(obj,fnc){
		this.pswave.bind("error",obj,fnc);
	},
	setEstShindoImgErrEvt: function(obj,fnc){
		this.estshindo.bind("error",obj,fnc);
	},
	view: function(layer,sfbh,hypo,hypo_is_on,estshindo_is_on,time,alky){
		if(hypo_is_on){
			this.showPSWave(this.getPSWaveImgUrl(hypo,time,alky));
		}else{
			if(this.isShowPSWave()){ this.hidePSWave(); }
		}
		if(estshindo_is_on){
			this.showEstShindo(this.getEstShindoImgUrl(hypo,time,alky));
		}else{
			if(this.isShowEstShindo()){ this.hideEstShindo(); }
		}
		this.showShihyo(this.getShihyoImgUrl(layer,sfbh,time,alky));
	},
	scaleView: function(layer,sfbh,wmbm){
		this.scale.attr("src",this.getScaleImgUrl(layer,sfbh,wmbm));
	},
        kmonibasemapView: function(wmbm,alky){
                this.kmonibasemap.attr("src",this.getBaseMapImgUrl(wmbm,alky));
        },
	getShihyoImgUrl: function(layer,sfbh,time,alky){
		if(alky == 'a')
		{
                	var shihyoimg = time+"."+layer+"_"+sfbh+".gif";
			return CONF.MAP_IMAGE_BASE_STATIC_URL+layer+"_"+sfbh+"/"+time.substring(0, 8)+"/"+shihyoimg;
		}
		else if(alky == 'k')
		{
			var shihyoimg = time+"."+layer+"_"+sfbh+".gif";
			return CONF.MAP_IMAGE_BASE_KYUSYU_STATIC_URL+layer+"_"+sfbh+"/"+time.substring(0, 8)+"/"+shihyoimg;
		}
	},
	getScaleImgUrl: function(layer,sfbh,wmbm){
		return CONF.SCALE_IMAGE_BACE_URL+"nied_"+layer+"_"+sfbh+"_"+wmbm+"_scale.gif";
	},
        getBaseMapImgUrl: function(wmbm,alky){
		if(alky == 'a')
		{
                	return CONF.BASEMAP_IMAGE_BACE_URL+"base_map_"+wmbm+".gif";
		}
		else if(alky == 'k')
		{
			return CONF.BASEMAP_IMAGE_BACE_KYUSYU_URL+"base_map_"+wmbm+".gif";
		}
        },
	getPSWaveImgUrl: function(hypo,time,alky){
		if(alky == 'a')
		{
                	var psimg = time+"."+hypo+".gif";
			return CONF.CRICLE_IMAGE_BASE_STATIC_URL+hypo+"/"+time.substring(0, 8)+"/"+psimg;
		}
		else if(alky == 'k')
		{
                        var psimg = time+"."+hypo+".gif";
                        return CONF.CRICLE_IMAGE_BASE_KYUSYU_STATIC_URL+hypo+"/"+time.substring(0, 8)+"/"+psimg;
		}
	},
	// Est.Shindo image
	getEstShindoImgUrl: function(hypo,time,alky){
                if(alky == 'a')
		{
                	var estimg = time+"."+hypo+".gif";
			return CONF.EST_SHINDO_IMAGE_BASE_STATIC_URL+hypo+"/"+time.substring(0, 8)+"/"+estimg;
		}
		else if (alky == 'k')
		{
                        var estimg = time+"."+hypo+".gif";
                        return CONF.EST_SHINDO_IMAGE_BASE_KYUSYU_STATIC_URL+hypo+"/"+time.substring(0, 8)+"/"+estimg;
		}
	},
	showShihyo: function(url){
		this.shihyo.attr("src",url);
		if(!this.isShowShihyo()) this.shihyo.show();
	},
	hideShihyo: function(url){
		this.shihyo.attr("src",CONF.NODATA_IMAGE_URL);
		if(this.isShowShihyo()) this.shihyo.hide();
	},
	isShowShihyo: function(){
		var css_value = this.shihyo.css("display");
		if(css_value == "block" || css_value == "inline"){
			return true;
		}else{
			return false;
		}
	},
	isShihyoID: function(id){
		if(id == this.shihyo.selector) return true;
		return false;
	},
	getPSWaveNaturalSize: function(){
		var w = null;
		var h = null;
		if( typeof this.pswave[0].naturalWidth !== 'undefined' ){
			w = this.pswave[0].naturalWidth;
			h = this.pswave[0].naturalHeight;
		}else if ( typeof this.pswave[0].runtimeStyle !== 'undefined' ){
			var run = this.pswave[0].runtimeStyle;
			var mem = { w:run.width, h: run.height };
			run.width = "auto";
			run.height = "auto";
			w = this.pswave[0].width;
			h = this.pswave[0].height;
			run.width = mem.w;
			run.height = mem.h;
		}
		return {'width':w, 'height':h};
	},
	showPSWave: function(url){
		this.pswave.attr("src",url);
		if(!this.isShowPSWave()) this.pswave.show();
	},
	hidePSWave: function(){
		this.pswave.attr("src",CONF.NODATA_IMAGE_URL);
		if(this.isShowPSWave()) this.pswave.hide();
	},
	isShowPSWave: function(){
		var css_value = this.pswave.css("display");
		if(css_value == "block" || css_value == "inline"){
			return true;
		}else{
			return false;
		}
	},
	isPSWaveID: function(id){
		if(id == this.pswave.selector) return true;
		return false;
	},
	getEstShindoNaturalSize: function(){
		var w = this.estshindo[0].naturalWidth;
		var h = this.estshindo[0].naturalHeight;
		return {'width':w, 'height':h};
	},
	showEstShindo: function(url){
		this.estshindo.attr("src",url);
		if(!this.isShowEstShindo()) this.estshindo.show();
	},
	hideEstShindo: function(){
		this.estshindo.attr("src",CONF.NODATA_IMAGE_URL);
		if(this.isShowEstShindo()) this.estshindo.hide();
	},
	isShowEstShindo: function(){
		var css_value = this.estshindo.css("display");
		if(css_value == "block" || css_value == "inline"){
			return true;
		}else{
			return false;
		}
	},
	isEstShindoID: function(id){
		if(id == this.estshindo.selector) return true;
		return false;
	}
};

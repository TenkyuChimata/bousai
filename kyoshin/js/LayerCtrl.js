var EqMonitor;
if(!EqMonitor){EqMonitor = {};}
EqMonitor.LayerCtrl = function(){
	this.lyr = null;
	this.sfbh = null;
	this.alky = null;
	this.wmbm = null;
	this.hypo = null;
	this.est = null;
	this.wave = null;
	this.link = {btn:null};
};
EqMonitor.LayerCtrl.prototype = {
	init: function(){
		this.initLayerSelect();
		this.initAllKyusyuRadio();
		this.initSurfaceBoreholeRadio();
		this.initWhitemapBlackmap();
		this.initEstimateShindo();
		this.initPSWave();
		this.initHypocenterKindRadio();
		this.initInfoLink();
	},
	initLayerSelect: function(){
		this.lyr = $("#slc-shihyo-kind");
		for(var i=0; i<CONF.LAYER_SELECT.length; i++){
			this.lyr.append($("<option>").attr({value:CONF.LAYER_SELECT[i].VALUE}).text(CONF.LAYER_SELECT[i].TEXT));
		}
		this.lyr.dropkick();
	},
        initAllKyusyuRadio: function(){
                this.alky = $("input[name='all-kyusyu']:radio");
                for(var i=0; i<CONF.ALL_KYUSYU_RADIO.length; i++){
                        this.alky[i].value = CONF.ALL_KYUSYU_RADIO[i].VALUE;
                        this.alky[i].checked = CONF.ALL_KYUSYU_RADIO[i].CHECKED;
                        $("#all-kyusyu-radio"+i+" + label")[0].innerHTML=CONF.ALL_KYUSYU_RADIO[i].TEXT;
                }
                $("#all-kyusyu-radio").buttonset();
        },
	initSurfaceBoreholeRadio: function(){
		this.sfbh = $("input[name='surface-borehole']:radio");
		for(var i=0; i<CONF.SURFACE_BOREHOLE_RADIO.length; i++){
			this.sfbh[i].value = CONF.SURFACE_BOREHOLE_RADIO[i].VALUE;
			this.sfbh[i].checked = CONF.SURFACE_BOREHOLE_RADIO[i].CHECKED;
			$("#surface-borehole-radio"+i+" + label")[0].innerHTML=CONF.SURFACE_BOREHOLE_RADIO[i].TEXT;
		}
		$("#surface-borehole-radio").buttonset();
	},
/*
        initWhitemapBlackmapRadio: function(){
                this.wmbm = $("input[name='whitemap-blackmap']:radio");
                for(var i=0; i<CONF.WHITEMAP_BLACKMAP_RADIO.length; i++){
                        this.wmbm[i].value = CONF.WHITEMAP_BLACKMAP_RADIO[i].VALUE;
                        this.wmbm[i].checked = CONF.WHITEMAP_BLACKMAP_RADIO[i].CHECKED;
                        $("#whitemap-blackmap-radio"+i+" + label")[0].innerHTML=CONF.WHITEMAP_BLACKMAP_RADIO[i].TEXT;
                }
                $("#whitemap-blackmap-radio").buttonset();
        },
*/
        initWhitemapBlackmap: function(){
                this.wmbm = $("#ck-basemap");
                if(CONF.BASEMAP_CHECKBOX.DEFAULT_CHECKED) label = CONF.BASEMAP_CHECKBOX.ON_LABEL;
                else label = CONF.BASEMAP_CHECKBOX.OFF_LABEL;
                this.wmbm.attr('checked',CONF.BASEMAP_CHECKBOX.DEFAULT_CHECKED);
                this.wmbm.button({label:label,checked:CONF.BASEMAP_CHECKBOX.DEFAULT_CHECKED});
        },
	initEstimateShindo: function(){
		this.est = $("#ck-est-shindo");
		if(CONF.EST_SHINDO_CHECKBOX.DEFAULT_CHECKED) label = CONF.EST_SHINDO_CHECKBOX.ON_LABEL;
		else label = CONF.EST_SHINDO_CHECKBOX.OFF_LABEL;
		this.est.attr('checked',CONF.EST_SHINDO_CHECKBOX.DEFAULT_CHECKED);
		this.est.button({label:label});
		$("#lb-est-shindo").html(CONF.EST_SHINDO_CHECKBOX.LABEL_TEXT);
	},
	initPSWave: function(){
		this.wave = $("#ck-wave");
		if(CONF.PS_WAVE_CHECKBOX.DEFAULT_CHECKED) label = CONF.PS_WAVE_CHECKBOX.ON_LABEL;
		else label = CONF.PS_WAVE_CHECKBOX.OFF_LABEL;
		this.wave.attr('checked',CONF.PS_WAVE_CHECKBOX.DEFAULT_CHECKED);
		this.wave.button({label:label,checked:CONF.PS_WAVE_CHECKBOX.DEFAULT_CHECKED});
		$("#lb-wave").html(CONF.PS_WAVE_CHECKBOX.LABEL_TEXT);
	},
	initHypocenterKindRadio: function(){
		this.hypo = $("input[name='hypocenter-kind']:radio");
		for(var i=0; i<CONF.HYPOCENTER_KIND_RADIO.length; i++){
			this.hypo[i].value = CONF.HYPOCENTER_KIND_RADIO[i].VALUE;
			this.hypo[i].checked = CONF.HYPOCENTER_KIND_RADIO[i].CHECKED;
			$("#hypocenter-kind-radio"+i+" + label")[0].innerHTML=CONF.HYPOCENTER_KIND_RADIO[i].TEXT;
		}
		$("#hypocenter-kind-radio").buttonset();
	},
        initInfoLink: function(){
                this.link.btn = $('#infolink-ctrl');
                this.link.btn.button({disabled:false});
                this.link.btn.button('option','label','');
                this.link.btn.button('option','icons',{primary:'ui-icon-info'});
                this.link.btn.bind('click',this,this.onLinkBtnClick);
        },
        onLinkBtnClick: function(event){
                linkpageurl = "http://www.kyoshin.bosai.go.jp/kyoshin/docs/new_kyoshinmonitor.html";
		window.open(linkpageurl,"kyoshinmonitor_link","location=no,status=no,directories=0,resizable=yes,width=950,height=1000");
                /*location.href="http://www.kyoshin.bosai.go.jp/kyoshin/docs/new_kyoshinmonitor.html"*/;
        },
	setLyrChgEvt: function(obj,fnc){
		this.lyr.bind("change",obj,fnc);
	},
	setSfBhChgEvt: function(obj,fnc){
		this.sfbh.bind('change',obj,fnc);
	},
        setAlKyChgEvt: function(obj,fnc){
                this.alky.bind('change',obj,fnc);
        },
        setWMBMChgEvt: function(obj,fnc){
                this.wmbm.bind('change',obj,fnc);
        },
	setEstimateShindoChgEvt: function(obj,fnc){
		this.est.bind("change",obj,fnc);
	},
	setPSWaveChgEvt: function(obj,fnc){
		this.wave.bind("change",obj,fnc);
	},
	setEstimateShindoLabel: function(){
		if(this.getEstShindoVal()){
			this.setEstimateShindoONlabel();
		}else{
			this.setEstimateShindoOFFlabel();
		}
	},
	setEstimateShindoONlabel: function(){
		this.est.button('option','label',CONF.EST_SHINDO_CHECKBOX.ON_LABEL);
		$("label[for=ck-est-shindo]").addClass('ui-state-active');
	},
	setEstimateShindoOFFlabel: function(){
		this.est.button('option','label',CONF.EST_SHINDO_CHECKBOX.OFF_LABEL);
		$("label[for=ck-est-shindo]").removeClass('ui-state-active');
	},
	enableEstShindo: function(){
		this.setEstimateShindoLabel();
		this.est.button('enable');
	},
	disableEstShindo: function(){
		this.est.attr('checked',false);
		this.setEstimateShindoLabel();
		this.est.button('disable');
	},
	setPSWaveLabel: function(){
		if(this.getPSWaveVal()) this.setPSWaveONlabel();
		else this.setPSWaveOFFlabel();
	},
	setPSWaveONlabel: function(){
		this.wave.button('option','label',CONF.PS_WAVE_CHECKBOX.ON_LABEL);
	},
	setPSWaveOFFlabel: function(){
		this.wave.button('option','label',CONF.PS_WAVE_CHECKBOX.OFF_LABEL);
	},
        setBaseMapLabel: function(){
                if(this.getBaseMapVal()) this.setBaseMapONlabel();
                else this.setBaseMapOFFlabel();
        },
        setBaseMapONlabel: function(){
                this.wmbm.button('option','label',CONF.BASEMAP_CHECKBOX.ON_LABEL);
        },
        setBaseMapOFFlabel: function(){
                this.wmbm.button('option','label',CONF.BASEMAP_CHECKBOX.OFF_LABEL);
        },
	getLyrVal: function(){
		return this.lyr.val();
	},
	getSfBhVal: function(){
		return this.sfbh.filter(":checked").val();
	},
        getAlKyVal: function(){
                return this.alky.filter(":checked").val();
        },
        getBaseMapVal: function(){
		return this.wmbm[0].checked;
        },
	getEstShindoVal: function(){
		return this.est[0].checked;
	},
	getPSWaveVal: function(){
		return this.wave[0].checked;
	},
	getHypocenterKindVal: function(){
		return this.hypo.filter(":checked").val();
	}
};

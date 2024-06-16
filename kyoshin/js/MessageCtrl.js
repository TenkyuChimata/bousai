var EqMonitor;
if(!EqMonitor){EqMonitor = {};}
EqMonitor.MessageCtrl = function(cfg){
	this.mssg_box = null;
	this.mssg_time = null;
	this.mssg_num = null;
	this.mssg_area = null;
	this.mssg_sindo_label = null;
	this.mssg_sindo_value = null;
	this.mssg_mag_label = null;
	this.mssg_mag_value = null;
	this.mssg_depth_label = null;
	this.mssg_depth_value = null;
        this.mssg_alert_label = null;
        this.mssg_alert_value = null;
	this.mssg_hypo_id = "";
	this.mssg_hypo_type = "";
        this.mssg_hypo_id_notice = "";
        this.mssg_hypo_type_notice = "";
	this.audio = cfg.audio;
};
EqMonitor.MessageCtrl.prototype = {
	init: function(){
		this.mssg_box = $("#map-message-data");
		this.mssg_time = $("#map-message-time");
		this.mssg_num = $("#map-message-num");
		this.mssg_area = $("#map-message-area");
		this.mssg_sindo_label = $("#map-message-sindo-label");
		this.mssg_sindo_value = $("#map-message-sindo-value");
		this.mssg_mag_label = $("#map-message-mag-label");
		this.mssg_mag_value = $("#map-message-mag-value");
		this.mssg_depth_label = $("#map-message-depth-label");
		this.mssg_depth_value = $("#map-message-depth-value");
		this.mssg_alert_value = $("#map-message-alert-value");
		this.setMssgBoxDefaultClass();
	},
	setMessage: function(mssg){
		var message_text = null;
		this.setNonMessage();
		if(mssg.request_hypo_type == "eew"){
			this.mssg_time.html(mssg.report_time);
			this.mssg_num.html(this.getReporNumStr(mssg.report_num,mssg.is_final,mssg.is_training,mssg.is_cancel));
			this.mssg_area.html(mssg.region_name);
			this.mssg_mag_label.html("M");
			this.mssg_mag_value.html(mssg.magunitude);
			this.mssg_depth_label.html("深さ");
			this.mssg_depth_value.html(mssg.depth);
			this.mssg_sindo_label.html("最大予測震度");
			this.mssg_sindo_value.html(mssg.calcintensity);
                        if(mssg.alertflg == "警報")
			{
				this.mssg_alert_value.html(mssg.alertflg);
			}
		}else{
			this.mssg_time.html(mssg.report_time);
			this.mssg_num.html(this.getReporNumStr(mssg.report_num,false,false,false));
			this.mssg_mag_label.html("M");
			this.mssg_mag_value.html(mssg.magunitude);
			this.mssg_depth_label.html("深さ");
			this.mssg_depth_value.html(mssg.depth);
		}
		return true;
	},
	setNonMessage: function(){
		this.mssg_time.html("");
		this.mssg_num.html("");
		this.mssg_area.html("");
		this.mssg_sindo_label.html("");
		this.mssg_sindo_value.html("");
		this.mssg_mag_label.html("");
		this.mssg_mag_value.html("");
		this.mssg_depth_label.html("");
		this.mssg_depth_value.html("");
		this.mssg_alert_value.html("");
		return true;
	},
	getReporNumStr: function(report_num,is_final,is_training,is_cancel){
		if(is_cancel == true){
			return "キャンセル報"
		}
		if(is_training == true){
			return "訓練報"
		}
		if(is_final == true){
			return "最終報";
		}
		return "第"+report_num+"報";
	},
	setMssgBoxDefaultClass: function(){
		this.mssg_box.removeClass('ui-state-highlight ui-corner-all');
		this.mssg_box.removeClass('ui-state-highlight-alt ui-corner-all');
		this.mssg_box.addClass('ui-state-default ui-corner-all');
		this.mssg_time.removeClass('ui-state-highlight-alt');
		this.mssg_num.removeClass('ui-state-highlight-alt');
		this.mssg_area.removeClass('ui-state-highlight-alt');
		this.mssg_sindo_label.removeClass('ui-state-highlight-alt');
		this.mssg_sindo_value.removeClass('ui-state-highlight-alt');
		this.mssg_mag_label.removeClass('ui-state-highlight-alt');
		this.mssg_mag_value.removeClass('ui-state-highlight-alt');
		this.mssg_depth_label.removeClass('ui-state-highlight-alt');
		this.mssg_depth_value.removeClass('ui-state-highlight-alt');
		this.mssg_alert_value.removeClass('ui-state-highlight-alt');
		return true;
	},
	setMssgBoxHighlightClass: function(){
		this.mssg_box.removeClass('ui-state-default ui-corner-all');
		this.mssg_box.removeClass('ui-state-highlight-alt ui-corner-all');
		this.mssg_box.addClass('ui-state-highlight ui-corner-all');
                this.mssg_time.removeClass('ui-state-highlight-alt');
                this.mssg_num.removeClass('ui-state-highlight-alt');
                this.mssg_area.removeClass('ui-state-highlight-alt');
                this.mssg_sindo_label.removeClass('ui-state-highlight-alt');
                this.mssg_sindo_value.removeClass('ui-state-highlight-alt');
                this.mssg_mag_label.removeClass('ui-state-highlight-alt');
                this.mssg_mag_value.removeClass('ui-state-highlight-alt');
                this.mssg_depth_label.removeClass('ui-state-highlight-alt');
                this.mssg_depth_value.removeClass('ui-state-highlight-alt');
                this.mssg_alert_value.removeClass('ui-state-highlight-alt');
		return true;
	},
        setMssgBoxHighlightAltClass: function(){
                this.mssg_box.removeClass('ui-state-default ui-corner-all');
                this.mssg_box.removeClass('ui-state-highlight ui-corner-all');
		this.mssg_box.addClass('ui-state-highlight-alt ui-corner-all');
                this.mssg_time.addClass('ui-state-highlight-alt');
                this.mssg_num.addClass('ui-state-highlight-alt');
                this.mssg_area.addClass('ui-state-highlight-alt');
                this.mssg_sindo_label.addClass('ui-state-highlight-alt');
                this.mssg_sindo_value.addClass('ui-state-highlight-alt');
                this.mssg_mag_label.addClass('ui-state-highlight-alt');
                this.mssg_mag_value.addClass('ui-state-highlight-alt');
                this.mssg_depth_label.addClass('ui-state-highlight-alt');
                this.mssg_depth_value.addClass('ui-state-highlight-alt');
                this.mssg_alert_value.addClass('ui-state-highlight-alt');
                return true;
        },
	playHypoAudio: function(rec_hypo_id,rec_hypo_type,rec_hypo_alertflg){
		if(rec_hypo_id==""){return true;}
		if(rec_hypo_type==""){return true;}
		if(rec_hypo_alertflg == ""){return true;}
		if(this.mssg_hypo_type=="" && this.mssg_hypo_id=="" && rec_hypo_alertflg =="警報"){this.audio.eqPlay();}
		if(this.mssg_hypo_type==rec_hypo_type && this.mssg_hypo_id != rec_hypo_id && rec_hypo_alertflg =="警報"){this.audio.eqPlay();}
                if(this.mssg_hypo_type_notice=="" && this.mssg_hypo_id_notice=="" && rec_hypo_alertflg =="予報"){this.audio.eqPlay_notice();}
                if(this.mssg_hypo_type_notice==rec_hypo_type && this.mssg_hypo_id_notice != rec_hypo_id && rec_hypo_alertflg =="予報"){this.audio.eqPlay_notice();}
		return true;
	},
	setHypoMessage: function(hypo,sld){
		if(hypo.result.status == "success"){
			if( hypo.report_num != "" ){
				this.setMessage(hypo);
				if(sld == 0){
					this.playHypoAudio(hypo.report_id,hypo.request_hypo_type,hypo.alertflg);
				}
				if(hypo.alertflg == "警報")
				{
					this.setMssgBoxHighlightAltClass();
					this.mssg_hypo_id = hypo.report_id;
					this.mssg_hypo_type = hypo.request_hypo_type;
				}
				else if(hypo.alertflg == "予報")
				{
					this.setMssgBoxHighlightClass();
                                	this.mssg_hypo_id_notice = hypo.report_id;
                                	this.mssg_hypo_type_notice = hypo.request_hypo_type;
				}
			}else{
				this.setNonMessage();
				this.setMssgBoxDefaultClass();
				if(hypo.alertflg == "警報")
				{
					this.mssg_hypo_id = "";
					this.mssg_hypo_type = hypo.request_hypo_type;
				}
				else if(hypo.alertflg == "予報")
				{
                                	this.mssg_hypo_id_notice = "";
                                	this.mssg_hypo_type_notice = hypo.request_hypo_type;
				}
			}
		}else{
			this.setNonMessage();
			this.setMssgBoxDefaultClass();
		}
	}
};

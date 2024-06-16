var EqMonitor;
if(!EqMonitor){EqMonitor = {};}
EqMonitor.AudioCtrl = function(cfg){
	this.mutebtn = {isOn:cfg.is_on,btn:null};
	this.eqaudio = null;
	this.eqaudio_notice = null;
};
EqMonitor.AudioCtrl.prototype = {
	init: function(){
		this.mkAudioCtrl();
		this.mkMuteBtn();
	},
	mkAudioCtrl: function(){
		this.eqaudio = document.getElementById('eqwav');
		this.eqaudio_notice = document.getElementById('eqwav_notice');
	},
	mkMuteBtn: function(){
		this.mutebtn.btn = $('#mute-ctrl');
		this.mutebtn.btn.button({disabled:false});
		this.mutebtn.btn.button('option','label','');
		this.mutebtn.btn.button('option','icons',{primary:'ui-icon-volume-on'});
		this.mutebtn.btn.bind('click',this,this.onMuteBtnClick);
		if(this.mutebtn.isOn){
			this.swtMuteBtnOn();
		}else{
			this.swtMuteBtnOff();
		}
	},
	onMuteBtnClick: function(event){
		var adctrl = event.data;
		if(adctrl.mutebtn.isOn){
			adctrl.swtMuteBtnOff();
		}else{
			adctrl.swtMuteBtnOn();
		}
	},
	swtMuteBtnOn: function(){
		this.mutebtn.btn.button('option','icons',{primary:'ui-icon-volume-on'});
		$('#mute-ctrl span').addClass('ui-button-eq-audio-on');
		this.mutebtn.isOn = true;
	},
	swtMuteBtnOff: function(){
		this.mutebtn.btn.button('option','icons',{primary:'ui-icon-volume-off',secondary:'ui-icon-cancel'});
		$('#mute-ctrl span').removeClass('ui-button-eq-audio-on');
		this.mutebtn.isOn = false;
	},
	eqPlay: function(){
		if(this.eqaudio.paused && this.mutebtn.isOn){
			this.eqaudio.play();
		}
	},
        eqPlay_notice: function(){
                if(this.eqaudio.paused && this.mutebtn.isOn){
                        this.eqaudio_notice.play();
                }
        },
	eqStop: function(){
		this.eqaudio.pause();
	}
};

var EqMonitor;
if(!EqMonitor){EqMonitor = {};}
EqMonitor.MaintenanceCtrl = function(){
	this.mssg_box = null;
	this.mssg_txt = null;
};
EqMonitor.MaintenanceCtrl.prototype = {
	init: function(){
		this.mssg_box = $("#maintenance-message-data");
		this.mssg_txt = $("#maintenance-message-text");
		this.setNonMessage();
		this.setMssgBoxDefaultClass();
	},
	setMessage: function(mssg){
		var message_text = mssg.message;
		this.mssg_txt.html(message_text);
		return true;
	},
	setNonMessage: function(){
		this.mssg_txt.html("");
		return true;
	},
	setMssgBoxDefaultClass: function(){
		this.mssg_box.removeClass('ui-state-highlight ui-corner-all');
		this.mssg_txt.removeClass('ui-sate-highlight-text');
		this.mssg_box.removeClass('ui-state-small ui-corner-all');
		this.mssg_txt.removeClass('ui-sate-small-text');
		this.mssg_box.addClass('ui-state-default ui-corner-all');
		this.mssg_txt.addClass('ui-sate-default-text');
		return true;
	},
	setMssgBoxHighlightClass: function(){
		this.mssg_box.removeClass('ui-state-default ui-corner-all');
		this.mssg_txt.removeClass('ui-sate-default-text');
		this.mssg_box.removeClass('ui-state-small ui-corner-all');
		this.mssg_txt.removeClass('ui-sate-small-text');
		this.mssg_box.addClass('ui-state-highlight ui-corner-all');
		this.mssg_txt.addClass('ui-sate-highlight-text');
		return true;
	},
	setMssgBoxSmallClass: function(){
		this.mssg_box.removeClass('ui-state-default ui-corner-all');
		this.mssg_txt.removeClass('ui-sate-default-text');
		this.mssg_box.removeClass('ui-state-highlight ui-corner-all');
		this.mssg_txt.removeClass('ui-sate-highlight-text');
		this.mssg_box.addClass('ui-state-small ui-corner-all');
		this.mssg_txt.addClass('ui-sate-small-text');
		return true;
	},
	setMainteMessage: function(mssg){
		if(!mssg.message){
			this.setNonMessage();
			this.setMssgBoxDefaultClass();
		}else{
			if(mssg.type == "1"){
				this.setMessage(mssg);
				this.setMssgBoxHighlightClass();
			}else if(mssg.type == "2"){
				this.setMessage(mssg);
				this.setMssgBoxSmallClass();
			}else{
				this.setNonMessage();
				this.setMssgBoxDefaultClass();
			}
		}
	}
};

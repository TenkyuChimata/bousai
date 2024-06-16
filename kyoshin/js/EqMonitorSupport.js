var EqMonitor;
if(!EqMonitor){EqMonitor = {};}
EqMonitor.Support = function(){
};
EqMonitor.Support.prototype = {
	isSupport: function(){
		//if(this.isAudio() == false) return false;
		return true;
	},
	isAudio: function(){
		return !!document.createElement('audio').canPlayType;
	}
};

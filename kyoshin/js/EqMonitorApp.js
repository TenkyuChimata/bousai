var EqMonitor;
if(!EqMonitor){EqMonitor = {};}
EqMonitor.App = function(){
	this.ctrl = null;
};
EqMonitor.App.prototype = {
	run: function(){
		this.support = new EqMonitor.Support();
		if(this.support.isSupport()==false){
			document.getElementById('loading-message').innerHTML='ご利用のブラウザは未対応です。<br/>最新バージョンのブラウザをご利用ください。<br/>対応ブラウザは<a href="http://www.kmoniexp.bosai.go.jp/manual.html" target="_blank">こちら</a>です。';
		}else{
			this.ctrl = new EqMonitor.Ctrl();
			this.ctrl.init();
			this.display();
			this.ctrl.start();
		}
	},
	display: function(){
		document.getElementById('loading').style.display="none";
		$('#main').fadeOut('fast');
		$('#header').fadeOut('fast');
		$('#footer').fadeOut('fast');
		document.getElementById('main').style.visibility="visible";
		document.getElementById('header').style.visibility="visible";
		document.getElementById('footer').style.visibility="visible";
		$('#main').fadeIn('slow');
		$('#header').fadeIn('slow');
		$('#footer').fadeIn('slow');
	}
};

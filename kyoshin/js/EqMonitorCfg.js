var CONF = {
		MAP_IMAGE_BASE_STATIC_URL: "https://smi.lmoniexp.bosai.go.jp/data/map_img/RealTimeImg/",
		MAP_IMAGE_BASE_KYUSYU_STATIC_URL: "https://smi.lmoniexp.bosai.go.jp/data/map_img/RealTimeImg_kyusyu/",
		SCALE_IMAGE_BACE_URL: "https://smi.lmoniexp.bosai.go.jp/data/map_img/ScaleImg/",
		BASEMAP_IMAGE_BACE_URL: "https://smi.lmoniexp.bosai.go.jp/data/map_img/CommonImg/",
		CRICLE_IMAGE_BASE_STATIC_URL: "https://smi.lmoniexp.bosai.go.jp/data/map_img/PSWaveImg/",
		EST_SHINDO_IMAGE_BASE_STATIC_URL: "https://smi.lmoniexp.bosai.go.jp/data/map_img/EstShindoImg/",
		//CRICLE_IMAGE_BASE_STATIC_URL: "https://smi.lmoniexp.bosai.go.jp/data/map_img/PSWaveImg_canceltest/",
		//EST_SHINDO_IMAGE_BASE_STATIC_URL: "https://smi.lmoniexp.bosai.go.jp/data/map_img/EstShindoImg_canceltest/",
                BASEMAP_IMAGE_BACE_KYUSYU_URL: "https://smi.lmoniexp.bosai.go.jp/data/map_img/CommonImg_kyusyu/",
                CRICLE_IMAGE_BASE_KYUSYU_STATIC_URL: "https://smi.lmoniexp.bosai.go.jp/data/map_img/PSWaveImg_kyusyu/",
                EST_SHINDO_IMAGE_BASE_KYUSYU_STATIC_URL: "https://smi.lmoniexp.bosai.go.jp/data/map_img/EstShindoImg_kyusyu/",
		NODATA_IMAGE_URL: "https://smi.lmoniexp.bosai.go.jp/kyoshin_monitor/img/nodata.gif",
		TIMER_INTERVAL_SEC: 1,
		TIMER_NOWTIME_RESET_INTERVAL_SEC: 60,
		TIMER_MAINTE_MSSG_UPDATE_INTERVAL_SEC: 600,
		LAYER_SELECT: [
			{VALUE:"acmap",TEXT:"最大加速度"},
			{VALUE:"jma",TEXT:"リアルタイム震度"},
			{VALUE:"vcmap",TEXT:"最大速度"},
			{VALUE:"dcmap",TEXT:"最大変位"},
			{VALUE:"rsp0125",TEXT:"0.125Hz速度応答"},
			{VALUE:"rsp0250",TEXT:"0.25Hz速度応答"},
			{VALUE:"rsp0500",TEXT:"0.5Hz速度応答"},
			{VALUE:"rsp1000",TEXT:"1.0Hz速度応答"},
			{VALUE:"rsp2000",TEXT:"2.0Hz速度応答"},
			{VALUE:"rsp4000",TEXT:"4.0Hz速度応答"}
		],
                ALL_KYUSYU_RADIO: [
                        {VALUE:"a",TEXT:"全国",CHECKED:true},
                        {VALUE:"k",TEXT:"九州",CHECKED:false}
                ],
		SURFACE_BOREHOLE_RADIO: [
			{VALUE:"s",TEXT:"地表",CHECKED:true},
			{VALUE:"b",TEXT:"地中",CHECKED:false}
		],
                WHITEMAP_BLACKMAP_RADIO: [
                        {VALUE:"w",TEXT:"白",CHECKED:true},
                        {VALUE:"b",TEXT:"黒",CHECKED:false}
                ],
                BASEMAP_CHECKBOX: {
                        ON_LABEL:"背景切換え",
                        OFF_LABEL:"背景切換え",
                        DEFAULT_CHECKED: false
                },
		EST_SHINDO_CHECKBOX: {
			ON_LABEL:"ON",
			OFF_LABEL:"OFF",
			DEFAULT_CHECKED: true,
			LABEL_TEXT:"推定震度"
		},
		PS_WAVE_CHECKBOX: {
			ON_LABEL:"ON",
			OFF_LABEL:"OFF",
			DEFAULT_CHECKED: true,
			LABEL_TEXT:"予測円"
		},
		HYPOCENTER_KIND_RADIO: [
			{VALUE:"eew",TEXT:"EEW",CHECKED:true}
		],
		TIME_SLIDER: {
			RANGE_SEC: 3600,
			RANGE_STEP: 1,
			SLIDE_EVT_SLEEP_MSEC: 300
		},
		UPDATE_TIME_RADIO: [
			{VALUE:"play",TEXT:"再生",CHECKED:true},
			{VALUE:"stop",TEXT:"停止",CHECKED:false}
		],
		LATEST_TIME_BTN: {
			LABEL: "最新時刻"
		},
		AUDIO_VOLUME: {
			DEFAULT_IS_ON: true
		},
		GA: {
			PROFILE_ID:'UA-30138936-1'
		}
	};

var WEB_SERVICE_CONF = {
		LATEST_DATA_TIME_URL: "https://api.wolfx.jp/ntp.json",
		HYPO_DATA_URL:"https://smi.lmoniexp.bosai.go.jp/webservice/hypo",
		MAINTENAMCE_MSSG_URL: "https://smi.lmoniexp.bosai.go.jp/webservice/maintenance/message.json"
	};

var AUTH_CONF = {
		COOKIE_KEY : "kyscname2013",
		DOMAIN_KEY : ".kygw5.bosai.go.jp",
		TOP_LOCATION_URL: "/kyoshin_monitor/main/",
		AUTH_ERROE_IMG_SIZE:{
			WIDTH:2, HEIGHT:2
		}
	};

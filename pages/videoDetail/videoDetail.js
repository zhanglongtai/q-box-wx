Page({
    data: {
        name: '',
        type: '',
        size: '',
        unit: '',
        time: '',
        url: '',
        imgURL: '',
        playing: false,
    },
    onLoad: function (query) {
        const { name, type, size, unit, url, time, imgURL } = query;
        this.setData({
            name,
            type,
            size,
            unit,
            time,
            // test url
            // url: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
            url,
            imgURL,
        });
    },
    onReady: function () {
        this.videoCtx = wx.createAudioContext('video');
        this.videoCtx.play();
        this.setData({
            playing: true,
        });
    },
    videoPlay: function () {
        this.videoCtx.play();
        this.setData({
            playing: true,
        });
    },
    videoPause: function () {
        this.videoCtx.pause();
        this.setData({
            playing: false,
        });
    },
    handleError: (event) => {
        console.log(event.detail.errMsg);
    },
});

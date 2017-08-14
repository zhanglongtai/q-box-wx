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
            url,
            imgURL,
        });
    },
    onReady: function () {
        this.audioCtx = wx.createAudioContext('audio');
        this.audioCtx.setSrc(this.data.url);
        this.audioCtx.play();
        this.setData({
            playing: true,
        });
    },
    audioPlay: function () {
        this.audioCtx.play();
        this.setData({
            playing: true,
        });
    },
    audioPause: function () {
        this.audioCtx.pause();
        this.setData({
            playing: false,
        });
    },
    handleError: (event) => {
        console.log(event.detail.errMsg);
    },
});

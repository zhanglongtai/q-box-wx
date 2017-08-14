Page({
    onReady: function () {
        const info = wx.getSystemInfoSync();
        const windowWidth = info.windowWidth;
        const windowHeight = info.windowHeight;
        const ctx = wx.createCanvasContext('canvas');
        ctx.drawImage('/asset/logo.jpg', (windowWidth/2 - 125), (windowHeight/2 - 125), 250, 250);
        ctx.draw();
    },
    onShow: function () {
        setTimeout(() => {
            wx.reLaunch({
                url: '/pages/fileList/fileList',
            });
        }, 2000);
    },
});

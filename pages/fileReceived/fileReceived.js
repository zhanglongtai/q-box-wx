// const app = getApp();

Page({
    data: {
        name: '',
        type: '',
        size: '',
        unit: '',
        url: '',
        time: '',
        imgURL: '',
        downloading: false,
        percent: 0,
    },
    onLoad: function (query) {
        const { name, type, size, unit, url, time, imgURL } = query;
        this.setData({
            name,
            type,
            size,
            unit,
            url,
            time,
            imgURL,
        });
    },
    handleCheck: function () {
        this.setData({
            downloading: true,
            percent: 0,
        });

        const downloadTask = wx.downloadFile({
            url: this.data.url,
            success: (downloadRes) => {
                this.setData({
                    downloading: false,
                    percent: 0,
                });

                const filePath = downloadRes.tempFilePath;
                wx.openDocument({
                    filePath,
                    success: (openRes) => {
                        console.log('打开文档成功');
                    },
                });
            },
            fail: (downloadRes) => {
                console.log(downloadRes.errMsg);
                wx.showToast({
                    title: downloadRes.errMsg,
                    image: '/asset/ic_warning_48px.svg',
                    duration: 2000,
                });
            },
        });

        downloadTask.onProgressUpdate((res) => {
            console.log(res.progress);
            this.setData({
                percent: res.progress,
            });
        });
    },
});

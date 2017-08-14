// const app = getApp();

Page({
    data: {
        name: '',
        type: '',
        size: '',
        unit: '',
        time: '',
        url: '',
        imgURL: '',
        downloading: false,
        finished: false,
        task: null,
        percent: 0,
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
                    finished: true,
                    task: null,
                });

                const filePath = downloadRes.tempFilePath;
                wx.openDocument({
                    filePath,
                    fileType: this.data.type,
                    success: (openRes) => {
                        console.log('打开文档成功');
                    },
                    fail: (openRes) => {
                        console.log(openRes);
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
                wx.navigateBack({
                    delta: 1,
                });
            },
        });

        this.setData({
            task: downloadTask,
        });

        downloadTask.onProgressUpdate((res) => {
            this.setData({
                percent: res.progress,
            });
        });
    },
    onShow: function () {
        if (this.data.finished) {
            wx.navigateBack({
                delta: 1,
            });
        }
    },
    handleCancel: function() {
        this.data.task.abort();
    },
});

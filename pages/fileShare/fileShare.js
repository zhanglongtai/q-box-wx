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
    onShareAppMessage: function (res) {
        return {
            title: this.data.name,
            path: `/pages/fileReceived/fileReceived?name=${this.data.name}&type=${this.data.type}&size=${this.data.size}&unit=${this.data.unit}&url=${this.data.url}&time=${this.data.time}&imgURL=${this.data.imgURL}`,
            success: (shareRes) => {
                wx.showToast({
                    title: '发送成功',
                    icon: 'success',
                    duration: 1000,
                });
                // wx.navigateTo({
                //     url: `/pages/fileReceived/fileReceived?name=${this.data.name}&type=${this.data.type}&size=${this.data.size}&unit=${this.data.unit}&url=${this.data.url}&time=${this.data.time}&imgURL=${this.data.imgURL}`,
                //     success: (navRes) => {
                //         console.log('nav to fileReceived');
                //     },
                // });
            },
            // fail: (shareRes) => {
            //     wx.showToast({
            //         title: '发送失败',
            //         image: '/asset/ic_warning_48px.svg',
            //         duration: 1000,
            //     });
            // },
        };
    },
    cancel: () => {
        wx.navigateBack({
            delta: 1,
        });
    },
});

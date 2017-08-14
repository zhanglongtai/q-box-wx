Page({
    data: {
        name: '',
        owner: '',
        imgURL: '',
    },
    onLoad: function (query) {
        const { name, owner } = query;
        const imgURL = '/asset/icons/folder.svg';
        this.setData({
            name,
            owner,
            imgURL,
        });
    },
    // handleCheck: function () {
        // wx.redirectTo({
        //     url: `pages/fileList/fileList?name=${this.data.name}`,
        // });
        // wx.reLaunch({
        //     url: `pages/fileList/fileList?name=${this.data.name}`,
        // });
        // wx.switchTab({
        //     url: 'pages/fileList/fileList',
        // });
    // },
});

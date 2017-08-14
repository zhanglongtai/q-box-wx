import { addComment } from '../API/api';

Page({
    data: {
        nickName: '',
        avatarUrl: '',
    },
    onLoad: function (query) {
        const { nickName, avatarUrl } = query;
        this.setData({
            nickName,
            avatarUrl,
        });
    },
    handleSubmit: function (event) {
        function formatTime (timeObject) {
            const timeArgs = timeObject.toString().split(' ');
            const year = timeArgs[3];
            let month = (timeObject.getMonth() + 1).toString();
            if (month.length === 1) {
                month = `0${month}`;
            }
            const day = timeArgs[2];
            const time = timeArgs[4];

            return `${year}-${month}-${day} ${time}`;
        }

        const comment = event.detail.value.textarea;
        const url = addComment();
        let time = new Date();
        time = formatTime(time);

        wx.showLoading({
            title: '正在提交评论',
            mask: true,
        });

        wx.request({
            url,
            data: {
                comment,
                time,
                username: this.data.nickName,
                avatarUrl: this.data.avatarUrl,
            },
            header: {
                'content-type': 'application/json',
            },
            method: 'post',
            success: (res) => {
                switch (res.statusCode) {
                    case 200:
                        wx.hideLoading();
                        wx.showToast({
                            title: '评论成功',
                            icon: 'success',
                            mask: true,
                            duration: 1000,
                        });
                        setTimeout(() => {
                            wx.navigateBack({
                                delta: 1,
                            });
                        }, 1000);
                        break;
                    default:
                        console.log(res.data);
                }
            },
            fail: (res) => {
                wx.hideLoading();
                wx.showToast({
                    title: '提交失败',
                    image: '/asset/ic_warning_48px.svg',
                    mask: true,
                    duration: 1000,
                });
            },
        });
    },
    navBack: () => {
        wx.navigateBack({
            delta: 1,
        });
    },
});

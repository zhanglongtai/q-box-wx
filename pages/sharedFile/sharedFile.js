import { getCommentList } from '../API/api';

Page({
    data: {
        comment: true,
        settings: false,
        name: '',
        sharedTime: '',
        timeRange: ['3天', '7天', '15天'],
        timeIndex: 0,
        downloadRange: ['5次', '10次', '15次'],
        downloadIndex: 0,
        commentList: {
            isFetching: true,
            fetchSuccess: false,
            list: [],
        },
    },
    onLoad: function (query) {
        const { name, sharedTime } = query;
        this.setData({
            name,
            sharedTime,
        });

        this.fetchCommentList();
    },
    onShow: function () {
        this.fetchCommentList();
    },
    changeToSettings: function () {
        this.setData({
            comment: false,
            settings: true,
        });
    },
    changeToComment: function () {
        this.setData({
            comment: true,
            settings: false,
        });
    },
    pickerTimeChange: function (event) {
        this.setData({
            timeIndex: event.detail.value,
        });
    },
    pickerDownloadChange: function (event) {
        this.setData({
            downloadIndex: event.detail.value,
        });
    },
    addComment: function () {
        wx.getUserInfo({
            success: (res) => {
                const userInfo = res.userInfo;
                const nickName = userInfo.nickName;
                const avatarUrl = userInfo.avatarUrl;

                wx.navigateTo({
                    url: `/pages/comment/comment?nickName=${nickName}&avatarUrl=${avatarUrl}`,
                    success: (navRes) => {
                        console.log('nav to comment');
                    },
                });
            },
        });
    },
    fetchCommentList: function () {
        // begin to show async status
        const newList = {
            isFetching: true,
            fetchSuccess: false,
            list: [],
        };

        this.setData({
            commentList: newList,
        });

        // begin async request
        const requestURL = getCommentList();
        wx.request({
            url: requestURL,
            header: {
                'content-type': 'application/json',
            },
            success: (res) => {
                switch (res.statusCode) {
                    case 200: {
                        const commentList = {
                            isFetching: false,
                            fetchSuccess: true,
                            list: res.data.list,
                        };

                        this.setData({
                            commentList,
                        });

                        break;
                    }
                    case 401: {
                        const commentList = {
                            isFetching: false,
                            fetchSuccess: false,
                            list: [],
                        };

                        this.setData({
                            commentList,
                        });

                        break;
                    }
                    case 502: {
                        const commentList = {
                            isFetching: false,
                            fetchSuccess: false,
                            list: [],
                        };

                        this.setData({
                            commentList,
                        });

                        break;
                    }
                    default:
                        console.log(res);
                        break;
                }
            },
            fail: (res) => {
                console.log(res);

                const commentList = {
                    isFetching: false,
                    fetchSuccess: false,
                    list: [],
                };

                this.setData({
                    commentList,
                });
            },
        });
    },
});

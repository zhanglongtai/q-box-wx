import { getCommentList, getCheckList } from '../API/api';
const appInstance = getApp();

Page({
    data: {
        comment: true,
        settings: false,
        name: '',
        sharedTime: '',
        owner: false,
        commentList: {
            isFetching: true,
            fetchSuccess: false,
            list: [],
        },
        checkList: {
            isFetching: true,
            fetchSuccess: false,
            memberList: [],
            activityList: [],
        },
    },
    onLoad: function (query) {
        const { name, sharedTime } = query;
        let owner = false;
        if (query.owner === 'true') {
            owner = true;
        }

        this.setData({
            name,
            sharedTime,
            owner,
        });

        this.fetchCommentList();
        this.fetchCheckList();
    },
    onShow: function () {
        this.fetchCommentList();
        this.fetchCheckList();
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
    navToGroup: function () {
        wx.navigateTo({
            url: `/pages/group/group?owner=${this.data.owner}&name=${this.data.name}`,
            success: (navRes) => {
                console.log('nav to comment');
            },
        });
    },
    handleNavToFolder: (event) => {
        const folderName = event.currentTarget.dataset.name;
        appInstance.globalData.navToFolder = folderName;
        wx.reLaunch({
            url: '/pages/fileList/fileList',
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
    fetchCheckList: function () {
        // begin to show async status
        const newList = {
            isFetching: true,
            fetchSuccess: false,
            memberList: [],
            activityList: [],
        };

        this.setData({
            checkList: newList,
        });

        // begin async request
        const requestURL = getCheckList();
        wx.request({
            url: requestURL,
            header: {
                'content-type': 'application/json',
            },
            success: (res) => {
                switch (res.statusCode) {
                    case 200: {
                        const checkList = {
                            isFetching: false,
                            fetchSuccess: true,
                            memberList: res.data.memberList,
                            activityList: res.data.activityList,
                        };

                        for (let i = 0; i < checkList.activityList.length; i++) {
                            switch (checkList.activityList[i].actionType) {
                                case 'create':
                                    checkList.activityList[i].actionURL = '/asset/ic_note_add_48px.svg';
                                    break;
                                case 'update':
                                    checkList.activityList[i].actionURL = '/asset/ic_edit_48px.svg';
                                    break;
                                case 'delete':
                                    checkList.activityList[i].actionURL = '/asset/ic_delete_48px.svg';
                                    break;
                                default:
                                    checkList.activityList[i].actionURL = '/asset/ic_autorenew_48px.svg';
                                    break;
                            }
                        }

                        this.setData({
                            checkList,
                        });

                        break;
                    }
                    case 401: {
                        const checkList = {
                            isFetching: false,
                            fetchSuccess: false,
                            memberList: [],
                            activityList: [],
                        };

                        this.setData({
                            checkList,
                        });

                        break;
                    }
                    case 502: {
                        const checkList = {
                            isFetching: false,
                            fetchSuccess: false,
                            memberList: [],
                            activityList: [],
                        };

                        this.setData({
                            checkList,
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

                const checkList = {
                    isFetching: false,
                    fetchSuccess: false,
                    memberList: [],
                    activityList: [],
                };

                this.setData({
                    checkList,
                });
            },
        });
    },
});

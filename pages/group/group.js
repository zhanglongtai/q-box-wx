import { getCheckList } from '../API/api';

Page({
    data: {
        checkList: {
            isFetching: true,
            fetchSuccess: false,
            memberList: [],
            owner: {},
        },
        owner: false,
        name: '',
    },
    onLoad: function (query) {
        const name = query.name;
        let owner = false;
        if (query.owner === 'true') {
            owner = true;
        }

        this.setData({
            owner,
            name,
        });

        this.fetchCheckList();
    },
    onShow: function () {
        this.fetchCheckList();
    },
    fetchCheckList: function () {
        // begin to show async status
        const newList = {
            isFetching: true,
            fetchSuccess: false,
            memberList: [],
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
                        };

                        const l = [];
                        let owner = {};
                        for (let i = 0; i < checkList.memberList.length; i++) {
                            if (checkList.memberList[i].owner === true) {
                                owner = Object.assign({}, checkList.memberList[i]);
                            } else {
                                l.push(Object.assign({}, checkList.memberList[i]));
                            }
                        }
                        checkList.memberList = l;
                        checkList.owner = owner;

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
                };

                this.setData({
                    checkList,
                });
            },
        });
    },
    handleSwitch: function (event) {
        const { username } = event.currentTarget.dataset;
        const currentValue = event.detail.value;

        if (currentValue === true) {
            // from readyOnly to not-readyOnly
            wx.showModal({
                title: '赋予修改权限',
                content: `确定${username}拥有修改权限?`,
                success: (res) => {
                    if (res.confirm) {
                        console.log('用户点击确定');

                        // request a api

                        // mock modify
                        let index = null;
                        for (let i = 0; i < this.data.checkList.memberList.length; i++) {
                            if (username === this.data.checkList.memberList[i].username) {
                                index = i;
                                break;
                            }
                        }
                        
                        const newList = this.data.checkList.memberList.slice();
                        newList[index].readOnly = false;

                        this.setData({
                            checkList: {
                                isFetching: this.data.checkList.isFetching,
                                fetchSuccess: this.data.checkList.fetchSuccess,
                                memberList: newList,
                                owner: this.data.checkList.owner,
                            },
                        });
                    } else if (res.cancel) {
                        console.log('用户点击取消');

                        let index = null;
                        for (let i = 0; i < this.data.checkList.memberList.length; i++) {
                            if (username === this.data.checkList.memberList[i].username) {
                                console.log(i);
                                index = i;
                                break;
                            }
                        }
                        
                        const newList = this.data.checkList.memberList.slice();
                        newList[index].readOnly = true;

                        this.setData({
                            checkList: {
                                isFetching: this.data.checkList.isFetching,
                                fetchSuccess: this.data.checkList.fetchSuccess,
                                memberList: newList,
                                owner: this.data.checkList.owner,
                            },
                        });
                    }
                },
            });
        } else {
            // from not-readyOnly to readyOnly
            wx.showModal({
                title: '限制为只读权限',
                content: `限制${username}只有只读权限?`,
                success: (res) => {
                    if (res.confirm) {
                        console.log('用户点击确定');

                        // request a api

                        // mock modify
                        let index = null;
                        for (let i = 0; i < this.data.checkList.memberList.length; i++) {
                            if (username === this.data.checkList.memberList[i].username) {
                                index = i;
                                break;
                            }
                        }
                        
                        const newList = this.data.checkList.memberList.slice();
                        newList[index].readOnly = true;

                        this.setData({
                            checkList: {
                                isFetching: this.data.checkList.isFetching,
                                fetchSuccess: this.data.checkList.fetchSuccess,
                                memberList: newList,
                                owner: this.data.checkList.owner,
                            },
                        });
                    } else if (res.cancel) {
                        console.log('用户点击取消');

                        let index = null;
                        for (let i = 0; i < this.data.checkList.memberList.length; i++) {
                            if (username === this.data.checkList.memberList[i].username) {
                                console.log(i);
                                index = i;
                                break;
                            }
                        }

                        const newList = this.data.checkList.memberList.slice();
                        newList[index].readOnly = false;

                        this.setData({
                            checkList: {
                                isFetching: this.data.checkList.isFetching,
                                fetchSuccess: this.data.checkList.fetchSuccess,
                                memberList: newList,
                                owner: this.data.checkList.owner,
                            },
                        });
                    }
                },
            });
        }
    },
    deletePerson: function (event) {
        const { username } = event.currentTarget.dataset;

        wx.showModal({
            title: '取消共享',
            content: `确定取消对${username}的共享?`,
            success: (res) => {
                if (res.confirm) {
                    console.log('用户点击确定');

                    // request a api

                    // mock delete
                    let index = null;
                    for (let i = 0; i < this.data.checkList.memberList.length; i++) {
                        if (username === this.data.checkList.memberList.username) {
                            index = i;
                            break;
                        }
                    }
                    const newList = this.data.checkList.memberList.slice(0, index)
                        .concat(this.data.checkList.memberList.slice(index + 1));

                    this.setData({
                        checkList: {
                            isFetching: this.data.checkList.isFetching,
                            fetchSuccess: this.data.checkList.fetchSuccess,
                            memberList: newList,
                            owner: this.data.checkList.owner,
                        },
                    });
                } else if (res.cancel) {
                    console.log('用户点击取消');
                }
            },
        });
    },
    onShareAppMessage: function (res) {
        return {
            title: '分享文件夹',
            path: `/pages/folderReceived/folderReceived?name=${this.data.name}&owner=${this.data.checkList.owner.username}`,
            success: (shareRes) => {
                wx.navigateTo({
                    url: `/pages/folderReceived/folderReceived?name=${this.data.name}&owner=${this.data.checkList.owner.username}`,
                    success: (navRes) => {
                        console.log('nav to fileReceived');
                    },
                });
                wx.showToast({
                    title: '发送邀请完成',
                    icon: 'success',
                    duration: 1000,
                });
            },
        };
    },
});

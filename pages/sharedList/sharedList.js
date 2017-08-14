import { getSharedList } from '../API/api';

Page({
    data: {
        sharedList: {
            isFetching: true,
            fetchSuccess: false,
            list: [],
        },
    },
    onLoad: function () {
        this.fetchSharedList();
    },
    fetchSharedList: function () {
        // begin to show async status
        const newSharedList = {
            isFetching: true,
            fetchSuccess: false,
            list: [],
        };

        this.setData({
            sharedList: newSharedList,
        });

        // begin async request
        const requestURL = getSharedList();
        wx.request({
            url: requestURL,
            header: {
                'content-type': 'application/json',
            },
            success: (res) => {
                switch (res.statusCode) {
                    case 200: {
                        const sharedList = {
                            isFetching: false,
                            fetchSuccess: true,
                            list: res.data.list,
                        };

                        const newList = [];
                        for (let i = 0; i < sharedList.list.length; i++) {
                            if (sharedList.list[i].type === 'folder') {
                                sharedList.list[i].shared = false;
                                sharedList.list[i].groupOwned = true;
                                newList.push(sharedList.list[i]);
                            } else {
                                sharedList.list[i].shared = true;
                                sharedList.list[i].groupOwned = false;
                                newList.push(sharedList.list[i]);
                            }
                        }
                        sharedList.list = newList;

                        this.setData({
                            sharedList,
                        });

                        break;
                    }
                    case 401: {
                        const sharedList = {
                            isFetching: false,
                            fetchSuccess: false,
                            list: [],
                        };

                        this.setData({
                            sharedList,
                        });

                        break;
                    }
                    case 502: {
                        const sharedList = {
                            isFetching: false,
                            fetchSuccess: false,
                            list: [],
                        };

                        this.setData({
                            sharedList,
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

                const sharedList = {
                    isFetching: false,
                    fetchSuccess: false,
                    list: [],
                };

                this.setData({
                    sharedList,
                });
            },
        });
    },
    handleCancel: function (event) {
        wx.showModal({
            title: '取消分享',
            content: '是否取消分享',
            success: (res) => {
                if (res.confirm) {
                    console.log('用户点击确定');
                } else if (res.cancel) {
                    console.log('用户点击取消');
                }
            },
        });
    },
    handleGetMore: function (event) {
        const { name, type, owner } = event.currentTarget.dataset;
        const sharedTime = event.currentTarget.dataset.sharedtime;

        if (type === 'folder') {
            wx.navigateTo({
                url: `/pages/sharedFolder/sharedFolder?name=${name}&sharedTime=${sharedTime}&owner=${owner}`,
                success: (navRes) => {
                    console.log('nav to sharedFolder');
                },
            });
        } else {
            wx.navigateTo({
                url: `/pages/sharedFile/sharedFile?name=${name}&sharedTime=${sharedTime}`,
                success: (navRes) => {
                    console.log('nav to sharedFile');
                },
            });
        }
    },
});

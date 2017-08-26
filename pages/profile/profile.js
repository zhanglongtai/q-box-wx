import { getMessageList } from '../API/api';

Page({
    data: {
        name: '',
        avatarURL: '',
        vip: false,
        content: 'appList', // appList or appSetting
        appList: {
            basic: [
                {
                    name: '奖券',
                    imgURL: '/asset/profile/apps/ticket.svg',
                    selected: true,
                    page: 'lottery',
                    lineIndex: 1,
                },
                {
                    name: '深度搜索',
                    imgURL: '/asset/profile/apps/ic_search_48px.svg',
                    selected: true,
                    page: 'search',
                    lineIndex: 2,
                },
                {
                    name: 'test1',
                    imgURL: '/asset/profile/apps/ic_search_48px.svg',
                    selected: true,
                    lineIndex: 3,
                },
                {
                    name: 'test2',
                    imgURL: '/asset/profile/apps/ic_search_48px.svg',
                    selected: true,
                    lineIndex: 4,
                },
                {
                    name: 'test3',
                    imgURL: '/asset/profile/apps/ic_search_48px.svg',
                    selected: true,
                    lineIndex: 1,
                },
                {
                    name: 'test4',
                    imgURL: '/asset/profile/apps/ic_search_48px.svg',
                    selected: true,
                    lineIndex: 2,
                },
            ],
            advance: [
                {
                    name: '备份',
                    imgURL: '/asset/profile/apps/ic_settings_backup_restore_48px.svg',
                    selected: false,
                    page: 'backup',
                    lineIndex: 1,
                },
                {
                    name: 'test5',
                    imgURL: '/asset/profile/apps/ic_search_48px.svg',
                    selected: false,
                    lineIndex: 2,
                },
                {
                    name: 'test6',
                    imgURL: '/asset/profile/apps/ic_search_48px.svg',
                    selected: false,
                    lineIndex: 3,
                },
            ],
        },
        selectedList: [
            {
                name: '奖券',
                imgURL: '/asset/profile/apps/ticket.svg',
                selected: true,
                end: false,
                page: 'lottery',
            },
            {
                name: '深度搜索',
                imgURL: '/asset/profile/apps/ic_search_48px.svg',
                selected: true,
                end: false,
                page: 'search',
            },
            {
                name: 'test1',
                imgURL: '/asset/profile/apps/ic_search_48px.svg',
                selected: true,
                end: false,
            },
            {
                name: 'test2',
                imgURL: '/asset/profile/apps/ic_search_48px.svg',
                selected: true,
                end: true,
            },
            {
                name: 'test3',
                imgURL: '/asset/profile/apps/ic_search_48px.svg',
                selected: true,
                end: false,
            },
            {
                name: 'test4',
                imgURL: '/asset/profile/apps/ic_search_48px.svg',
                selected: true,
                end: false,
            },
            {
                name: '添加应用',
                imgURL: '/asset/profile/apps/ic_playlist_add_48px.svg',
                selected: true,
                end: false,
                page: 'appSetting',
            },
        ],
        addButton: {
            name: '添加应用',
            imgURL: '/asset/profile/apps/ic_playlist_add_48px.svg',
            selected: true,
            end: false,
            page: 'appSetting',
        },
        messageList: {
            isFetching: true,
            fetchSuccess: false,
            list: '',
        },
        unread: 0,
    },
    onLoad: function () {
        wx.getUserInfo({
            success: (res) => {
                const userInfo = res.userInfo;
                const name = userInfo.nickName;
                const avatarURL = userInfo.avatarUrl;
                this.setData({
                    name,
                    avatarURL,
                });
            },
        });

        this.fetchMessageList();
    },
    onShow: function () {
        this.fetchMessageList();
    },
    handleInfo: function (event) {
        const info = event.currentTarget.dataset.info;
        wx.navigateTo({
            url: `/pages/${info}/${info}`,
            success: () => {
                console.log(`nav to ${info}`);
            },
        });
    },
    handleTapApp: function (event) {
        const page = event.currentTarget.dataset.page;
        switch (page) {
            case 'lottery':
            case 'search':
                wx.navigateTo({
                    url: `/pages/${page}/${page}`,
                    success: () => {
                        console.log(`nav to ${page}`);
                    },
                });
                break;
            case 'appSetting': {
                const mockEvent = {
                    currentTarget: {
                        dataset: {
                            content: 'appList',
                        },
                    },
                };

                this.handleChangeContent(mockEvent);
                break;
            }
        }
    },
    handleChangeContent: function (event) {
        const content = event.currentTarget.dataset.content;
        switch (content) {
            case 'appSetting':
                this.setData({
                    content: 'appList',
                });
                break;
            case 'appList':
                this.setData({
                    content: 'appSetting',
                });
                break;
            default:
                console.log(content);
                break;
        }
    },
    handleSelect: function (event) {
        const category = event.currentTarget.dataset.category;
        const name = event.currentTarget.dataset.name;

        switch (category) {
            case 'basic': {
                const newBasicList = this.data.appList.basic.slice();
                const newAdvanceList = this.data.appList.advance.slice();
                for (let i = 0; i < newBasicList.length; i++) {
                    if (newBasicList[i].name === name) {
                        newBasicList[i].selected = !newBasicList[i].selected;
                        break;
                    }
                }

                const newSelectedList = [];
                for (let i = 0; i < newBasicList.length; i++) {
                    if (newBasicList[i].selected) {
                        newSelectedList.push(newBasicList[i]);
                        const index = newSelectedList.length - 1;
                        if ((index + 1) % 4 === 0) {
                            newSelectedList[index].end = true;
                        } else {
                            newSelectedList[index].end = false;
                        }
                    }
                }
                for (let i = 0; i < this.data.appList.advance.length; i++) {
                    if (this.data.appList.advance[i].selected) {
                        newSelectedList.push(this.data.appList.advance[i]);
                        const index = newSelectedList.length - 1;
                        if ((index + 1) % 4 === 0) {
                            newSelectedList[index].end = true;
                        } else {
                            newSelectedList[index].end = false;
                        }
                    }
                }

                newSelectedList.push(this.data.addButton);
                const index = newSelectedList.length - 1;
                if ((index + 1) % 4 === 0) {
                    newSelectedList[index].end = true;
                } else {
                    newSelectedList[index].end = false;
                }

                this.setData({
                    appList: {
                        basic: newBasicList,
                        advance: newAdvanceList,
                    },
                    selectedList: newSelectedList,
                });

                break;
            }
            case 'advance': {
                const newBasicList = this.data.appList.basic.slice();
                const newAdvanceList = this.data.appList.advance.slice();
                for (let i = 0; i < newAdvanceList.length; i++) {
                    if (newAdvanceList[i].name === name) {
                        newAdvanceList[i].selected = !newAdvanceList[i].selected;
                        break;
                    }
                }

                const newSelectedList = [];
                for (let i = 0; i < this.data.appList.basic.length; i++) {
                    if (this.data.appList.basic[i].selected) {
                        newSelectedList.push(this.data.appList.basic[i]);
                        const index = newSelectedList.length - 1;
                        if ((index + 1) % 4 === 0) {
                            newSelectedList[index].end = true;
                        } else {
                            newSelectedList[index].end = false;
                        }
                    }
                }
                for (let i = 0; i < newAdvanceList.length; i++) {
                    if (newAdvanceList[i].selected) {
                        newSelectedList.push(newAdvanceList[i]);
                        const index = newSelectedList.length - 1;
                        if ((index + 1) % 4 === 0) {
                            newSelectedList[index].end = true;
                        } else {
                            newSelectedList[index].end = false;
                        }
                    }
                }

                newSelectedList.push(this.data.addButton);
                const index = newSelectedList.length - 1;
                if ((index + 1) % 4 === 0) {
                    newSelectedList[index].end = true;
                } else {
                    newSelectedList[index].end = false;
                }

                this.setData({
                    appList: {
                        basic: newBasicList,
                        advance: newAdvanceList,
                    },
                    selectedList: newSelectedList,
                });

                break;
            }
        }
    },
    fetchMessageList: function () {
        // begin to show async status
        this.setData({
            messageList: {
                isFetching: true,
                fetchSuccess: false,
                list: [],
            },
            unread: 0,
        });

        // begin async request
        const requestURL = getMessageList();
        wx.request({
            url: requestURL,
            header: {
                'content-type': 'application/json',
            },
            success: (res) => {
                switch (res.statusCode) {
                    case 200: {
                        const newList = res.data.list.slice();

                        let unread = 0;
                        for (let i = 0; i < newList.length; i++) {
                            if (!newList[i].unread) {
                                unread += 1;
                            }
                        }

                        this.setData({
                            messageList: {
                                isFetching: false,
                                fetchSuccess: true,
                                list: newList,
                            },
                            unread,
                        });

                        break;
                    }
                    case 401: {
                        this.setData({
                            messageList: {
                                isFetching: false,
                                fetchSuccess: false,
                                list: [],
                            },
                            unread: 0,
                        });

                        break;
                    }
                    case 502: {
                        this.setData({
                            messageList: {
                                isFetching: false,
                                fetchSuccess: false,
                                list: [],
                            },
                            unread: 0,
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

                this.setData({
                    messageList: {
                        isFetching: false,
                        fetchSuccess: false,
                        list: [],
                    },
                    unread: 0,
                });
            },
        });
    },
});

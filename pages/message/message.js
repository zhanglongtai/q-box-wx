import { getMessageList } from '../API/api';

Page({
    data: {
        messageList: {
            isFetching: true,
            fetchSuccess: false,
            list: [],
        },
    },
    onLoad: function () {
        this.fetchMessageList();
    },
    onShow: function () {
        this.fetchMessageList();
    },
    handleTap: function (event) {
        const { unread } = event.currentTarget.dataset;
        const msgID = event.currentTarget.dataset.msgid;

        wx.navigateTo({
            url: `/pages/messageDetail/messageDetail?msgID=${msgID}`,
            success: () => {
                console.log('nav to messageItem');
            },
        });
        if (unread === 'true') {
            const messageList = this.data.messageList.list.slice();
            for (let i = 0; i < messageList.length; i++) {
                if (messageList[i].msgID === msgID) {
                    messageList[i].unread = false;
                }
            }

            this.setData({
                messageList: {
                    isFetching: false,
                    fetchSuccess: true,
                    list: messageList,
                },
            });
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

                        this.setData({
                            messageList: {
                                isFetching: false,
                                fetchSuccess: true,
                                list: newList,
                            },
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
                });
            },
        });
    },
});

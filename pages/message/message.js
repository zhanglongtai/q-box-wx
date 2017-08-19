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
    handleTap: function () {
        wx.navigateTo({
            url: '/pages/messageDetail/messageDetail',
            success: () => {
                console.log('nav to messageItem');
            },
        });
    },
    fetchMessageList: function () {
        // begin to show async status
        this.setData({
            messageList: {
                isFetching: true,
                fetchSuccess: false,
                list: this.data.messageList.list.slice(),
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
                        const newList = (
                            res.data.list.length === this.data.messageList.list.length
                            ?
                            this.data.messageList.list.length.slice()
                            :
                            res.data.list.slice()
                        );

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

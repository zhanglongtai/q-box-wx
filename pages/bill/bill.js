import { getBillList } from '../API/api';

Page({
    data: {
        userID: 'test',
        currentDate: '',
        queryDate: '',
        billList: {
            isFetching: true,
            fetchSuccess: false,
            list: [],
        },
    },
    onLoad: function (query) {
        const userID = query.userID;
        const time = new Date();
        const date = this.formatTime(time);
        this.setData({
            currentDate: date,
            queryDate: date,
        });

        this.fetchBillList(userID, date);
    },
    formatTime: (timeObject) => {
        const timeArgs = timeObject.toString().split(' ');
        const year = timeArgs[3];
        let month = (timeObject.getMonth() + 1).toString();
        if (month.length === 1) {
            month = `0${month}`;
        }

        return `${year}-${month}`;
    },
    changeDate: function (event) {
        this.setData({
            queryDate: event.detail.value,
        });

        this.fetchBillList(this.data.userID, event.detail.value);
    },
    handleNavBack: () => {
        wx.navigateBack({
            delta: 1,
        });
    },
    fetchBillList: function (userID, queryDate) {
        // begin to show async status
        this.setData({
            billList: {
                isFetching: true,
                fetchSuccess: false,
                list: [],
            },
        });

        // begin async request
        const id = userID || this.data.userID;
        let date = queryDate || this.data.queryDate;
        date = date.slice(0, 7); // date = 'YYYY-MM'
        console.log()
        const requestURL = getBillList(id);
        console.log(requestURL);
        wx.request({
            url: requestURL,
            header: {
                'content-type': 'application/json',
            },
            data: {
                date,
            },
            success: (res) => {
                switch (res.statusCode) {
                    case 200: {
                        this.setData({
                            billList: {
                                isFetching: false,
                                fetchSuccess: true,
                                list: res.data.list,
                            },
                        });

                        break;
                    }
                    case 401: {
                        this.setData({
                            billList: {
                                isFetching: false,
                                fetchSuccess: false,
                                list: [],
                            },
                        });

                        break;
                    }
                    case 502: {
                        this.setData({
                            billList: {
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
                    billList: {
                        isFetching: false,
                        fetchSuccess: false,
                        list: [],
                    },
                });
            },
        });
    },
});

import {
    getBalance,
    getUsage,
    getPaymentArgs,
} from '../API/api';

Page({
    data: {
        userID: '',
        balance: {
            isFetching: true,
            fetchSuccess: false,
            value: '0.00',
        },
        usage: {
            isFetching: true,
            fetchSuccess: false,
            value: '0.00',
        },
        charge: ['￥ 1.00', '￥ 5.00', '￥ 15.00'],
        chargeIndex: 0,
    },
    onLoad: function (query) {
        // pass user id
        const userID = query.userID;
        this.setData({
            userID,
        });

        this.fetchBalance(userID);
        this.fetchUsage(userID);
    },
    chooseCharge: function (event) {
        this.setData({
            chargeIndex: event.detail.value,
        });
    },
    handlePay: () => {
        wx.showLoading({
            title: '正在发起支付',
        });

        const url = getPaymentArgs();
        wx.request({
            url,
            success: (res) => {
                switch (res.statusCode) {
                    case 200: {
                        const { timeStamp, nonceStr, paySign } = res.data;
                        wx.hideLoading();
                        wx.requestPayment({
                            'timeStamp': timeStamp,
                            'nonceStr': nonceStr,
                            'package': res.data.package,
                            'signType': 'MD5',
                            'paySign': paySign,
                            'success': (payRes) => {
                                wx.showToast({
                                    title: '支付成功',
                                    duration: 2000,
                                });
                            },
                            'fail': (payRes) => {
                                if (payRes.errMsg === 'cancel') {
                                    console.log('用户取消支付');
                                } else {
                                    wx.showToast({
                                        title: '支付失败',
                                        duration: 2000,
                                    });
                                    console.log(payRes.errMsg);
                                }
                            },
                        });
                        break;
                    }
                    default:
                        wx.hideLoading();
                        wx.showToast({
                            title: '支付发起失败',
                            duration: 2000,
                        });
                        console.log(res.errMsg);
                        break;
                }
            },
            fail: (res) => {
                wx.hideLoading();
                wx.showToast({
                    title: '支付发起失败',
                    duration: 2000,
                });
                console.log(res.errMsg);
            },
        });
    },
    handleNavBack: () => {
        wx.navigateBack({
            delta: 1,
        });
    },
    navToBill: function () {
        wx.navigateTo({
            url: `/pages/bill/bill?userID=${this.data.userID}`,
            success: (navRes) => {
                console.log('nav to bill');
            },
        });
    },
    fetchBalance: function (userID) {
        // begin to show async status
        this.setData({
            balance: {
                isFetching: true,
                fetchSuccess: false,
                value: '0.00',
            },
        });

        // begin async request
        const id = userID || this.data.userID;
        const requestURL = getBalance(id);
        wx.request({
            url: requestURL,
            header: {
                'content-type': 'application/json',
            },
            success: (res) => {
                switch (res.statusCode) {
                    case 200: {
                        this.setData({
                            balance: {
                                isFetching: false,
                                fetchSuccess: true,
                                value: res.data.value,
                            },
                        });

                        break;
                    }
                    case 401: {
                        this.setData({
                            balance: {
                                isFetching: false,
                                fetchSuccess: false,
                                value: '0.00',
                            },
                        });

                        break;
                    }
                    case 502: {
                        this.setData({
                            balance: {
                                isFetching: false,
                                fetchSuccess: false,
                                value: '0.00',
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
                    balance: {
                        isFetching: false,
                        fetchSuccess: false,
                        value: '0.00',
                    },
                });
            },
        });
    },
    fetchUsage: function (userID) {
        // begin to show async status
        this.setData({
            usage: {
                isFetching: true,
                fetchSuccess: false,
                value: '0.00',
            },
        });

        // begin async request
        const id = userID || this.data.userID;
        const requestURL = getUsage(id);
        wx.request({
            url: requestURL,
            header: {
                'content-type': 'application/json',
            },
            success: (res) => {
                switch (res.statusCode) {
                    case 200: {
                        this.setData({
                            usage: {
                                isFetching: false,
                                fetchSuccess: true,
                                value: res.data.value,
                            },
                        });

                        break;
                    }
                    case 401: {
                        this.setData({
                            usage: {
                                isFetching: false,
                                fetchSuccess: false,
                                value: '0.00',
                            },
                        });

                        break;
                    }
                    case 502: {
                        this.setData({
                            usage: {
                                isFetching: false,
                                fetchSuccess: false,
                                value: '0.00',
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
                    usage: {
                        isFetching: false,
                        fetchSuccess: false,
                        value: '0.00',
                    },
                });
            },
        });
    },
});

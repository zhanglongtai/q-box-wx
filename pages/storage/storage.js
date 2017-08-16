import { getPieChartURL, getLineChartURL } from '../API/api';

Page({
    data: {
        timeRange: ['最近7天', '最近30天'],
        timeRangeIndex: 0,
        pieChart: {
            isFetching: true,
            success: false,
            imgURL: '',
        },
        lineChart: {
            isFetching: true,
            success: false,
            imgURL: '',
        },
    },
    onLoad: function () {
        this.fetchPieChart();
        this.fetchLineChart();
    },
    chooseTimeRange: function (event) {
        this.setData({
            timeRangeIndex: event.detail.value,
        });

        this.fetchLineChart(event.detail.value);
    },
    handleNavBack: () => {
        wx.navigateBack({
            delta: 1,
        });
    },
    fetchPieChart: function () {
        // begin to show async status
        this.setData({
            pieChart: {
                isFetching: true,
                fetchSuccess: false,
                imgURL: '',
            },
        });

        // begin async request
        const requestURL = getPieChartURL();
        wx.request({
            url: requestURL,
            header: {
                'content-type': 'application/json',
            },
            success: (res) => {
                switch (res.statusCode) {
                    case 200: {
                        this.setData({
                            pieChart: {
                                isFetching: false,
                                fetchSuccess: true,
                                imgURL: res.data.imgURL,
                            },
                        });

                        break;
                    }
                    case 401: {
                        this.setData({
                            pieChart: {
                                isFetching: false,
                                fetchSuccess: false,
                                imgURL: '',
                            },
                        });

                        break;
                    }
                    case 502: {
                        this.setData({
                            pieChart: {
                                isFetching: false,
                                fetchSuccess: false,
                                imgURL: '',
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
                    pieChart: {
                        isFetching: false,
                        fetchSuccess: false,
                        imgURL: '',
                    },
                });
            },
        });
    },
    fetchLineChart: function (timeRangeIndex) {
        // begin to show async status
        this.setData({
            lineChart: {
                isFetching: true,
                fetchSuccess: false,
                imgURL: '',
            },
        });

        // begin async request
        let timeRange = null;
        switch (timeRangeIndex || this.data.timeRangeIndex) {
            case '0':
                timeRange = 7;
                break;
            case '1':
                timeRange = 30;
                break;
            default:
                timeRange = 7;
                break;
        }

        const requestURL = getLineChartURL(timeRange);
        wx.request({
            url: requestURL,
            header: {
                'content-type': 'application/json',
            },
            success: (res) => {
                switch (res.statusCode) {
                    case 200: {
                        this.setData({
                            lineChart: {
                                isFetching: false,
                                fetchSuccess: true,
                                imgURL: res.data.imgURL,
                            },
                        });

                        break;
                    }
                    case 401: {
                        this.setData({
                            lineChart: {
                                isFetching: false,
                                fetchSuccess: false,
                                imgURL: '',
                            },
                        });

                        break;
                    }
                    case 502: {
                        this.setData({
                            lineChart: {
                                isFetching: false,
                                fetchSuccess: false,
                                imgURL: '',
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
                    lineChart: {
                        isFetching: false,
                        fetchSuccess: false,
                        imgURL: '',
                    },
                });
            },
        });
    },
});

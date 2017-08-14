import { COMMON_URL, getFileList } from '../API/api';
const appInstance = getApp();

Page({
    data: {
        fileList: {
            isFetching: true,
            fetchSuccess: false,
            list: [],
        },
        showList: [], // store list in default order
        sortedList: [], // store list in specify order
        listStack: [],
        folderStack: [], // this is not including root folder name
        sortType: 'name-asc', // 'name-asc', 'name-desc', 'time-asc', 'time-desc', 'type-asc', 'type-desc',
    },
    onLoad: function () {
        this.fetchFileList();
    },
    handleTapFolder: function (event) {
        const listStack = this.data.listStack.slice();
        const folderStack = this.data.folderStack.slice();
        const showList = this.data.showList.slice();
        listStack.push(showList);

        const uuid = event.currentTarget.dataset.uuid;
        const self = this;
        for (let i = 0; i < showList.length; i++) {
            if (showList[i].uuid === uuid) {
                folderStack.push(showList[i].name);
                self.setData({
                    showList: showList[i].nodes.slice(),
                    sortedList: showList[i].nodes.slice(),
                    listStack,
                    folderStack,
                    sortType: 'name-asc',
                });
            }
        }
    },
    handleNavBack: function (event) {
        const listStack = this.data.listStack.slice();
        const folderStack = this.data.folderStack.slice();
        const showList = listStack.pop();
        const sortedList = listStack.pop();
        folderStack.pop();

        this.setData({
            showList,
            sortedList,
            listStack,
            folderStack,
            sortType: 'name-asc',
        });
    },
    handleNavBackTo: function (event) {
        const index = event.currentTarget.dataset.index;
        if (index !== this.data.folderStack.length - 1) {
            const showList = this.data.listStack[index + 1].slice();
            const sortedList = showList.slice();
            const listStack = this.data.listStack.slice(0, index + 1);
            const folderStack = this.data.folderStack.slice(0, index + 1);

            this.setData({
                showList,
                sortedList,
                listStack,
                folderStack,
                sortType: 'name-asc',
            });
        }
    },
    handleNavRoot: function (event) {
        const listStack = [];
        const folderStack = [];
        const showList = this.data.fileList.list.slice();
        const sortedList = showList.slice();

        this.setData({
            listStack,
            folderStack,
            showList,
            sortedList,
            sortType: 'name-asc',
        });
    },
    handleSort: function (event) {
        wx.showActionSheet({
            itemList: ['按名称排序', '按时间排序', '按类型排序'],
            success: (res) => {
                const list = this.data.showList;
                switch (res.tapIndex) {
                    case 0: {
                        if (this.data.sortType !== 'name-asc' && this.data.sortType !== 'name-desc') {
                            list.sort((prev, next) => {
                                if (prev.name <= next.name) {
                                    return -1;
                                }
                                return 1;
                            });

                            this.setData({
                                sortedList: list,
                                sortType: 'name-asc',
                            });
                        } else if (this.data.sortType === 'name-asc') {
                            list.sort((prev, next) => {
                                if (prev.name >= next.name) {
                                    return -1;
                                }
                                return 1;
                            });

                            this.setData({
                                sortedList: list,
                                sortType: 'name-desc',
                            });
                        } else if (this.data.sortType === 'name-desc') {
                            list.sort((prev, next) => {
                                if (prev.name <= next.name) {
                                    return -1;
                                }
                                return 1;
                            });

                            this.setData({
                                sortedList: list,
                                sortType: 'name-asc',
                            });
                        }
                        break;
                    }
                    case 1: {
                        if (this.data.sortType !== 'time-asc' && this.data.sortType !== 'time-desc') {
                            list.sort((prev, next) => {
                                if (prev.time <= next.time) {
                                    return -1;
                                }
                                return 1;
                            });

                            this.setData({
                                sortedList: list,
                                sortType: 'time-asc',
                            });
                        } else if (this.data.sortType === 'time-asc') {
                            list.sort((prev, next) => {
                                if (prev.time >= next.time) {
                                    return -1;
                                }
                                return 1;
                            });

                            this.setData({
                                sortedList: list,
                                sortType: 'time-desc',
                            });
                        } else if (this.data.sortType === 'time-desc') {
                            list.sort((prev, next) => {
                                if (prev.time <= next.time) {
                                    return -1;
                                }
                                return 1;
                            });

                            this.setData({
                                sortedList: list,
                                sortType: 'time-asc',
                            });
                        }
                        break;
                    }
                    case 2: {
                        if (this.data.sortType !== 'type-asc' && this.data.sortType !== 'type-desc') {
                            list.sort((prev, next) => {
                                if (prev.type <= next.type) {
                                    return -1;
                                }
                                return 1;
                            });

                            this.setData({
                                sortedList: list,
                                sortType: 'type-asc',
                            });
                        } else if (this.data.sortType === 'type-asc') {
                            list.sort((prev, next) => {
                                if (prev.type >= next.type) {
                                    return -1;
                                }
                                return 1;
                            });

                            this.setData({
                                sortedList: list,
                                sortType: 'type-desc',
                            });
                        } else if (this.data.sortType === 'type-desc') {
                            list.sort((prev, next) => {
                                if (prev.type <= next.type) {
                                    return -1;
                                }
                                return 1;
                            });

                            this.setData({
                                sortedList: list,
                                sortType: 'type-asc',
                            });
                        }
                        break;
                    }
                    default:
                        break;
                }
            },
            fail: (res) => {
                console.log(res.errMsg);
            },
        });
    },
    handleAction: (event) => {
        wx.showActionSheet({
            itemList: ['查看', '分享', '从云端删除'],
            success: (res) => {
                switch (res.tapIndex) {
                    case 0: {
                        const { name, type, size, unit, time, url } = event.currentTarget.dataset;
                        const imgURL = event.currentTarget.dataset.imgurl;
                        const imageType = ['jpg', 'png', 'jpeg', 'gif'];
                        const documentType = ['doc', 'xls', 'ppt', 'pdf', 'docx', 'xlsx', 'pptx'];
                        const audioType = ['mp3'];
                        const videoType = ['avi', 'mov', 'mp4'];

                        let category = null;
                        if (imageType.indexOf(type) !== -1) {
                            category = 'image';
                        } else if (documentType.indexOf(type) !== -1) {
                            category = 'document';
                        } else if (audioType.indexOf(type) !== -1) {
                            category = 'audio';
                        } else if (videoType.indexOf(type) !== -1) {
                            category = 'video';
                        }

                        switch (category) {
                            case 'image':
                                wx.previewImage({
                                    urls: [url],
                                });
                                break;
                            case 'document':
                                wx.getNetworkType({
                                    success: (netRes) => {
                                        switch (netRes.networkType) {
                                            case '2g':
                                            case '3g':
                                            case '4g':
                                                wx.showModal({
                                                    title: '提示',
                                                    content: '正在使用移动网络, 是否继续?',
                                                    success: (modalRes) => {
                                                        if (modalRes.confirm) {
                                                            wx.navigateTo({
                                                                url: `/pages/fileDetail/fileDetail?name=${name}&type=${type}&size=${size}&unit=${unit}&url=${url}&time=${time}&imgURL=${imgURL}`,
                                                                success: (navRes) => {
                                                                    console.log('nav to fileDetail');
                                                                },
                                                            });
                                                        } else if (modalRes.cancel) {
                                                            console.log('用户点击取消');
                                                        }
                                                    },
                                                });
                                                break;
                                            case 'wifi': {
                                                wx.navigateTo({
                                                    url: `/pages/fileDetail/fileDetail?name=${name}&type=${type}&size=${size}&unit=${unit}&url=${url}&time=${time}&imgURL=${imgURL}`,
                                                    success: (navRes) => {
                                                        console.log('nav to fileDetail');
                                                    },
                                                });
                                                break;
                                            }
                                            case 'none':
                                                wx.showToast({
                                                    title: '未连接到网络, 无法查看文件',
                                                    image: '/asset/ic_warning_48px.svg',
                                                    duration: 2000,
                                                });
                                                break;
                                            default:
                                                console.log(res.networkType);
                                                break;
                                        }
                                    },
                                    fail: (netRes) => {
                                        console.log(netRes.errMsg);
                                    },
                                });
                                break;
                            case 'audio':
                                wx.getNetworkType({
                                    success: (netRes) => {
                                        switch (netRes.networkType) {
                                            case '2g':
                                            case '3g':
                                            case '4g':
                                                wx.showModal({
                                                    title: '提示',
                                                    content: '正在使用移动网络, 是否继续?',
                                                    success: (modalRes) => {
                                                        if (modalRes.confirm) {
                                                            wx.navigateTo({
                                                                url: `/pages/audioDetail/audioDetail?name=${name}&type=${type}&size=${size}&unit=${unit}&url=${url}&time=${time}&imgURL=${imgURL}`,
                                                                success: (navRes) => {
                                                                    console.log('nav to audioDetail');
                                                                },
                                                            });
                                                        } else if (modalRes.cancel) {
                                                            console.log('用户点击取消');
                                                        }
                                                    },
                                                });
                                                break;
                                            case 'wifi': {
                                                wx.navigateTo({
                                                    url: `/pages/audioDetail/audioDetail?name=${name}&type=${type}&size=${size}&unit=${unit}&url=${url}&time=${time}&imgURL=${imgURL}`,
                                                    success: (navRes) => {
                                                        console.log('nav to audioDetail');
                                                    },
                                                });
                                                break;
                                            }
                                            case 'none':
                                                wx.showToast({
                                                    title: '未连接到网络, 无法查看文件',
                                                    image: '/asset/ic_warning_48px.svg',
                                                    duration: 2000,
                                                });
                                                break;
                                            default:
                                                console.log(res.networkType);
                                                break;
                                        }
                                    },
                                    fail: (netRes) => {
                                        console.log(netRes.errMsg);
                                    },
                                });
                                break;
                            case 'video':
                                wx.getNetworkType({
                                    success: (netRes) => {
                                        switch (netRes.networkType) {
                                            case '2g':
                                            case '3g':
                                            case '4g':
                                                wx.showModal({
                                                    title: '提示',
                                                    content: '正在使用移动网络, 是否继续?',
                                                    success: (modalRes) => {
                                                        if (modalRes.confirm) {
                                                            wx.navigateTo({
                                                                url: `/pages/videoDetail/videoDetail?name=${name}&type=${type}&size=${size}&unit=${unit}&url=${url}&time=${time}&imgURL=${imgURL}`,
                                                                success: (navRes) => {
                                                                    console.log('nav to videoDetail');
                                                                },
                                                            });
                                                        } else if (modalRes.cancel) {
                                                            console.log('用户点击取消');
                                                        }
                                                    },
                                                });
                                                break;
                                            case 'wifi': {
                                                wx.navigateTo({
                                                    url: `/pages/videoDetail/videoDetail?name=${name}&type=${type}&size=${size}&unit=${unit}&url=${url}&time=${time}&imgURL=${imgURL}`,
                                                    success: (navRes) => {
                                                        console.log('nav to videoDetail');
                                                    },
                                                });
                                                break;
                                            }
                                            case 'none':
                                                wx.showToast({
                                                    title: '未连接到网络, 无法查看文件',
                                                    image: '/asset/ic_warning_48px.svg',
                                                    duration: 2000,
                                                });
                                                break;
                                            default:
                                                console.log(res.networkType);
                                                break;
                                        }
                                    },
                                    fail: (netRes) => {
                                        console.log(netRes.errMsg);
                                    },
                                });
                                break;
                            default:
                                wx.showToast({
                                    title: '暂不支持此格式文件',
                                    image: '/asset/ic_warning_48px.svg',
                                    duration: 2000,
                                });
                                break;
                        }
                        break;
                    }
                    case 1: {
                        const { name, type, size, unit, url, time } = event.currentTarget.dataset;
                        const imgURL = event.currentTarget.dataset.imgurl;
                        wx.navigateTo({
                            url: `/pages/fileShare/fileShare?name=${name}&type=${type}&size=${size}&unit=${unit}&url=${url}&time=${time}&imgURL=${imgURL}`,
                            success: (navRes) => {
                                console.log('nav to fileShare');
                            },
                        });
                        break;
                    }
                    default:
                        break;
                }
            },
            fail: (res) => {
                console.log(res.errMsg);
            },
        });
    },
    updateList: function (event) {
        if (event.detail.scrollTop < 0 && event.detail.scrollTop >= -20) {
            this.setData({
                pulldownLv1: true,
            });
        } else if (event.detail.scrollTop < -40) {
            this.setData({
                pulldownLv1: false,
                pulldownLv2: true,
            });

            setTimeout(() => {
                this.fetchFileList();
            }, 1500);
        } else {
            this.setData({
                pulldownLv1: false,
            });
        }
    },
    fetchFileList: function () {
        // begin to show async status
        const newFileList = {
            isFetching: true,
            fetchSuccess: false,
            list: [],
        };

        this.setData({
            fileList: newFileList,
            pulldownLv1: false,
            pulldownLv2: false,
        });

        // begin async request
        const requestURL = getFileList();
        wx.request({
            url: requestURL,
            header: {
                'content-type': 'application/json',
            },
            success: (res) => {
                switch (res.statusCode) {
                    case 200: {
                        const fileList = {
                            isFetching: false,
                            fetchSuccess: true,
                            list: res.data.list,
                        };
                        
                        if (appInstance.globalData.navToFolder === null) {
                        // open xcx first time
                            this.setData({
                                fileList,
                                showList: fileList.list,
                                sortedList: fileList.list,
                                listStack: [],
                                folderStack: [],
                                sortType: 'name-asc',
                            });
                        } else {
                            // nav to this page from folder share page
                            const folderName = appInstance.globalData.navToFolder;

                            const listStack = [fileList.list.slice()];
                            const folderStack = [folderName];

                            let folderIndex = null;
                            for (let i = 0; i < fileList.list.length; i++) {
                                if (fileList.list[i].name === folderName) {
                                    folderIndex = i;
                                    break;
                                }
                            }
                            const showList = fileList.list[folderIndex].nodes.slice();
                            const sortedList = fileList.list[folderIndex].nodes.slice();

                            this.setData({
                                fileList,
                                showList,
                                sortedList,
                                listStack,
                                folderStack,
                                sortType: 'name-asc',
                            });

                            appInstance.globalData.navToFolder = null;
                        }

                        break;
                    }
                    case 401: {
                        const fileList = {
                            isFetching: false,
                            fetchSuccess: false,
                            list: [],
                        };

                        this.setData({
                            fileList,
                            showList: fileList.list,
                            sortedList: fileList.list,
                            listStack: [],
                            folderStack: [],
                            sortType: 'name-asc',
                        });

                        break;
                    }
                    case 502: {
                        const fileList = {
                            isFetching: false,
                            fetchSuccess: false,
                            list: [],
                        };

                        this.setData({
                            fileList,
                            showList: fileList.list,
                            sortedList: fileList.list,
                            listStack: [],
                            folderStack: [],
                            sortType: 'name-asc',
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

                const fileList = {
                    isFetching: false,
                    fetchSuccess: false,
                    list: [],
                };

                this.setData({
                    fileList,
                    showList: fileList.list,
                    sortedList: fileList.list,
                    listStack: [],
                    folderStack: [],
                    sortType: 'name-asc',
                });
            },
        });
    },
});

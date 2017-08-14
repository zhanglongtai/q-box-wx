import { uploadFile } from '../API/api';

// const app = getApp();

Page({
    data: {
        fileList: {
            isFetching: true,
            fetchSuccess: false,
            errMsg: '',
            list: [],
        },
    },
    onLoad: function () {
        this.fetchLocalFileList();
    },
    onShow: function () {
        this.fetchLocalFileList();
    },
    handleTap: function (event) {
        wx.showActionSheet({
            itemList: ['查看详情', '上传到云端', '从本地删除'],
            success: (res) => {
                switch (res.tapIndex) {
                    case 0: {
                        const filePath = event.currentTarget.dataset.name;
                        wx.openDocument({
                            filePath,
                            success: (res) => {
                                console.log('打开文档成功');
                            },
                            fail: (res) => {
                                wx.showToast({
                                    title: res.errMsg,
                                    duration: 2000,
                                });
                            },
                        });
                        break;
                    }
                    case 1: {
                        const path = event.currentTarget.dataset.name;
                        const name = path.split('_')[1];

                        const url = uploadFile();
                        wx.uploadFile({
                            url,
                            filePath: path,
                            name: 'file',
                            formData: {
                                "name": name,
                            },
                            success: (uploadRes) => {
                                console.log(uploadRes);
                                if (uploadRes.data === 'ok') {
                                    wx.showToast({
                                        title: '上传成功',
                                        icon: 'success',
                                        duration: 2000,
                                    });
                                }
                            },
                        });
                        break;
                    }
                    case 2: {
                        const filePath = event.currentTarget.dataset.name;
                        wx.removeSavedFile({
                            filePath,
                            complete: () => {
                                this.fetchLocalFileList();
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
    fetchLocalFileList: function () {
        // begin to show async status
        const newFileList = Object.assign({}, this.data.fileList);
        newFileList.isFetching = true;
        newFileList.fetchSuccess = false;
        newFileList.list = [];

        this.setData({
            fileList: newFileList,
        });

        // begin fetching local files
        wx.getSavedFileList({
            success: (res) => {
                const newList = [];
                res.fileList.forEach((item) => {
                    const name = item.filePath;
                    const type = item.filePath.split('.')[1];
                    let size = null;
                    let unit = null;
                    if (item.size >= 1024 * 1024) {
                        size = Math.round(item.size*10/(1024 * 1024))/10;
                        unit = 'MB';
                    } else if (item.size >= 1024) {
                        size = Math.round(item.size*10/1024)/10;
                        unit = 'KB';
                    } else {
                        size = Math.round(item.size*10)/10;
                        unit = 'B';
                    }

                    newList.push({ name, type, size, unit });
                });

                const fileList = {
                    isFetching: false,
                    fetchSuccess: true,
                    errMsg: '',
                    list: newList,
                };

                this.setData({
                    fileList,
                });
            },
            fail: (res) => {
                const fileList = {
                    isFetching: false,
                    fetchSuccess: false,
                    errMsg: res.errMsg,
                    list: res.fileList,
                };

                this.setData({
                    fileList,
                });
            },
        });
    },
});

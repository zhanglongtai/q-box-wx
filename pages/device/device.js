import { uploadFile } from '../API/api';
const appInstance = getApp();

Page({
    data: {
        uploadPhotoList: [],
        uploadVideo: {},
        uploading: false,
    },
    onLoad: function () {
        this.setData({
            uploadPhotoList: this.initData(9),
            uploadVideo: {
                taskBegin: false,
                uploading: false,
                persent: 0,
                success: false,
                imgPath: '/asset/ic_movie_48px.svg',
                leftDegree: 135,
                rightDegree: -135,
            },
        });
    },
    onShow: function () {
        if (this.data.uploading) {
            wx.showLoading({
                title: '上传中',
                mask: true,
            });
        }
    },
    addPhoto: function () {
        if (!this.data.uploading) {
            this.setData({
                uploadPhotoList: this.initData(9),
            });

            wx.chooseImage({
                count: 9,
                sizeType: ['original'],
                sourceType: ['album'],
                success: (res) => {
                    const tempFilePaths = res.tempFilePaths;

                    const url = uploadFile();

                    wx.showLoading({
                        title: '上传中',
                        mask: true,
                    });

                    this.setData({
                        uploading: true,
                    });

                    for (let i = 0; i < tempFilePaths.length; i++) {
                        const newUploadItem = {
                            taskBegin: true,
                            uploading: true,
                            persent: 0,
                            success: false,
                            imgPath: tempFilePaths[i],
                            leftDegree: 135,
                            rightDegree: -135,
                        };

                        const list = this.data.uploadPhotoList.slice();
                        list[i] = newUploadItem;

                        this.setData({
                            uploadPhotoList: list,
                        });

                        const uploadTask = wx.uploadFile({
                            url,
                            filePath: tempFilePaths[i],
                            name: 'file',
                            formData: {
                                "name": tempFilePaths[i],
                            },
                            success: (uploadRes) => {
                                console.log(uploadRes);

                                switch (uploadRes.statusCode) {
                                    case 200: {
                                        const newList = this.data.uploadPhotoList.slice();
                                        newList[i] = {
                                            taskBegin: true,
                                            uploading: false,
                                            persent: 0,
                                            success: true,
                                            imgPath: tempFilePaths[i],
                                            leftDegree: 135,
                                            rightDegree: -135,
                                        };

                                        this.setData({
                                            uploadPhotoList: newList,
                                        });

                                        break;
                                    }
                                    case 413: {
                                        const newList = this.data.uploadPhotoList.slice();
                                        newList[i] = {
                                            taskBegin: true,
                                            uploading: false,
                                            persent: 0,
                                            success: false,
                                            imgPath: tempFilePaths[i],
                                            leftDegree: 135,
                                            rightDegree: -135,
                                        };

                                        this.setData({
                                            uploadPhotoList: newList,
                                        });

                                        break;
                                    }
                                    default: {
                                        const newList = this.data.uploadPhotoList.slice();
                                        newList[i] = {
                                            taskBegin: true,
                                            uploading: false,
                                            persent: 0,
                                            success: false,
                                            imgPath: tempFilePaths[i],
                                            leftDegree: 135,
                                            rightDegree: -135,
                                        };

                                        this.setData({
                                            uploadPhotoList: newList,
                                        });

                                        break;
                                    }
                                }
                            },
                            fail: (uploadRes) => {
                                console.log(uploadRes.errMsg);
                                const newList = this.data.uploadPhotoList.slice();
                                newList[i] = {
                                    taskBegin: true,
                                    uploading: false,
                                    persent: 0,
                                    success: false,
                                    imgPath: tempFilePaths[i],
                                    leftDegree: 135,
                                    rightDegree: -135,
                                };

                                this.setData({
                                    uploadPhotoList: newList,
                                });
                            },
                        });

                        uploadTask.onProgressUpdate((progressRes) => {
                            const uploadPhotoList = this.data.uploadPhotoList.slice();
                            if (progressRes.progress <= 50) {
                                uploadPhotoList[i].rightDegree = -135 + ((progressRes.progress * 180) / 50);
                                uploadPhotoList[i].leftDegree = 135;
                            } else {
                                uploadPhotoList[i].rightDegree = 45;
                                uploadPhotoList[i].leftDegree = 135 + (((progressRes.progress - 50) * 180) / 50);
                            }
                            uploadPhotoList[i].persent = progressRes.progress;
                            this.setData({
                                uploadPhotoList,
                            });
                        });
                    }

                    const self = this;
                    function timer() {
                        setTimeout(() => {
                            let finished = true;
                            for (let i = 0; i < tempFilePaths.length; i++) {
                                if (self.data.uploadPhotoList[i].uploading === true) {
                                    finished = false;
                                    break;
                                }
                            }

                            if (finished) {
                                wx.hideLoading();
                                wx.showToast({
                                    title: '上传完成',
                                    duration: 2000,
                                });
                                self.setData({
                                    uploading: false,
                                });
                            } else {
                                timer();
                            }
                        }, 1000);
                    }
                    timer();
                },
            });
        }
    },
    addVideo: function () {
        if (!this.data.uploading) {
            this.setData({
                uploadVideo: {
                    taskBegin: false,
                    uploading: false,
                    persent: 0,
                    success: false,
                    imgPath: '/asset/ic_movie_48px.svg',
                    leftDegree: 135,
                    rightDegree: -135,
                },
            });

            wx.chooseVideo({
                sourceType: ['album'],
                success: (res) => {
                    const tempFilePath = res.tempFilePath;

                    const url = uploadFile();

                    wx.showLoading({
                        title: '上传中',
                        mask: true,
                    });

                    this.setData({
                        uploading: true,
                        uploadVideo: {
                            taskBegin: true,
                            uploading: true,
                            persent: 0,
                            success: true,
                            imgPath: '/asset/ic_movie_48px.svg',
                            leftDegree: 135,
                            rightDegree: -135,
                        },
                    });

                    const uploadTask = wx.uploadFile({
                        url,
                        filePath: tempFilePath,
                        name: 'file',
                        formData: {
                            "name": tempFilePath,
                        },
                        success: (uploadRes) => {
                            console.log(uploadRes);

                            switch (uploadRes.statusCode) {
                                case 200: {
                                    const newItem = {
                                        taskBegin: true,
                                        uploading: false,
                                        persent: 0,
                                        success: true,
                                        imgPath: '/asset/ic_movie_48px.svg',
                                        leftDegree: 135,
                                        rightDegree: -135,
                                    };

                                    this.setData({
                                        uploadVideo: newItem,
                                        uploading: false,
                                    });

                                    wx.hideLoading();
                                    wx.showToast({
                                        title: '上传完成',
                                        duration: 2000,
                                    });

                                    break;
                                }
                                case 413: {
                                    const newItem = {
                                        taskBegin: true,
                                        uploading: false,
                                        persent: 0,
                                        success: false,
                                        imgPath: '/asset/ic_movie_48px.svg',
                                        leftDegree: 135,
                                        rightDegree: -135,
                                    };

                                    this.setData({
                                        uploadVideo: newItem,
                                        uploading: false,
                                    });

                                    wx.hideLoading();
                                    wx.showToast({
                                        title: '上传失败',
                                        icon: '/asset/ic_warning_48px.svg',
                                        duration: 2000,
                                    });

                                    break;
                                }
                                default: {
                                    const newItem = {
                                        taskBegin: true,
                                        uploading: false,
                                        persent: 0,
                                        success: false,
                                        imgPath: '/asset/ic_movie_48px.svg',
                                        leftDegree: 135,
                                        rightDegree: -135,
                                    };

                                    this.setData({
                                        uploadVideo: newItem,
                                        uploading: false,
                                    });

                                    wx.hideLoading();
                                    wx.showToast({
                                        title: '上传失败',
                                        icon: '/asset/ic_warning_48px.svg',
                                        duration: 2000,
                                    });

                                    break;
                                }
                            }
                        },
                        fail: (uploadRes) => {
                            console.log(uploadRes.errMsg);

                            const newItem = {
                                taskBegin: true,
                                uploading: false,
                                persent: 0,
                                success: false,
                                imgPath: '/asset/ic_movie_48px.svg',
                                leftDegree: 135,
                                rightDegree: -135,
                            };

                            this.setData({
                                uploadVideo: newItem,
                                uploading: false,
                            });

                            wx.hideLoading();
                            wx.showToast({
                                title: '上传失败',
                                icon: '/asset/ic_warning_48px.svg',
                                duration: 2000,
                            });
                        },
                    });
                },
            });
        }
    },
    initData: (num) => {
        const array = [];
        for (let i = 0; i < num; i++) {
            array.push({
                taskBegin: false,
                uploading: false,
                persent: 0,
                success: false,
                imgPath: '',
                leftDegree: 135,
                rightDegree: -135,
            });
        }
        return array;
    },
});

// import { getOpenid } from './pages/API/api';

App({
    onLaunch: () => {
        wx.checkSession({
            success: () => {
                console.log('session unexpired');
            },
            fail: () => {
                wx.login({
                    success: (res) => {
                        if (res.code) {
                            console.log('登录成功');
                        } else {
                            console.log(`获取用户登录态失败！${res.errMsg}`);
                        }
                    },
                });
            },
        });
    },
    getUserInfo: function(cb) {
        const that = this;
        if (this.globalData.userInfo) {
            typeof cb === 'function' && cb(this.globalData.userInfo);
        } else {
            // 调用登录接口
            wx.getUserInfo({
                withCredentials: false,
                success: (res) => {
                    that.globalData.userInfo = res.userInfo;
                    typeof cb === 'function' && cb(that.globalData.userInfo);
                },
            });
        }
    },
    globalData: {
        navToFolder: null,
    },
});

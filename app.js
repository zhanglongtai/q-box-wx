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
    globalData: {
        navToFolder: null,
    },
});

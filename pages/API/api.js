import { COMMON_URL } from './url';

function getOpenid(code) {
    const appid = 'wx02550cb36b08d046';
    const secret = 'e56f85b8ca67ba5bb2ab84c43e3f1dda';
    return `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`;
}

function getFileList() {
    return `${COMMON_URL}/fileList`;
}

function getSharedList() {
    return `${COMMON_URL}/sharedList`;
}

function getCheckList() {
    return `${COMMON_URL}/checkList`;
}

function getCommentList() {
    return `${COMMON_URL}/commentList`;
}

function addComment() {
    return `${COMMON_URL}/commentList`;
}

function uploadFile() {
    return `${COMMON_URL}/upload`;
}

function getPieChartURL() {
    return `${COMMON_URL}/storage/pieChart`;
}

function getLineChartURL(timeRange) {
    return `${COMMON_URL}/storage/lineChart/${timeRange}`;
}

function getBalance(userid) {
    return `${COMMON_URL}/balance/${userid}`;
}

function getUsage(userid) {
    return `${COMMON_URL}/usage/${userid}`;
}

function getPaymentArgs() {
    return `${COMMON_URL}/payment`;
}

function getBillList(userid) {
    return `${COMMON_URL}/billList/${userid}`;
}

function getMessageList() {
    return `${COMMON_URL}/message`;
}

export {
    COMMON_URL,
    getOpenid,
    getFileList,
    getSharedList,
    getCheckList,
    getCommentList,
    addComment,
    uploadFile,
    getPieChartURL,
    getLineChartURL,
    getBalance,
    getUsage,
    getPaymentArgs,
    getBillList,
    getMessageList,
};

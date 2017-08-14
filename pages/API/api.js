import { COMMON_URL } from './url';

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

export {
    COMMON_URL,
    getFileList,
    getSharedList,
    getCheckList,
    getCommentList,
    addComment,
    uploadFile,
};

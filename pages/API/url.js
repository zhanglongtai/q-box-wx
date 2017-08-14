let type = 'dev';
// let type = 'dev_local';

let COMMON_URL;
switch (type) {
    case 'dev':
        COMMON_URL = 'https://38810967.qcloud.la';
        break;
    case 'dev_local':
        COMMON_URL = 'http://localhost:8000';
        break;
    default:
        COMMON_URL = 'http://localhost:8000';
        break;
}

export {
    COMMON_URL,
};

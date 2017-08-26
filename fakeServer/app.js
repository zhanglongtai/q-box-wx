const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const upload = multer({
    dest: 'uploads/',
    limits: {
        fieldSize: 10 * 1024 * 1024,
    },
});

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

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         console.log(`${__dirname}\\uploads`);
//         cb(null, `${__dirname}\\uploads`);
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.filename);
//     },
// });

// const upload = multer({ storage });

const app = express();

app.set('port', (process.env.PORT || 8000));

// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('files'));

app.get('/', (request, response) => {
    response.send('hello world');
});

app.get('/fileList', (request, response) => {
    function getImgURL(fileType) {
        return `/asset/icons/${fileType}.svg`;
    }

    const data = {
        list: [
            {
                name: 'dir1',
                uuid: 1,
                type: 'folder',
                imgURL: getImgURL('folder'),
                nodes: [
                    {
                        name: 'dir2',
                        uuid: 5,
                        type: 'folder',
                        imgURL: getImgURL('folder'),
                        nodes: [
                            {
                                name: 'dir3',
                                uuid: 7,
                                type: 'folder',
                                imgURL: getImgURL('folder'),
                                nodes: [
                                    {
                                        name: 'dir4',
                                        uuid: 8,
                                        type: 'folder',
                                        imgURL: getImgURL('folder'),
                                        nodes: [],
                                    },
                                    {
                                        name: 'dir5',
                                        uuid: 9,
                                        type: 'folder',
                                        imgURL: getImgURL('folder'),
                                        nodes: [
                                            {
                                                name: 'file2',
                                                uuid: 10,
                                                type: 'pdf',
                                                imgURL: getImgURL('pdf'),
                                                size: 1.2,
                                                unit: 'MB',
                                                time: '2017-07-15 12:00',
                                                url: '',
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        name: 'file1',
                        uuid: 6,
                        type: 'pdf',
                        imgURL: getImgURL('pdf'),
                        size: 1.22,
                        unit: 'MB',
                        time: '2017-07-15 12:00',
                        url: '',
                    },
                ],
            },
            {
                name: '计算流体力学-差分方法的原理和应用.pdf',
                uuid: 2,
                type: 'pdf',
                imgURL: getImgURL('pdf'),
                size: 6.51,
                unit: 'MB',
                time: '2017-07-14 12:00',
                url: `${COMMON_URL}/计算流体力学-差分方法的原理和应用.pdf`,
            },
            {
                name: 'cfd.pdf',
                uuid: 11,
                type: 'pdf',
                imgURL: getImgURL('pdf'),
                size: 6.51,
                unit: 'MB',
                time: '2017-06-15 12:00',
                url: `${COMMON_URL}/cfd.pdf`,
            },
            {
                name: 'ug.pdf',
                uuid: 12,
                type: 'pdf',
                imgURL: getImgURL('pdf'),
                size: 869,
                unit: 'KB',
                time: '2017-06-15 12:00',
                url: `${COMMON_URL}/ug.pdf`,
            },
            {
                name: 'test.txt',
                uuid: 3,
                type: 'text',
                imgURL: getImgURL('text'),
                size: 0.01,
                unit: 'KB',
                time: '2017-07-15 13:00',
                url: `${COMMON_URL}/test.txt`,
            },
            {
                name: 'xiaohuolong.jpg',
                uuid: 4,
                type: 'jpg',
                imgURL: getImgURL('image'),
                size: 33.12,
                unit: 'KB',
                time: '2017-07-15 12:00',
                url: `${COMMON_URL}/xiaohuolong.jpg`,
            },
            {
                name: 'I Do It For You.mp3',
                uuid: 13,
                type: 'mp3',
                imgURL: getImgURL('audio'),
                size: 6.14,
                unit: 'MB',
                time: '2017-07-15 12:00',
                url: `${COMMON_URL}/I Do It For You.mp3`,
            },
            {
                name: 'test video.mp4',
                uuid: 14,
                type: 'mp4',
                imgURL: getImgURL('video'),
                size: 29.08,
                unit: 'MB',
                time: '2017-07-15 12:00',
                url: `${COMMON_URL}/test video.mp4`,
            },
            {
                name: 'matrix.mp4',
                uuid: 14,
                type: 'mp4',
                imgURL: getImgURL('video'),
                size: 5.05,
                unit: 'MB',
                time: '2017-07-15 12:00',
                url: `${COMMON_URL}/matrix.mp4`,
            },
        ],
    };

    // 0 --- return a error status
    // 1 --- return a empty list
    // 2 --- return a normal list
    // 3 --- don't return a response
    const testCode = 2;
    switch (testCode) {
        case 0:
            response.status(401).end();
            break;
        case 1:
            response.json({ list: [] });
            break;
        case 2:
            response.json(data);
            break;
        case 3:
            console.log('holding');
            break;
        default:
            break;
    }
});

app.get('/sharedList', (request, response) => {
    const data = {
        list: [
            {
                name: 'dir1',
                uuid: 1,
                type: 'folder',
                owner: true,
                sharedTime: '2017-07-15 12:00',
            },
            {
                name: '汇报ppt.ppt',
                uuid: 2,
                type: 'ppt',
                sharedTime: '2017-07-15 12:00',
            },
            {
                name: 'dir2',
                uuid: 1,
                type: 'folder',
                owner: false,
                sharedTime: '2017-07-15 12:00',
            },
        ],
    };

    // 0 --- return a error status
    // 1 --- return a empty list
    // 2 --- return a normal list
    // 3 --- don't return a response
    const testCode = 2;
    switch (testCode) {
        case 0:
            response.status(401).end();
            break;
        case 1:
            response.json({ list: [] });
            break;
        case 2:
            response.json(data);
            break;
        case 3:
            console.log('holding');
            break;
        default:
            break;
    }
});

const commentList = [];
app.get('/commentList', (request, response) => {
    const data = {
        list: commentList,
    };

    // 0 --- return a error status
    // 1 --- return a empty list
    // 2 --- return a normal list
    // 3 --- don't return a response
    const testCode = 2;
    switch (testCode) {
        case 0:
            response.status(401).end();
            break;
        case 1:
            response.json({ list: [] });
            break;
        case 2:
            response.json(data);
            break;
        case 3:
            console.log('holding');
            break;
        default:
            break;
    }
});
app.post('/commentList', (request, response) => {
    const { comment, username, avatarUrl, time } = request.body;
    commentList.push({
        content: comment,
        username,
        avatarUrl,
        time,
    });

    response.status(200).end();
});

app.get('/checkList', (request, response) => {
    const data = {
        memberList: [
            {
                username: 'aaa',
                avatarUrl: '/asset/ic_person_48px.svg',
                owner: true,
            },
            {
                username: 'bbb',
                avatarUrl: '/asset/ic_person_48px.svg',
                owner: false,
                readOnly: true,
            },
            {
                username: 'ccc',
                avatarUrl: '/asset/ic_person_48px.svg',
                owner: false,
                readOnly: false,
            },
            {
                username: 'ddd',
                avatarUrl: '/asset/ic_person_48px.svg',
                owner: false,
                readOnly: true,
            },
            {
                username: 'eee',
                avatarUrl: '/asset/ic_person_48px.svg',
                owner: false,
                readOnly: false,
            },
            {
                username: 'fff',
                avatarUrl: '/asset/ic_person_48px.svg',
                owner: false,
                readOnly: true,
            },
        ],
        activityList: [
            {
                content: '创建了文件XXX',
                username: 'aaa',
                time: '2017-08-01 12:00',
                avatarUrl: '/asset/ic_person_48px.svg',
                actionType: 'create',
            },
            {
                content: '修改了文件XXX',
                username: 'bbb',
                time: '2017-08-01 12:00',
                avatarUrl: '/asset/ic_person_48px.svg',
                actionType: 'update',
            },
        ],
    };

    // 0 --- return a error status
    // 1 --- return a empty list
    // 2 --- return a normal list
    // 3 --- don't return a response
    const testCode = 2;
    switch (testCode) {
        case 0:
            response.status(401).end();
            break;
        case 1:
            response.json({ list: [] });
            break;
        case 2:
            response.json(data);
            break;
        case 3:
            console.log('holding');
            break;
        default:
            break;
    }
});

app.post('/upload', upload.single('file'), (request, response) => {
    console.log(request.body);
    console.log(request.file);
    response.json({ data: 'ok' });
});

app.get('/storage/pieChart', (request, response) => {
    const data = {
        imgURL: `${COMMON_URL}/storage/pie-chart.png`,
    };

    response.json(data);
});

app.get('/storage/lineChart/:days', (request, response) => {
    switch (request.params.days) {
        case '7': {
            const data = {
                imgURL: `${COMMON_URL}/storage/line-chart-7.png`,
            };
            response.json(data);
            break;
        }
        case '30': {
            const data = {
                imgURL: `${COMMON_URL}/storage/line-chart-30.png`,
            };
            response.json(data);
            break;
        }
        default: {
            const data = {
                imgURL: `${COMMON_URL}/storage/line-chart-7.png`,
            };
            response.json(data);
            break;
        }
    }
});

app.get('/balance/:id', (request, response) => {
    const data = {
        value: '50.00',
    };

    // 0 --- return a error status
    // 1 --- return a normal response
    // 2 --- don't return a response
    const testCode = 1;
    switch (testCode) {
        case 0:
            response.status(401).end();
            break;
        case 1:
            response.json(data);
            break;
        case 2:
            console.log('holding');
            break;
        default:
            break;
    }
});

app.get('/usage/:id', (request, response) => {
    const data = {
        value: '20.00',
    };

    // 0 --- return a error status
    // 1 --- return a normal response
    // 2 --- don't return a response
    const testCode = 1;
    switch (testCode) {
        case 0:
            response.status(401).end();
            break;
        case 1:
            response.json(data);
            break;
        case 2:
            console.log('holding');
            break;
        default:
            break;
    }
});

app.get('/billList/:id', (request, response) => {
    const data = {};
    switch (request.query.date) {
        case '2017-07':
            data.list = [
                {
                    time: '2017-07-01 22:00',
                    amount: '20.00',
                    type: 'charge',
                    text: '充值',
                },
            ];
            break;
        case '2017-08':
            data.list = [
                {
                    time: '2017-08-01 00:00',
                    amount: '-15.00',
                    type: 'consume',
                    text: '当月结算',
                },
                {
                    time: '2017-08-01 22:00',
                    amount: '20.00',
                    type: 'charge',
                    text: '充值',
                },
                {
                    time: '2017-08-03 10:00',
                    amount: '-1.00',
                    type: 'consume',
                    text: '购买版本控制服务',
                },
            ];
            break;
        default:
            data.list = [];
            break;
    }

    // 0 --- return a error status
    // 1 --- return a empty list
    // 2 --- return a normal list
    // 3 --- don't return a response
    const testCode = 2;
    switch (testCode) {
        case 0:
            response.status(401).end();
            break;
        case 1:
            response.json({ list: [] });
            break;
        case 2:
            response.json(data);
            break;
        case 3:
            console.log('holding');
            break;
        default:
            break;
    }
});

app.get('/message', (request, response) => {
    function getImgURL(msgType) {
        return `/asset/profile/message/${msgType}.svg`;
    }

    const data = {
        list: [
            {
                unread: true,
                msgID: 1,
                time: '2017-08-19 10:54',
                title: '消息主题',
                content: '长信息测试长信息测试长信息测试长信息测试长信息测试长信息测试长信息测试长信息测试长信息测试长信息测试长信息测试长信息测试',
                type: 'system',
                imgURL: getImgURL('system'),
            },
            {
                unread: true,
                msgID: 2,
                time: '2017-08-18 10:54',
                title: '消息主题',
                content: '消息内容',
                type: 'modify',
                imgURL: getImgURL('modify'),
            },
            {
                unread: false,
                msgID: 3,
                time: '2017-08-10 10:00',
                title: '消息主题',
                content: '消息内容',
                type: 'comment',
                imgURL: getImgURL('comment'),
            },
            {
                unread: false,
                msgID: 4,
                time: '2017-08-09 10:00',
                title: '消息主题',
                content: '消息内容',
                type: 'charge',
                imgURL: getImgURL('charge'),
            },
            {
                unread: false,
                msgID: 5,
                time: '2017-08-08 10:00',
                title: '消息主题',
                content: '消息内容',
                type: 'lottery',
                imgURL: getImgURL('lottery'),
            },
        ],
    };

    // 0 --- return a error status
    // 1 --- return a empty list
    // 2 --- return a normal list
    // 3 --- don't return a response
    const testCode = 2;
    switch (testCode) {
        case 0:
            response.status(401).end();
            break;
        case 1:
            response.json({ list: [] });
            break;
        case 2:
            response.json(data);
            break;
        case 3:
            console.log('holding');
            break;
        default:
            break;
    }
});

app.listen(app.get('port'), () => {
    console.log(`Server started: http://localhost:${app.get('port')}/`);
});

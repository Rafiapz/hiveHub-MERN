"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.uploadSingleFile = exports.uploadSingleFilePost = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/posts');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});
const fileFilter = (req, file, callback) => {
    if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video'))
        callback(null, true);
    else
        callback(null, false);
};
const uploadSingleFilePost = (req, res, next) => {
    try {
        let type = '';
        if (req.params.type === 'image')
            type = 'image';
        else if (req.params.type === 'video')
            type = 'video';
        const upload = (0, multer_1.default)({
            storage: multer_1.default.memoryStorage(),
            limits: { fileSize: 10 * 1024 * 1024 },
            fileFilter: fileFilter
        }).single(type);
        upload(req, res, (err) => {
            if (err) {
                throw new Error(err);
            }
            next();
        });
    }
    catch (error) {
        console.log(error.message);
        // res.json({ status: 'failed', message: error.message })
    }
};
exports.uploadSingleFilePost = uploadSingleFilePost;
const uploadSingleFile = (req, res, next) => {
    try {
        let type = '';
        if (req.params.type === 'image')
            type = 'image';
        else if (req.params.type === 'video')
            type = 'video';
        const upload = (0, multer_1.default)({
            storage: storage,
            limits: { fileSize: 10 * 1024 * 1024 },
            fileFilter: fileFilter
        }).single(type);
        upload(req, res, (err) => {
            if (err) {
                throw new Error(err);
            }
            next();
        });
    }
    catch (error) {
        console.log(error.message);
        // res.json({ status: 'failed', message: error.message })
    }
};
exports.uploadSingleFile = uploadSingleFile;
exports.upload = (0, multer_1.default)({ storage: storage });

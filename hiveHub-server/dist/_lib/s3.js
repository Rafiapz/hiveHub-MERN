"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.getObjectSignedUrl = exports.uploadToS3Bucket = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const region = process.env.AWS_S3_REGION;
const bucketName = ((_a = process.env) === null || _a === void 0 ? void 0 : _a.AWS_S3_BUCKET_NAME) || "";
const accessKeyId = ((_b = process === null || process === void 0 ? void 0 : process.env) === null || _b === void 0 ? void 0 : _b.AWS_S3_ACCESS_KEY) || "";
const secretAccessKey = ((_c = process === null || process === void 0 ? void 0 : process.env) === null || _c === void 0 ? void 0 : _c.AWS_s3_SECRET_ACESS_KEY) || "";
const s3 = new client_s3_1.S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});
const uploadToS3Bucket = (file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileName = (file === null || file === void 0 ? void 0 : file.originalname) + uniqueSuffix || '';
        const params = {
            Body: file === null || file === void 0 ? void 0 : file.buffer,
            Bucket: bucketName,
            Key: fileName
        };
        const command = new client_s3_1.PutObjectCommand(params);
        yield s3.send(command);
        console.log("posted");
        return fileName;
    }
    catch (error) {
        console.log(error);
    }
});
exports.uploadToS3Bucket = uploadToS3Bucket;
const getObjectSignedUrl = (key) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    if (!key) {
        throw new Error('No key found');
    }
    const bucketName = (_d = process.env) === null || _d === void 0 ? void 0 : _d.AWS_S3_BUCKET_NAME;
    const params = {
        Bucket: bucketName,
        Key: key,
    };
    const command = new client_s3_1.GetObjectCommand(params);
    const seconds = 60 * 60 * 60;
    const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3, command, { expiresIn: seconds });
    return url;
});
exports.getObjectSignedUrl = getObjectSignedUrl;
const deleteFile = (fileName) => {
    const deleteParams = {
        Bucket: bucketName,
        Key: fileName,
    };
    return s3.send(new client_s3_1.DeleteObjectCommand(deleteParams));
};
exports.deleteFile = deleteFile;

import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { randomBytes } from "crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

const region = process.env.AWS_S3_REGION;
const bucketName = process.env?.AWS_S3_BUCKET_NAME || "";
const accessKeyId = process?.env?.AWS_S3_ACCESS_KEY || "";
const secretAccessKey = process?.env?.AWS_s3_SECRET_ACESS_KEY || "";

const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});

export const uploadToS3Bucket = async (file: any) => {
    try {

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const fileName = file?.originalname + uniqueSuffix || ''

        const params = {
            Body: file?.buffer,
            Bucket: bucketName,
            Key: fileName
        };

        const command = new PutObjectCommand(params);

        await s3.send(command);
        console.log("posted");
        return fileName
    } catch (error) {
        console.log(error);
    }
};

export const getObjectSignedUrl = async (key: string) => {
    try {
        const bucketName = process.env?.AWS_S3_BUCKET_NAME;

        const params = {
            Bucket: bucketName,
            Key: key,
        };

        const command = new GetObjectCommand(params);
        const seconds = 60 * 60 * 60;
        const url = await getSignedUrl(s3, command, { expiresIn: seconds });

        return url;
    } catch (error) {
        console.log(error);
    }
}

export const deleteFile = (fileName: any) => {
    const deleteParams = {
        Bucket: bucketName,
        Key: fileName,
    };

    return s3.send(new DeleteObjectCommand(deleteParams));
};

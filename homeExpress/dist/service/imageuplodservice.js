"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const cloudinary = require('cloudinary');
const cloudinary_1 = __importDefault(require("cloudinary"));
//const multer = require('multer');
const multer_1 = __importDefault(require("multer"));
//const fs = require('fs');
const fs_1 = __importDefault(require("fs"));
require('dotenv/config');
// Local storage configuration
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/upload/');
    },
    filename: function (req, file, cb) {
        /**
         * If files has the same name it will be identified by the random string
         */
        let randomString = Math.random().toString(36);
        cb(null, randomString + file.originalname);
    },
});
const uploadLocalStorage = multer_1.default({ storage }).fields([
    { name: "meeting_image" }, { name: "camp_image" }, { name: "act_image" }, { name: "itemType_image" }
]);
// Cloudinary configuration
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});
/**
 * function to store files in cloudinary website
 * @param path: path for required image in the server
 * @param tag: string to identify type of image
 */
function uploadCloudinary(path, tag) {
    // create unique name for image to store in cloudinary
    let randomString = Math.random().toString(36);
    const uniqueFilename = `${randomString}-${new Date().toISOString()}`;
    return new Promise((resolve, reject) => {
        cloudinary_1.default.v2.uploader.upload(path, { public_id: `${tag}/${uniqueFilename}`, tags: tag }, // directory and tags are optional
        (error, image) => {
            // remove file from server
            fs_1.default.unlinkSync(path);
            if (error)
                reject(error);
            resolve({
                url: image.url,
                id: image.public_id,
            });
        });
    });
}
/**
 * function to delete files in cloudinary website
 * @param image: unique name to identify image to delete
 */
function destroyCloudinary(image) {
    cloudinary_1.default.v2.uploader.destroy(image, function (error, result) {
        console.log(result, error);
    });
}
//module.exports = {
//	uploadCloudinary,
//	uploadLocalStorage,
//destroyCloudinary,
//};
exports.default = { uploadCloudinary,
    uploadLocalStorage,
    destroyCloudinary, };
//# sourceMappingURL=imageuplodservice.js.map
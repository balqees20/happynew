//const cloudinary = require('cloudinary');
import cloudinary from "cloudinary";
//const multer = require('multer');
import multer from "multer";
//const fs = require('fs');
import fs from "fs";
require('dotenv/config');

// Local storage configuration

const storage = multer.diskStorage({
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

const uploadLocalStorage = multer({ storage }).fields([
	{ name: "meeting" },
]);

// Cloudinary configuration
cloudinary.v2.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_KEY,
	api_secret: process.env.CLOUD_SECRET,
});

/**
 * function to store files in cloudinary website
 * @param path: path for required image in the server
 * @param tag: string to identify type of image
 */
function uploadCloudinary(path:any, tag:any) {
    
	// create unique name for image to store in cloudinary
	let randomString = Math.random().toString(36);
	const uniqueFilename = `${randomString}-${new Date().toISOString()}`;

	return new Promise((resolve, reject) => {
		cloudinary.v2.uploader.upload(
			path,
			{ public_id: `${tag}/${uniqueFilename}`, tags: tag }, // directory and tags are optional
			 (error:Error, image:any)=> {
				// remove file from server
				fs.unlinkSync(path);
                if (error) reject(error);
                
				resolve({
					url: image.url,
					id: image.public_id,
				});
			}
		);
	});
}

/**
 * function to delete files in cloudinary website
 * @param image: unique name to identify image to delete
 */

function destroyCloudinary(image:any) {
	cloudinary.v2.uploader.destroy(image, function (error:Error, result:any) {
		console.log(result, error);
	});
}

//module.exports = {
//	uploadCloudinary,
//	uploadLocalStorage,
	//destroyCloudinary,
//};
export default {uploadCloudinary,
				uploadLocalStorage,
			    destroyCloudinary}


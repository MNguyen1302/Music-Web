require('dotenv').config();

const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

module.exports.upload = (file, folder, type, resolve) => {
    cloudinary.uploader.upload(file.path, { folder: folder, user_filename: true, unique_filename: false, resource_type: type}, (err, result) => {
        if(err) resolve(err);
        else {
            fs.unlinkSync(file.path);
            resolve({
                url: result.url,
                public_id: result.public_id
            })
        }
    })
}
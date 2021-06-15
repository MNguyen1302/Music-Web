const multer = require('multer');
const path = require('path');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    },
    filter: (req, file, cb) => {
        const ext = file.originalname;

        if(file.fieldname === 'image' || file.fieldname === 'avatar') {
            if(ext === '.png' || ext === '.jpeg' || ext === '.jpg') {
                cb(null, true)
            }
            cb(null, false)
        }
        else {
            if(ext === '.mp3') {
                cb(null, true)
            }
            cb(null, false)
        }
    }
})

const upload = multer({
    storage: fileStorage
}).fields([{name: 'avatar'}, {name: 'image'}, {name: 'audio'}])

module.exports = upload
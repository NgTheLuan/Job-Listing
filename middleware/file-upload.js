import multer from 'multer';
import uuid from 'uuid/v1';

const MINE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
}

export const FileUpload = multer({
    limits: 50000,
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, 'uploads/image')
        },
        filename: (req, file, callback) => {
            const ext = MINE_TYPE_MAP[file.mimetype];
            callback(null, uuid() + '.' + ext)
        }

    }),
    fileFilter: (req, file, callback) => {
        const isValid = !!MINE_TYPE_MAP[file.mimetype];
        let error = isValid ? null : new Error('Invalid file type!');
        callback(error, isValid);
    }
})
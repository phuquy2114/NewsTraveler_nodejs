import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { paramMissingError } from '../shared/constants';
import ThumbnailDao from 'src/dao/thumbnailDAO';
import { Thumbnail } from 'src/entity/Thumbnail';

const fs = require('fs');
const multer = require('multer');
const path = require('path');

const storages = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, 'src/public/images');
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, file.originalname);
    }
});

interface MulterRequest extends Request {
    file: any;
}

const router = Router();
const photoDao:ThumbnailDao = new ThumbnailDao(); 

// inside multer({}), file upto only 1MB can be uploaded
const upload = multer({
    storage: storages,
    limits : {fileSize : 1000000}
});

router.get('/', async (req: Request, res: Response) => {
    var data = await photoDao.getAll();
    return res.status(OK).json(data);
});

export default router;

import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import { paramMissingError } from '@shared/constants';
import { News } from 'src/entity/news';
import {BaseResponse} from 'src/entity/BaseResponse'
import NewsDAO from 'src/dao/newsDAO'

interface MulterRequest extends Request {
    file: any;
}

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
const upload = multer({ storage: storages });

const dataResponse: BaseResponse = new BaseResponse();
const newsDAO : NewsDAO = new NewsDAO()


const router = Router();
router.post('/create-news', upload.single('thumbnail'),upload.single('thumbnailone'),
upload.single('thumbnailtwo'),upload.single('thumbnailthree'), async (req: Request, res: Response) => {

    console.log('ubhiuhui', req.body);

    console.log('huhuhuhuh', req.body.file);

    if (!req.body) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }

     // add news here
     const news: News = new News();
     news.title = req.body.title;
     news.decscription = req.body.decscription;

     news.decscriptionone = req.body.decscriptionone;

     news.decscriptiontwo = req.body.decscriptiontwo;

     news.decscriptionthree = req.body.decscriptionthree;

     console.log((req as MulterRequest).file.originalname);
     news.thumbnail = (req as MulterRequest).file.originalname;

     console.log((req as MulterRequest).file.originalname);
     news.thumbnailone = (req as MulterRequest).file.originalname;

     console.log((req as MulterRequest).file.originalname);
     news.thumbnailtwo = (req as MulterRequest).file.originalname;

     console.log((req as MulterRequest).file.originalname);
     news.thumbnailthree = (req as MulterRequest).file.originalname;

     try {
        const insertValue = await newsDAO.insert(news);
    } catch (error) {
        dataResponse.status = BAD_REQUEST;
        dataResponse.data = {};
        dataResponse.message = error.message;
        return res.status(BAD_REQUEST).json(dataResponse);
    }

    dataResponse.status = CREATED;
    dataResponse.data = news;
    dataResponse.message = 'Successfull';
    return res.status(CREATED).json(dataResponse);

});

router.get('/all', async (req: Request, res: Response) => {
    const insertValue = await newsDAO.getAll();
    dataResponse.status = 200;
    dataResponse.data = insertValue;
    dataResponse.message = 'Successfull';
    return res.status(OK).json(dataResponse);
});

export default router;

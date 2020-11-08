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
        cb(null, 'upload_at_' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storages });

const dataResponse: BaseResponse = new BaseResponse();
const newsDAO : NewsDAO = new NewsDAO()

const router = Router();

var cpUpload = upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'thumbnailone', maxCount: 1 }, 
{ name: 'thumbnailtwo', maxCount: 1 }, { name: 'thumbnailthree', maxCount: 1 }])
router.post('/create-news', cpUpload, async (req : Request, res) : Promise<any> => {

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

    console.log((req as any).files);

     news.thumbnail = (req as any).files.thumbnail[0].originalname;

     news.thumbnailone = (req as any).files.thumbnailone[0].originalname;

     news.thumbnailtwo = (req as any).files.thumbnailtwo[0].originalname;

     news.thumbnailthree = (req as any).files.thumbnailthree[0].originalname;

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

router.post('/edit-news', cpUpload, async (req : Request, res) : Promise<any> => {

    console.log('ubhiuhui', req.body);

    console.log('huhuhuhuh', req.body.file);

    if (!req.body) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }

     // add news here
     const news: News = new News();
     news.id = req.body.id;
     news.title = req.body.title;
     news.decscription = req.body.decscription;

     news.decscriptionone = req.body.decscriptionone;

     news.decscriptiontwo = req.body.decscriptiontwo;

     news.decscriptionthree = req.body.decscriptionthree;

    console.log((req as any).files);

     news.thumbnail = (req as any).files.thumbnail[0].originalname;

     news.thumbnailone = (req as any).files.thumbnailone[0].originalname;

     news.thumbnailtwo = (req as any).files.thumbnailtwo[0].originalname;

     news.thumbnailthree = (req as any).files.thumbnailthree[0].originalname;

     try {
        const insertValue = await newsDAO.update(news);
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

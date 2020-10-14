import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import { BaseResponse } from '../entity/BaseResponse';
import { User } from '../entity/User';
import UserDAO from '../dao/userDAO';
import { paramMissingError } from '../shared/constants';

const dataResponse: BaseResponse = new BaseResponse();
const userDAO: UserDAO = new UserDAO();
// Init shared
const router = Router();

/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
    const insertValue = await userDAO.getAll();
    dataResponse.status = 200;
    dataResponse.data = insertValue;
    dataResponse.message = 'Successfull';
    return res.status(OK).json(dataResponse);
});


router.post('/register', async (req: Request, res: Response) => {
    console.log('ubhiuhui', req.body);


    if (!req.body) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }

    // add user here
    const users: User = new User();
    users.id = makeid(10);
    users.name = req.body.name;
    users.phone = req.body.phone.split(' ').join('');
    users.uniqueAppID = "com.primarynet.qrinout"
    users.password = req.body.password;
    users.deviceToken = req.body.deviceToken;

    try {
        const insertValue = await userDAO.insert(users);
    } catch (error) {
        dataResponse.status = OK;
        dataResponse.data = {};
        dataResponse.message = 'Email đã được sử dụng';
        return res.status(OK).json(dataResponse);
    }

    dataResponse.status = OK;
    dataResponse.data = users;
    dataResponse.message = 'Successfull';
    return res.status(CREATED).json(dataResponse);
});


router.get('/', async (req: Request, res: Response) => {

    if (!req.query) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }

    var CryptoJS = require("crypto-js");
    var hash = CryptoJS.HmacSHA256("infra9112003", "infra9112003").toString();
    console.log(hash);

    var prmHash = req.query.prmHash as string;

    if (hash !== prmHash) {
        dataResponse.status = BAD_REQUEST;
        dataResponse.message = 'ERROR HASH NOT MATCHING';
        return res.status(OK).send(dataResponse);;
    }

    var prmCmd = req.query.prmCmd as string;

    var id = req.query.prmEmployeeID as string;

    var getInfor: User;
    try {
        getInfor = await userDAO.getUserByID(id) as User;
    } catch (error) {
        //If not found, send a 404 response
        dataResponse.status = BAD_REQUEST;
        dataResponse.data = {};
        dataResponse.message = 'ERROR ID EMPLOYEE NOT FOUND';
        return res.status(OK).send(dataResponse);;
    }

    if (getInfor === undefined) {
        dataResponse.status = BAD_REQUEST;
        dataResponse.data = {};
        dataResponse.message = 'ERROR ID EMPLOYEE NOT FOUND';
        return res.status(OK).send(dataResponse);;
    }

    var prmName = req.query.prmName as string;
    if (getInfor.name !== prmName) {
        dataResponse.status = BAD_REQUEST;
        dataResponse.data = {};
        dataResponse.message = 'ERROR NAME';
        return res.status(OK).send(dataResponse);;
    }

    var prmUniqueAppID = req.query.prmUniqueAppID as string;
    if (!prmUniqueAppID) {
        dataResponse.status = BAD_REQUEST;
        dataResponse.data = {};
        dataResponse.message = 'ERROR IMEI';
        return res.status(OK).send(dataResponse);
    }

    var prmTel = req.query.prmTel as string;
    var employeeTel = getInfor.phone.split(' ').join('');
    var employeePrmTel = prmTel.split(' ').join('');
    if (employeeTel !== employeePrmTel) {
        dataResponse.status = BAD_REQUEST;
        dataResponse.data = {};
        dataResponse.message = 'ERROR PHONE';
        return res.status(OK).send(dataResponse);;
    }

    if (prmCmd === "EmployeeRegistration") {

        var prmUniqueAppID = req.query.prmUniqueAppID as string;
        if (!prmUniqueAppID) {
            dataResponse.status = BAD_REQUEST;
            dataResponse.data = {};
            dataResponse.message = 'ERROR IMEI';
            return res.status(OK).send(dataResponse);
        }

        getInfor.uniqueAppID = prmUniqueAppID;

        try {
            const insertValue = await userDAO.save(getInfor);
        } catch {
            dataResponse.status = BAD_REQUEST;
            dataResponse.data = {};
            dataResponse.message  = 'ERROR NO UPDATE ';
            return res.status(OK).send(dataResponse);
        }

        dataResponse.status = OK;
        dataResponse.data = {};
        dataResponse.message = 'Successfull';
        return res.status(OK).json(dataResponse);
    }


});

/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post('/add', async (req: Request, res: Response) => {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    //add user here
    return res.status(CREATED).end();
});


/******************************************************************************
 *                       Update - "PUT /api/users/update"
 ******************************************************************************/

router.put('/update', async (req: Request, res: Response) => {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    user.id = Number(user.id);
    //updateUser
    return res.status(OK).end();
});


/******************************************************************************
 *                    Delete - "DELETE /api/users/delete/:id"
 ******************************************************************************/

router.delete('/delete/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    //delete user
    return res.status(OK).end();
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;


function makeid(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

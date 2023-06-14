import * as argon from "argon2";
import {Request, Response} from "express";
import {ParamsDictionary} from "express-serve-static-core";
import {ParsedQs} from "qs";
import User from "../database/models/User";
import Controller from "./Controller";

interface RegisterData {
    email: string;
    password: string;
    tou: string;
}

class RegisterController extends Controller {
    async post(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {

        let data: RegisterData = req.body;
        let hash = await argon.hash(data.password);
        try {

            const id = await User.create({email: data.email, password: hash, roleId: 1});

            res.status(200).json({status: 'ok', message: 'Pomyślnie założono konto.'});

        }catch(err: any) {

            if(err.parent.code === '23505')
                res.status(200).json({status: 'error', message: 'Użytkownik z podanym Email już istnieje!'});
            else
                res.status(500).json({status: 'error', message: 'Internal server error.'});

        }
    }
}

export default new RegisterController();
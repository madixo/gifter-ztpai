import * as argon from "argon2";
import {Request, Response} from "express";
import {ParamsDictionary} from "express-serve-static-core";
import * as jwt from 'jsonwebtoken';
import {ParsedQs} from "qs";
import Role from "../database/models/Role";
import User from "../database/models/User";
import Controller from "./Controller";

interface LoginData {
    email: string;
    password: string;
}

class LoginController extends Controller {
    async post(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {

        const data: LoginData = req.body;

        try {

            const user = await User.findOne({where: {email: data.email}, include: Role});

            if(user == null) {
                res.status(200).json({status: 'error', message: 'Email lub hasło nieprawidłowe!'});
                return;
            }

            if(await argon.verify(user.password, data.password))
                res.status(200).json({
                    status: 'ok',
                    message: 'Pomyślnie zalogowano!',
                    token: jwt.sign({
                            email: user.email,
                            role: user.role.name
                        },
                        process.env.SECRET,
                        {
                            subject: user.id.toString()
                    })
                });
            else
                res.status(200).json({status: 'error', message: 'Email lub hasło nieprawidłowe!'});

        } catch(err: any) {

            super.internalServerError(err, res);

        }

    }
};

export default new LoginController();
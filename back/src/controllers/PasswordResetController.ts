import {hash} from "argon2";
import {Request, Response} from "express";
import {ParamsDictionary} from "express-serve-static-core";
import {ParsedQs} from "qs";
import PasswordReset from "../database/models/PasswordReset";
import User from "../database/models/User";
import Controller from "./Controller";

class PasswordResetController extends Controller {

    async post(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {

        const {id, password} = req.body;

        try {

            const request = await PasswordReset.findOne({
                where: {
                    id: id
                },
                include: User
            });

            if(request == null) {
                res.status(400).json({status: 'error', message: 'Błędne id!'});
                return;
            }

            request.user.password = await hash(password);

            request.user.save();

            res.status(200).json({status: 'ok', message: 'Pomyślnie zmieniono hasło!'});

        }catch(err) {

            super.internalServerError(err, res);

        }

    }

}

export default new PasswordResetController();
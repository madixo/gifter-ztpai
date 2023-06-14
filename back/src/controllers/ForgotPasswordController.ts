import {randomUUID} from "crypto";
import {Request, Response} from "express";
import {ParamsDictionary} from "express-serve-static-core";
import {ParsedQs} from "qs";
import PasswordReset from "../database/models/PasswordReset";
import User from "../database/models/User";
import Controller from "./Controller";
async function sendResponse(res: Response) {
    res.status(200).json({status: 'ok', message: 'Jeśli email jest powiązany z kontem, wysłano na niego link do resetu hasła!'})
}
class ForgotPasswordController extends Controller {

    async post(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const {email} = req.body;

        try {

            const user = await User.findOne({
                where: {
                    email: email
                }
            });

            if(user === null) {
                sendResponse(res);
                return;
            }

            const [request, replaced] = await PasswordReset.upsert({
                id: randomUUID(),
                userId: user.id
            });

            console.log(replaced);

            res.status(200).json({status: 'ok', id: request.id});

        }catch(err) {

            super.internalServerError(err, res);

        }

    }
}

export default new ForgotPasswordController();
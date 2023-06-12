import * as argon from "argon2";
import * as jwt from 'jsonwebtoken';
import User from "../database/models/User";
import IController from "./IController";

interface LoginData {
    email: string;
    password: string;
}

export default <IController>{
    async post (req, res) {
        const data: LoginData = req.body;

        try {

            const user = await User.findOne({where: {email: data.email}});

            if(user == null) {
                res.status(200).json({status: 'error', message: 'Email lub hasło nieprawidłowe!'});
                return;
            }

            if(await argon.verify(user.password, data.password))
                res.status(200).json({status: 'ok', message: 'Pomyślnie zalogowano!', token: jwt.sign(user.id.toString(), process.env.SECRET)});
            else
                res.status(200).json({status: 'error', message: 'Email lub hasło nieprawidłowe!'});

        }catch(err: any) {

            console.log(err);
            res.status(500).json({status: 'error', message: 'Internal server error!'});

        }

    }
};

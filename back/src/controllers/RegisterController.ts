import * as argon from "argon2";
import User from "../database/models/User";
import IController from "./IController";

interface RegisterData {
    email: string;
    password: string;
    tou: string;
}

export default <IController>{
    async post(req, res) {
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
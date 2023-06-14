import {Request, Response} from "express";
import {ParamsDictionary} from "express-serve-static-core";
import {ParsedQs} from "qs";
import List from "../database/models/List";
import Controller from "./Controller";

class ListsController extends Controller {
    async get(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {

        const {id} = req.params;

        const parsedToken = super.verifyRequest(req, res);

        if(!parsedToken) return;

        try {

            const lists = await List.findAll({
                where: {ownerId: id}
            });

            res.status(200).json({status: 'ok', lists: lists.map(list => ({id: list.id, name: list.name, accessCode: list.accessCode}))});

        }catch(err: any) {

            super.internalServerError(err, res);

        }

    }

    async post(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {

        const {name} = req.body;

        const parsedToken = super.verifyRequest(req, res);

        if(!parsedToken) return;

        let list;

        for(let i = 0; i < 1000; i++) {

            try {

                list = await List.create({
                    name: name,
                    accessCode: Math.floor(Math.random() * 999999),
                    ownerId: Number.parseInt(parsedToken.sub as string)
                });

                break;

            }catch(err) {
                continue;
            }

        }

        if(list === undefined)
            super.internalServerError({}, res);
        else
            res.status(200).json({status: 'ok', message: 'Pomyślnie dodano listę!', list: {id: list.id, name: list.name, accessCode: list.accessCode}});

    }

    async delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {

        const {id} = req.params;
        const {ids} = req.body;

        const parsedToken = super.verifyRequest(req, res);

        if(!parsedToken) return;

        if(id) {

            try {

                const status = await List.destroy({
                    where: {
                        id: id,
                        ownerId: parsedToken.sub
                    },
                    cascade: true
                });

                if(status != 0)
                    res.status(200).json({status: 'ok', message: 'Pomyślnie usunięto listę!'});
                else
                    super.internalServerError({}, res);

            }catch(err) {

                super.internalServerError(err, res);

            }

        }else if(ids) {

            try {

                const status = await List.destroy({
                    where: {
                        id: ids,
                        ownerId: parsedToken.sub
                    },
                    cascade: true
                });

                if(status != 0)
                    res.status(200).json({status: 'ok', message: 'Pomyślnie usunięto listy!'});
                else
                    super.internalServerError({}, res);

            }catch(err) {

                super.internalServerError(err, res);

            }

        }

    }

}

export default new ListsController();
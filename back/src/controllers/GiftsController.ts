import {Request, Response} from "express";
import {ParamsDictionary} from "express-serve-static-core";
import {ParsedQs} from "qs";
import Gift from "../database/models/Gift";
import List from '../database/models/List';
import Controller from "./Controller";

interface PostRequest {
    listId: number;
    name: string;
    image: string;
    price?: number;
    description?: string;
}

interface GiftResponse {
    id: number;
    name: string;
    image: string;
    price?: number;
    description?: string;
    taken: boolean;
}

function giftMapper(gift: Gift): GiftResponse {

    return {id: gift.id, name: gift.name, image: gift.image, price: gift.price, description: gift.description, taken: gift.takenById !== null};

}

class GiftsController extends Controller {
    async get(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {

        const {id} = req.params;

        const parsedToken = super.verifyRequest(req, res);

        if(!parsedToken) return;

        let list;

        try {

            list = await List.findOne({
                where: {
                    id: id
                },
                include: {
                    model: Gift,
                    required: true
                }
            });

        } catch(err) {

            super.internalServerError(err, res);
            return;

        }

        if(list === null) {
            res.status(404).json({status: 'error', message: 'List not found!'});
            return;
        }

        if(parsedToken.sub !== list.ownerId.toString()) {
            res.status(401).json({status: 'error', message: 'Unauthorized!'});
            return;
        }

        res.status(200).json({status: 'ok', id: list.id, name: list.name, accessCode: list.accessCode, gifts: list.gifts.map(giftMapper)});

    }
    async post(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {

        const {listId, name, image, price, description}: PostRequest = req.body;

        if(listId === undefined || name === undefined || image === undefined) {
            res.status(400).json({status: 'error', message: 'listId, name, image cannot be null!'});
            return;
        }

        try {

            const gift = await Gift.create({
                listId: listId,
                name: name,
                image: image,
                price: price,
                description: description
            });

            res.status(200).json({status: 'ok', gift: giftMapper(gift)});

        } catch(err) {

            super.internalServerError(err, res);

        }
    }
    async patch(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {

        const {id, listId, name, image, price, description} = req.body;
        const gift = {
            id: id,
            listId: listId,
            name: name,
            image: image,
            price: price,
            description: description
        }

        try {

            const [r] = await Gift.update({
                ...Object.fromEntries(Object.entries(gift).filter((_, v) => v !== null))
            }, {
                where: {id: id},
            });

            if(r > 0)
                res.status(200).json({status: 'ok', message: 'Pomyślnie'})

        } catch(err) {
            super.internalServerError(err, res);
        }
    }
    async delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {

        // PGPool.query("DELETE FROM lists WHERE list_id = $1", [req.body.id])
        //     .then((qres) => {
        //         res.status(200).json({status: "ok"});
        //     }).catch((err) => {
        //         console.log(err);
        //         res.status(500).end();
        //     });
    }
};

export default new GiftsController();
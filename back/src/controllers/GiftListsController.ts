import * as jwt from 'jsonwebtoken';
import Gift from "../database/models/Gift";
import IController from "./IController";

interface GiftResponse {
    id: number;
    name: string;
    image: string;
    price?: number;
    description?: string;
    taken: boolean;
}

function giftMapper(gift: Gift): GiftResponse {

    return {id: gift.id, name: gift.name, image: gift.image, price: gift.price, description: gift.description, taken: gift.taken_by_id !== undefined};

}

export default <IController>{
    async get(req, res) {
        const {id} = req.params;

        const token = req.cookies['token'];

        if(!token) {
            res.status(401).json({status: 'error', message: 'Unauthorized!'});
            return;
        }

        const parsedToken = jwt.verify(token, process.env.SECRET);

        try {

            const gifts = await Gift.findAll({
                where: {list_id: id}
            });

            res.status(200).json({status: 'ok', gifts: gifts.map(giftMapper)})

        } catch(err) {

            console.log(err);
            res.status(500).json({status: 'error', message: 'Internal server error!'});

        }
    },
    async post(req, res) {
        const {list_id, name, image, price, description} = req.body;

        if(list_id === undefined || name === undefined || image === undefined) {
            res.status(400).json({status: 'error', message: 'list_id, name, image cannot be null!'});
            return;
        }

        try {

            const gift = await Gift.create({
                list_id: list_id,
                name: name,
                image: image,
                price: price,
                description: description
            });

            res.status(200).json({status: 'ok', gift: giftMapper(gift)});

        } catch(err) {

            console.log(err);
            res.status(500).json({status: 'error', message: 'Internal server error!'});

        }
    },
    async patch(req, res) {
        const {id, list_id, name, image, price, description} = req.body;
        const gift = {
            id: id,
            list_id: list_id,
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

        }
    },
    async delete(req, res) {
        // PGPool.query("DELETE FROM lists WHERE list_id = $1", [req.body.id])
        //     .then((qres) => {
        //         res.status(200).json({status: "ok"});
        //     }).catch((err) => {
        //         console.log(err);
        //         res.status(500).end();
        //     });
    },
};

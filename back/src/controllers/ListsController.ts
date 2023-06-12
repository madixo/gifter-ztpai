import List from "../database/models/List";
import IController from "./IController";

export default <IController> {
    async get(req, res) {

        const {id} = req.params;

        try {

            const lists = await List.findAll({
                where: {ownerId: id}
            });

            res.status(200).json({status: 'ok', lists: lists.map(list => ({id: list.id, name: list.name, access_code: list.access_code}))});

        }catch(err: any) {

            console.log(err);
            res.status(500).json({status: 'error', message: 'Internal server errror!'});

        }

    },
}
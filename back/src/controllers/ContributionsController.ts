import PGPool from "../database/PGPool";
import IController from "./Controller";

export default <IController>{
    async get(req, res) {
        PGPool.query('SELECT * FROM get_contributions WHERE user_id = $1', [req.params.id]).then(qres => {
            res.status(200).json({ ...qres.rows[0] });
        }).catch(err => {
            console.log(err);
            res.status(500).end();
        });
    }
};
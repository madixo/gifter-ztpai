import pgPool from "../database/PGPool";
import IController from "./Controller";

export default <IController>{
    async get(req, res) {
        pgPool.query("select * from get_users where user_id = $1::int", [
            req.params.id,
        ], (err, dbres) => {
            if(err) {
                console.log(err);
                res.status(500).json({message: "critical error"});
            } else {
                res.json(dbres.rows);
            }
        });
    },
};

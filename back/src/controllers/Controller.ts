import {Request, Response} from "express";
import {ParamsDictionary} from "express-serve-static-core";
import {JwtPayload, verify} from "jsonwebtoken";
import {ParsedQs} from "qs";

interface IController {
    get(req: Request, res: Response): Promise<void>;
    post(req: Request, res: Response): Promise<void>;
    patch(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
    verifyRequest(req: Request, res: Response): JwtPayload | undefined;
    internalServerError(err: any, res: Response): Promise<void>;
}

export default class Controller implements IController {
    defaultResponse(res: Response<any, Record<string, any>>) {res.status(404).json({status: 'error', message: 'Not found!'})}
    async get(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {this.defaultResponse(res)}
    async post(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {this.defaultResponse(res)}
    async patch(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {this.defaultResponse(res)}
    async delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {this.defaultResponse(res)}
    verifyRequest(req: Request, res: Response) {

        const token: string = req.cookies['token'];

        if(!token) {
            res.status(401).json({status: 'error', message: 'Unauthorized!'});
            return;
        }

        let parsedToken;

        try {
            parsedToken = verify(token, process.env.SECRET) as JwtPayload;
        }catch(err) {
            console.log(err);
            res.status(401).json({status: 'error', message: 'Unauthorized!'});
        }

        return parsedToken;

    }
    async internalServerError(err: any, res: Response<any, Record<string, any>>): Promise<void> {
        console.error(err);
        res.status(500).json({status: 'error', message: 'Internal server error! Contact with administrator.'});
    }
}
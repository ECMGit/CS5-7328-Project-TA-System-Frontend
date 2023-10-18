import * as UserService from './taJobs.services';
import { Request, Response, NextFunction } from 'express';

/**
 * get all users
 * @param req 
 * @param res 
 * @param next 
 */
export const getTAJobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(String(req.params.TAStats))
        const app = await UserService.getTAJobs();
        console.log(app);
        res.json(app);
    } catch (error) {
        next(error);
    }
};
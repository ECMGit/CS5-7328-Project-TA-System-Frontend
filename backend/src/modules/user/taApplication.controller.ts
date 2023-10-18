import * as UserService from './taApplication.services';
import { Request, Response, NextFunction } from 'express';
/**
 * Demo code for showing how to use the service layer and CRUD operations
 * 
 */

/**
 * get all users
 * @param req 
 * @param res 
 * @param next 
 */
export const getTaApplications = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const app = await UserService.getTaApplications();
        console.log(app);
        res.json(app);
    } catch (error) {
        next(error);
    }
};
import * as UserService from './tajob.service';
import { Request, Response, NextFunction } from 'express';

/**
 * Get all TA jobs.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 * @returns A JSON response with TA jobs or an error.
 */
export const getAllTAJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('in get all');

  try {
    const taJobs = await UserService.getAllTAJobs();
    if (taJobs.length === 0) {
      return res.status(404).json({ message: 'No job listings found.' });
    }
    res.json(taJobs);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/**
 * Get a TA job by ID.
 * @param req - The request object containing the job ID as a parameter.
 * @param res - The response object.
 * @param next - The next middleware function.
 * @returns A JSON response with the TA job or an error.
 */
export const getTAJobById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taJob = await UserService.getTAJobById(Number(req.params.id));
    if (!taJob) {
      return res.status(404).json({ message: 'TA job not found' });
    }
    res.json(taJob);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/**
 * Get TA jobs with filters.
 * @param req - The request object containing query parameters as filters.
 * @param res - The response object.
 * @param next - The next middleware function.
 * @returns A JSON response with filtered TA jobs or an error.
 */
export const getTAJobsWithFilters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('in controller');

  try {
    console.log(req.query);

    // Extract query parameters from the request. These will be your filters.
    const queryParams = req.query;

    // Call the service function, passing in the filters.
    const filteredTAJobs = await UserService.getTAJobsWithFilters(queryParams);

    // Send back the filtered data.
    res.json(filteredTAJobs);
  } catch (error) {
    console.error('Error fetching TA jobs with filters:', error);
    next(error); // Pass errors to the next middleware.
  }
};

/**
 * Get TA jobs by faculty ID.
 * @param req - The request object containing the faculty ID as a parameter.
 * @param res - The response object.
 * @param next - The next middleware function.
 * @returns A JSON response with TA jobs or an error.
 */
export const getTAJobsByFacultyId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserService.getTAJobsByFacultyId(Number(req.params.facultyId));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};


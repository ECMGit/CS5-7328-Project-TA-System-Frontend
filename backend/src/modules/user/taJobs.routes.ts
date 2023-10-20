import { Router } from 'express';
import * as UserController from './taJobs.controller';

const router = Router();

router.get("/", UserController.getTAJobs)
router.get("/:facultyId", UserController.getTAJobsByFacultyId)


// router.get('/detail', authenticate, UserController.getUserDetailById); // route is protected by authentication middleware
// ... other user-related routes

export default router;

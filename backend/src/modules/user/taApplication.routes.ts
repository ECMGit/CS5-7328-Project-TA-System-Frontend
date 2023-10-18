import express from 'express';
import {prisma} from '..//../../prisma/index'; // Adjust the path to your Prisma client instance

const router = express.Router();

// Get all applications for a specific course for a faculty
router.get('/faculty/:facultyId/course/:courseId/applications', async (req, res) => {
    const { facultyId, courseId } = req.params;

    try {
        const applications = await prisma.tAApplication.findMany({
            where: {
                courseId: Number(courseId),
                course: {
                    TAJob: {
                        some: {
                            facultyId: Number(facultyId)
                        }
                    }
                }
            },
            select: {
                student: {
                    select: {
                        user: {
                            select: {
                                id: true, // if you need id of user
                                firstName: true,
                                lastName: true
                            }
                        }
                    }
                },
                hoursCanWorkPerWeek: true,
                GPA: true,
                id: true // To use as a link for viewing more details
            }
            
        });

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get a specific application details
router.get('/applications/:applicationId', async (req, res) => {
    const { applicationId } = req.params;

    try {
        const application = await prisma.tAApplication.findUnique({
            where: {
                id: Number(applicationId)
            }
        });

        if (!application) {
            return res.status(404).json({ error: "Application not found" });
        }

        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;

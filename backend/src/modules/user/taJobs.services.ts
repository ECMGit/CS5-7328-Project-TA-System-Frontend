import { prisma } from '../../../prisma/index';

export const getTAJobs = async() =>{
    return await prisma.tAJob.findMany();
}
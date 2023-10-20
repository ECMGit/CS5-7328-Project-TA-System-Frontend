import { prisma } from '../../../prisma/index';

export const getTAJobs = async() =>{
    return await prisma.tAJob.findMany();
}
export const getTAJobsByFacultyId = async (facultyId: number) => {
    return await prisma.tAJob.findMany({ where:{ facultyId } } );
};

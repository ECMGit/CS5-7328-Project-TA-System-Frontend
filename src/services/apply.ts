import axios from 'axios';
import { AxiosResponse } from 'axios';

const BASE_API_URL: string | undefined = process.env.REACT_APP_BACKEND_URL;
const APPLICATION_API_URL: string | undefined = BASE_API_URL + '/ta-application/';
/**
 * @param dataJson
 * @param Resume
 * @returns */ 


const apply = (dataJson: JSON, Resume: File): Promise<AxiosResponse> => {
  console.log(BASE_API_URL);
  const formData = new FormData();
  formData.append('resumeFile', Resume); 
  formData.append('data',JSON.stringify(dataJson));
  return axios.post(APPLICATION_API_URL, formData);
};

const ApplyService = {
  apply,
};

export default ApplyService;
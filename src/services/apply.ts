import axios from 'axios';
import { AxiosResponse } from 'axios';

const Apply_API_URL: string | undefined = process.env.REACT_APP_BACKEND_URL;
/**
 * @param dataJson
 * @param Resume
 * @returns */ 


const apply = (dataJson: JSON, Resume: File): Promise<AxiosResponse> => {
  console.log('1');
  const formData = new FormData();
  formData.append('file', Resume); 
  formData.append('data',JSON.stringify(dataJson));
  return axios.post(Apply_API_URL+'ta-application', formData);
};

const ApplyService = {
  apply,
};

export default ApplyService;
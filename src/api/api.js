import fetcher from './fetcher';
import {AuthError} from './errors/AuthError';

const api = {
  _notifyLogin:[],
  notifyLogin(cb){
    this._notifyLogin.push(cb);
  },
  async getData(type) {
    try {
      const response = await fetcher.get(`/${type}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async login(username, password) {
    try{
      const response = await fetcher.post(`/login`, {email: username, password: password})
      this._notifyLogin.forEach(cb => cb())
      return response.data;
    }catch(error){
      console.log('inside catch')
      throw new Error(`Cant login with this username or password`);
    }
  
  },
  async postData(type, data) {
    console.log("i in postData")
    try {
      const response = await fetcher.post(`/${type}`, data);
      console.log(`i the response: ${response.data}`)
      return response.data;
    } catch (error) {
      console.error(error);
    }
  } 
}

export default api;

export const getData = async (type) => {
    try {
      const response = await fetcher.get(`/${type}`);
      return response.data;
    } catch (error) {
      if(error.response.status == 401){
        return new AuthError('Anauthorized user');
      }
      return error;
    }
  };



export const postData = async (type, data) => {
  console.log("i in postData")
  try {
    const response = await fetcher.post(`/${type}`, data);
    console.log(`i the response: ${response.data}`)
    return response.data;
  } catch (error) {
    console.error(error);
  }
};



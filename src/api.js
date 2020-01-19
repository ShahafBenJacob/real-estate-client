const axios = require('axios');


  const getDataFromServer = async (handleSuccess, type) => {
    try {
      const response = await axios.get(`/${type}`);
      const data = type.split('/')
      handleSuccess(response.data[data[data.length-1]], type)
    } catch (error) {
      console.error(error);
    }
  }

  export {getDataFromServer};
const axios = require("axios");

const getStatisticalData = async (handleSuccess, type) => {
  try {
    const response = await axios.get(`/${type}`);
    const data = type.split("/");
    handleSuccess(response.data[data[data.length - 1]], type);
  } catch (error) {
    console.error(error);
  }
};



export { getStatisticalData };

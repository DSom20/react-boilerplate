import axios from 'axios';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/api';

async function request(endpoint, params = {}, verb = 'get') {
  let req;

  if (verb === 'get') {
    req = axios.get(`${BASE_URL}/${endpoint}`, {
      params: { ...params },
    });
  } else if (verb === 'post') {
    req = axios.post(`${BASE_URL}/${endpoint}`, { ...params });
  }

  try {
    return (await req).data;
  } catch (err) {
    // console.error('API Error:', err.response);
    const { message } = err.response.data;
    throw Array.isArray(message) ? message : [message];
  }
}

async function getTidbits() {
  const response = await request('tidbits');
  return response.tidbits; // ?
}

async function addNewTidbit(tidbit) {
  const response = await request(`tidbits`, { tidbit }, 'post');
  return response; // ?
}

export { getTidbits, addNewTidbit };

// class API {
//   static async request(endpoint, params = {}, verb = 'get') {
//     let req;

//     if (verb === 'get') {
//       req = axios.get(`${BASE_URL}/${endpoint}`, {
//         params: { ...params },
//       });
//     } else if (verb === 'post') {
//       req = axios.post(`${BASE_URL}/${endpoint}`, { ...params });
//     }

//     try {
//       return (await req).data;
//     } catch (err) {
//       console.error('API Error:', err.response);
//       const { message } = err.response.data;
//       throw Array.isArray(message) ? message : [message];
//     }
//   }

//   static async getTidbits() {
//     const response = await this.request('tidbits');
//     return response; // ?
//   }

//   static async addNewTidbit(tidbit) {
//     console.log(this);
//     const response = await this.request(`tidbits`, { tidbit }, 'post');
//     return response; // ?
//   }
// }

// export default API;

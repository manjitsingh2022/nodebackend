const NodeGeocoder = require('node-geocoder');
const nodeFetch = require('node-fetch');
const options = {
  provider: 'google',
  // provider: 'google',
   httpAdapter: "https",
   fetch: function fetch(url, options) {
    return nodeFetch(url, {
      ...options,
      headers: {
        'user-agent': 'My application <ebsmanjitsingh@gmail.com>',
        'X-Specific-Header': 'Specific value'
      }
    });
  },
  // fetch: process.env.GEOCODER_PROXY,
  apiKey: "AIzaSyAn9AzEqgv-4J1eHzPvq59jaiatAWNrlAc", 
  formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports=geocoder;


// import NodeGeocoder from 'node-geocoder';

// module.exports.geocoder =async(city) => {
//    const options = {
//     provider: process.env.GEOCODER_PROVIDER,
//   };

//   const query = {
//       city: city,
//       country: 'Colombia',
//       limit: 1
//   };

//   const geocoder = NodeGeocoder(options);
//   const data = await geocoder.reverse(query);
//   const { latitude, longitude } = data[0];
//   return { lat: latitude, lng: longitude };
// };
import axios from 'axios'
export default axios.create({
  baseURL: "https://jolly-chaum.68-178-174-32.plesk.page/ServiceLaneApi_Live/",
  timeout:10000,
})

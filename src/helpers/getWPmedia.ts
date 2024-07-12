import axios from 'axios';
const getWPmedia = async (mediaId) => {
  try {
    const response = await axios.get(`https://trickbd.com/wp-json/wp/v2/media/${mediaId}`);
    const mediaUrl = response.data.source_url; // Adjust this key based on the actual response structure
    return mediaUrl;
  } catch (error) {
    return 'https://fakeimg.pl/600x400';
  }
};
export default getWPmedia;

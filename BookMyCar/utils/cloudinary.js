const cloudinary = require('cloudinary')
require('dotenv');

const { CLOUD_NAME, API_KEY, API_SECRET, CLOUDINARY_URL } = process.env

cloudinary.config({
    cloud_name : CLOUD_NAME,
    api_key : API_KEY,
    api_secret : API_SECRET
})

module.exports = cloudinary
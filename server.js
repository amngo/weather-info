const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('config');
const axios = require('axios');
const app = express();

const WEATHER_API_KEY = config.get('WEATHER_API_KEY');
const LOCATION_API_KEY = config.get('LOCATION_API_KEY');

app.use(cors());

app.get('/forecast', async (req, res) => {
  const { q } = req.query;
  try {
    const locationResult = await axios.get(
      `https://us1.locationiq.com/v1/search.php?key=${LOCATION_API_KEY}&q=${q}&format=json`
    );

    const { lat, lon, display_name } = locationResult.data[0];

    const forecastResult = await axios.get(
      `https://api.darksky.net/forecast/${WEATHER_API_KEY}/${lat},${lon}?exclude=minutely`
    );

    res
      .status(200)
      .json({ forecastData: forecastResult.data, locationName: display_name });
  } catch (error) {
    res.status(400).json(error);
  }
});

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

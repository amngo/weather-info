# React Weather Application

A weather application that shows weather conditions and forecasts.

## Prerequisites

You will need to have node and yarn installed on your machine.
You will also need an API key from [Dark Sky API](https://darksky.net/dev) and [LocationIQ](https://locationiq.com/) in order for API calls to work.

## Quick start

Make sure you are inside the project's directory, outside of the client folder.

Inside the config folder, add your api keys to default.json.
```
{
  "WEATHER_API_KEY": "DARK SKY API KEY HERE",
  "LOCATION_API_KEY": "LOCATIONIQ API KEY HERE"
}
```


```zsh
# Install server dependencies
yarn install

# Install client dependencies
yarn install-client

# Run server and client
yarn dev
```

## Built With

- [React](https://reactjs.org/) - Front end
- [Express](https://expressjs.com/) - Web framework
- [Dark Sky API](https://darksky.net/dev) - Weather API
- [LocationIQ](https://locationiq.com/) - Location API

## Authors

Andy Ngo

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

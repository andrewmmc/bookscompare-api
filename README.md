# BooksCompare API
Built with Firebase, Express.

Simple RESTful API for fetching books pricing from major online book stores in Taiwan. Just a MVP.

## Demo
- [BooksCompare 好書價](https://github.com/andrewmmc/bookscompare-app)

## Endpoints
##### Book Resources
URL | Description
------|------------
`GET` /book/isbn/:id| Returns detailed pricing information of a single book.

## Clone, Install and Run
The instructions below will get you a copy of the project up and run on your machine.

Clone the repo, and run:
``` bash
# install firebase-tools
npm install -g firebase-tools

# firebase login
firebase login

# install dependencies
cd functions
npm install

# run in local
npm run serve

# deploy
firebase functions:config:set webapi.key=""
npm run deploy
```

## Changelog
##### v.1.2.0
- Register & Login

##### v.1.1.1
- Update files structure

##### v.1.1.0
- Update engine from Node v.6.11.5 to Node v.8.9.4

##### v.1.0.2
- Add more book stores sources

##### v.1.0.1
- Use HTTPS connections for all URLs returned

##### v.1.0.0
- Init project
- Add book image links
- Send multiple requests at once

## Coding Standard
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

## Built With
- [Axios](https://github.com/axios/axios)
- [Cheerio](https://github.com/cheeriojs/cheerio)
- [Express](http://expressjs.com)
- [Lodash](https://lodash.com)

## Author
- [Andrew Mok](https://andrewmmc.com) (@andrewmmc)

## License
- [Apache License 2.0](LICENSE.md)

## Support
- Give this repo a **star** if you like :)
- For any questions, please feel free to [open an issue here](../../issues) or [contact me via email](mailto:hello@andrewmmc.com).

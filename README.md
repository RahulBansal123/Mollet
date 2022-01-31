# Mollet

Mollet is the web3 application to monitor the custodial wallets for trade activities of NFTs on platforms like OpenSea and Rarible.

Youtube link: https://youtu.be/rOgd8f0aCY4

## Installation

### Testnet

You can work on localhost without the API key but the testnet API is rate-limited.

### Mainnet

If you'd like to use it in a production environment, you have to request for a free API key here from here. https://docs.opensea.io/reference/request-an-api-key.

Now store this API key in `.env` in the name of `REACT_OPENSEA_API_KEY` and uncomment the headers passed to axios instance in ./src/store/ActionCreators/fetchActions.js .

Now you can run this project as:

```
- npm install
- npm run aqua
- npm start
```

aqua command is used to compile the Aqua code by taking all .aqua files from the ./aqua/, and place the generated JavaScript code in ./src/aqua

This project currently monitors NFT Activites on Ethereum chain only.

### Tech Stack

- ReactJS
- FluenceJS
- Aqua

const port = 3001;

const { createApp } = require('@unleash/proxy');
const { Strategy } = require('unleash-client')

class ClientIdsStrategy extends Strategy {
    constructor() {
        super('ClientIDs')
    }

    isEnabled({ clientIds }, { properties: { clientId } }) {
        return clientIds.indexOf(clientId) > -1
    }
}

console.log(`Creating proxy for ${process.env.UNLEASH_URL}`)

const app = createApp({
    unleashUrl: process.env.UNLEASH_URL,
    unleashApiToken: process.env.UNLEASH_API_TOKEN,
    proxySecrets: ['proxy-secret'],
    refreshInterval: 1000,
    customStrategies: [new ClientIdsStrategy()]
});

app.listen(port, () =>
    // eslint-disable-next-line no-console
    console.log(`Unleash Proxy listening on http://localhost:${port}/proxy`),
);
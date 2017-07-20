# OneSignal SDK for Node.js [![Build Status](https://travis-ci.org/scoutforpets/node-onesignal.svg?branch=master)](https://travis-ci.org/scoutforpets/node-onesignal)
This is an unofficial Node.js SDK for the [OneSignal Push Notification Service](https://onesignal.com/), which wraps their [REST API](https://documentation.onesignal.com/docs/server-api-overview).

## Basic Usage

```js
// require the module
const OneSignalClient = require('node-onesignal-api');

// create a new clinet
const client = new OneSignalClient({
    appId: '****',
    restApiKey: '****'
});

// send a notification
client.createNotification({
  contents: {
    contents: 'Content!'
  },
  specific: {
    include_player_ids: ['****']
  },
  attachments: {
    data: {
      hello: "world"
    }
  }
}).then(success => {
    // ..
})

```

More about [contents](https://documentation.onesignal.com/v3.0/reference#section-content-language),[attachments](https://documentation.onesignal.com/v3.0/reference#section-attachments) and [specific](https://documentation.onesignal.com/v3.0/reference#section-send-to-specific-devices).

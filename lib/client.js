const Joi = require('joi'), Request = require('superagent');

// OneSignal v1 API url
const API_URL = 'https://onesignal.com/api/v1';

// The OneSignal Client
module.exports = class Client {
  /**
     * Creates a new OneSignal client
     * @param  {string} appId      the appId for your app
     * @param  {string} restApiKey the REST API key for your app
     * @return {object} an initialized client
     */
  constructor({appId, restApiKey}) {
    Joi.assert(
      appId,
      Joi.string().guid().required(),
      new Error('`appId` is required')
    );
    Joi.assert(
      restApiKey,
      Joi.string().required(),
      new Error('`restApiKey` is required')
    );

    this.appId = appId;
    this.restApiKey = restApiKey;
  }

  /**
     * Sends a notification.
     * @param  {string|object} message the message to display to the recipient
     * @param  {object} options a hash of options to pass to the API
     * @return {object} the response
     */
  createNotification({contents, specific, attachments, options}) {
    options = options || {};

    // Perform some basic validation
    Joi.assert(
      contents,
      Joi.alternatives().try(Joi.string(), Joi.object()).required(),
      new Error('`message` is required')
    );
    Joi.assert(options, Joi.object());

    if (typeof contents.headings == "string") {
      contents.headings = {
        en: contents.headings
      }
    }

    if (typeof contents.contents == "string") {
      contents.contents = {
        en: contents.contents
      }
    }

    // Craft the payload
    const payload = Object.assign(
      {
        app_id: this.appId,
      },
      options,
      contents,
      specific,
      attachments
    );

    // Make the request
    return new Promise((resolve, reject) => {

      try {
        Request.post(`${API_URL}/notifications`)
          .set('Authorization', `Basic ${this.restApiKey}`)
          .send(payload)
          .then(({body}) => {

            const { errors } = body;

            if (errors) {
              reject(errors)
            } else {
              resolve('success')
            }

          })
      } catch (e) {
        reject(e)
      }

    });
  }
};

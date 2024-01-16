'use strict';

/**
 * fingerprint controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::fingerprint.fingerprint');

'use strict';

/**
 * fingerprint router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::fingerprint.fingerprint');

'use strict';

/**
 * fingerprint service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::fingerprint.fingerprint');

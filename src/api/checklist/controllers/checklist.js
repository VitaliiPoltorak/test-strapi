'use strict';

/**
 * checklist controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::checklist.checklist', ({ strapi }) => ({
  async updateMany(ctx) {
    const { body } = ctx.request;
    const { data } = body;

    if (!data) {
      return 'Data is missing';
    }

      const { items } = data;

    if (!items) {
      return 'Items are missing';
    }

    return await Promise.all(
      items.map(async (item) => {
        const { id, isDone, name } = item;

        return await strapi.entityService.update('api::checklist.checklist', id, {
          data : {
            isDone,
            name,
          }
        });
      })
    );
  },
  async deleteMany(ctx) {
    const { query } = ctx.request;
    const { ids } = query;

    if (!query) {
      return 'Query is missing';
    }

    if (!ids) {
      return 'Ids are missing';
    }

    return await Promise.all(
      ids.map(async (id) => {
        return await strapi.entityService.delete('api::checklist.checklist', +id);
      })
    );
  },
  async createMany(ctx) {
    const { body } = ctx.request;
    const { data } = body;

    if (!data) {
      return 'Data is missing';
    }

    const { items } = data;

    if (!items) {
      return 'Items are missing';
    }

    return await Promise.all(
      items.map(async (item) => {
        const { isDone, name, taskId } = item;

        return await strapi.entityService.create('api::checklist.checklist', {
          data: {
            taskId,
            isDone,
            name,
            publishedAt: Date.now(),
          }
        });
      })
    );
  }
}));

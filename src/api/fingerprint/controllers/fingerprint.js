'use strict';

/**
 * fingerprint controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::fingerprint.fingerprint', ({strapi}) => ({
  async create(ctx) {
    const {body} = ctx.request;
    const {data} = body;

    if (!data) {
      return 'Data is missing';
    }

    return await Promise.all(
      async function () {
        await strapi.entityService.create('api::fingerprint.fingerprint', {
          data,
        })
      },
      async function () {
        await strapi.entityService.create('api::column.column', {
          data,
        })
      },
    );
  },
}));


const startColumnData = [
  {
    title: 'To Do',
    boardId: 1,
    custom: false,
  },
  {
    title: 'In Progress',
    boardId: 1,
    custom: false,
  },
  {
    title: 'Done',
    boardId: 1,
    custom: false,
  },
]

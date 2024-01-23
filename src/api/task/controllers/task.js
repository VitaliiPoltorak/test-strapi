'use strict';

/**
 * task controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::task.task', ({strapi}) => ({
  async updateOrder(ctx) {
    const {id} = ctx.params;
    const {body} = ctx.request;
    const {order} = body.data;
    const tasks = await strapi.entityService.findMany('api::task.task', {data: {id}});
    const updatedTaskOrder = tasks.find(task => task.id === +id).order

    if (order !== undefined) {
      for (const task of tasks) {
        const taskId = task.id
        const taskOrder = task.order

        if (taskId === +id) {
          await strapi.entityService.update('api::task.task', id, {data: {order:order}})
        }
        if (taskId !== +id && taskOrder >= order && taskOrder < updatedTaskOrder) {

          await strapi.entityService.update('api::task.task', `${taskId}`, {data: {order: taskOrder + 1}})
        }
      }
    }

    return `done, order: ${order} , id: ${id}`
  },
}));

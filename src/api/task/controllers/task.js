'use strict';

/**
 * task controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::task.task', ({strapi}) => ({
  async updateOrder(ctx) {
    const {id} = ctx.params;
    const {body} = ctx.request;
    const {order, columnId} = body.data;

    if ( !order || !columnId ) {
      return 'Order or columnId is missing'
    }
    const tasks = await strapi.entityService.findMany('api::task.task', {data: {columnId}});
    const updatedTaskOrder = tasks.find(task => task.id === +id).order
    if (order) {
      for (const task of tasks) {
        const taskId = task.id
        const taskOrder = task.order
        if (taskId === +id) {
          await strapi.entityService.update('api::task.task', id, {data: {order:order}})
        }
        if (taskId !== +id && taskOrder >= order && taskOrder < updatedTaskOrder) {
          await strapi.entityService.update('api::task.task', `${taskId}`, {data: {order: taskOrder + 1}})
        }
        if (taskId !== +id && taskOrder <= order && taskOrder > updatedTaskOrder) {
          await strapi.entityService.update('api::task.task', `${taskId}`, {data: {order: taskOrder - 1}})
        }
      }
    }
    return 'Orders updated'
  },
}));

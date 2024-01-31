'use strict';

/**
 * task controller
 */

/**
 * This module exports a function that creates a core controller for the 'api::task.task' entity.
 * The controller has a single method, `updateOrder`, which updates the order of tasks.
 *
 * @module TaskController
 * @requires @strapi/strapi
 */

const {createCoreController} = require('@strapi/strapi').factories;

/**
 * Creates a core controller for the 'api::task.task' entity.
 *
 * @function createCoreController
 * @param {Object} strapi - The Strapi instance.
 * @returns {Object} The core controller with the `updateOrder` method.
 */

module.exports = createCoreController('api::task.task', ({strapi}) => ({

  /**
   * Updates the order of tasks.
   *
   * @async
   * @method updateOrder
   * @param {Object} ctx - The context object.
   * @param {Object} ctx.request - The request object.
   * @param {string} ctx.request.id - The ID of the task to update.
   * @param {Object} ctx.request.body.data - The data object.
   * @param {number} ctx.request.body.data.order - The new order of the task.
   * @param {string} ctx.request.body.data.columnId - The ID of the column the task belongs to.
   * @returns {string} A message indicating the result of the operation.
   */

  async updateOrder(ctx) {
    const {id} = ctx.params;
    const {body} = ctx.request;
    const {order, columnId, prevColumnId} = body.data;

    if (!id) {
      return 'Id is missing'
    }

    if (!order || !columnId) {
      return 'Order or columnId is missing'
    }

    const tasks = await strapi.entityService.findMany('api::task.task', {
      sort: 'order',
      filters: {
        $and: [
          {
            columnID: `${columnId}`,
          },
        ],
      },
    });
    const prevTaskOrder = tasks.find(task => task.id === +id).order
    if (order) {

      for (const task of tasks) {
        const taskId = task.id
        const taskOrder = task.order
        if (taskId === +id) {
          await strapi.entityService.update('api::task.task', id, {data: {order: order}})
        }
        if (taskId !== +id && taskOrder >= order && taskOrder < prevTaskOrder) {
          await strapi.entityService.update('api::task.task', `${taskId}`, {data: {order: taskOrder + 1}})
        }
        if (taskId !== +id && taskOrder <= order && taskOrder > prevTaskOrder) {
          await strapi.entityService.update('api::task.task', `${taskId}`, {data: {order: taskOrder - 1}})
        }
      }
    }

    if (prevColumnId && columnId !== prevColumnId) {

      const prevTasks = await strapi.entityService.findMany('api::task.task', {
        sort: 'order',
        filters: {
          $and: [
            {
              columnID: `${prevColumnId}`,
              order: {$not: order}
            },
          ],
        },
      });

      for (let i = 1; i <= prevTasks.length; i++) {
        await strapi.entityService.update('api::task.task', `${prevTasks[i - 1].id}`, {data: {order: i}})
      }
    }

    return 'Orders updated'
  },
}));

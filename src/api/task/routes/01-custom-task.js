'use strict';

/**
 * custom task router
 */


module.exports = {
  routes: [
    { // Path defined with an URL parameter
      method: 'PUT',
      path: '/tasks/:id/updateOrder',
      handler: 'task.updateOrder',
      config: {
        auth: false,
      }
    }
  ]
}

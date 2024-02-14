'use strict';

/**
 * custom checklist router
 */


module.exports = {
  routes: [
    {
      method: 'PUT',
      path: '/checklists',
      handler: 'checklist.updateMany',
      config: {
        auth: false,
      }
    },
    {
      method: 'DELETE',
      path: '/checklists',
      handler: 'checklist.deleteMany',
      config: {
        auth: false,
      }
    },
    {
      method: 'POST',
      path: '/checklists/createMany',
      handler: 'checklist.createMany',
      config: {
        auth: false,
      }
    }
  ]
}

module.exports = ({ env }) => ({
  "netlify-deployments": {
    enabled: true,
    config: {
      accessToken: process.env.NETLIFY_DEPLOYMENTS_PLUGIN_ACCESS_TOKEN,
      sites: [
        {
          name: 'my-list',
          id: process.env.NETLIFY_DEPLOYMENTS_ID,
          buildHook: "https://api.netlify.com/build_hooks/659bdd472f4c4e4724e1aaa5",
          branch: 'main' // optional
        }
      ]
    },
  },
});



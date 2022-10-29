module.exports = {
  client: {
    service: {
      name: 'uber-eats',
      url: 'http://127.0.0.1:4000/graphql',
    },
    includes: ['./src/**/*.vue', './src/**/*.js', './src/graphql/**'],
  },
};

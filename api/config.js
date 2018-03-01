const swaggerOptions = {
    info: {
      'title': 'Todo Demo App API Documentation',
      'version': '1.0.0',
    },
    documentationPage: process.env.NODE_ENV == 'PROD' ? false : true,
  };

const goodOptions = {
    reporters: {
        console: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{
                response: '*',
                log: '*'
            }]
        }, {
            module: 'good-console'
        }, 'stdout']
    }
}

module.exports = {
    swaggerOptions,
    goodOptions
}
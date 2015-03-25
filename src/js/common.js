requirejs.config({
  baseUrl: 'lib',
  paths: {
    app: '../js'
  },
  shim: {
    underscore: {
      exports: '_'
    }
  }
});

require(['app/main'])

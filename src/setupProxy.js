const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/health',
    createProxyMiddleware({
      target: 'https://speechai-api.ngrok.dev',
      changeOrigin: true,
      secure: true,
      logLevel: 'debug',
      onError: (err, req, res) => {
        console.log('Proxy error:', err);
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying request to:', proxyReq.path);
      }
    })
  );

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://speechai-api.ngrok.dev',
      changeOrigin: true,
      secure: true,
      logLevel: 'debug',
      onError: (err, req, res) => {
        console.log('Proxy error:', err);
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying request to:', proxyReq.path);
      }
    })
  );

  app.use(
    '/storage',
    createProxyMiddleware({
      target: 'https://speechai-api.ngrok.dev',
      changeOrigin: true,
      secure: true,
      logLevel: 'debug',
      onError: (err, req, res) => {
        console.log('Proxy error:', err);
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying request to:', proxyReq.path);
      }
    })
  );

  app.use(
    '/recordings',
    createProxyMiddleware({
      target: 'https://speechai-api.ngrok.dev',
      changeOrigin: true,
      secure: true,
      logLevel: 'debug',
      onError: (err, req, res) => {
        console.log('Proxy error:', err);
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying request to:', proxyReq.path);
      }
    })
  );

  app.use(
    '/user',
    createProxyMiddleware({
      target: 'https://speechai-api.ngrok.dev',
      changeOrigin: true,
      secure: true,
      logLevel: 'debug'
    })
  );

  app.use(
    '/billing',
    createProxyMiddleware({
      target: 'https://speechai-api.ngrok.dev',
      changeOrigin: true,
      secure: true,
      logLevel: 'debug'
    })
  );

  app.use(
    '/analytics',
    createProxyMiddleware({
      target: 'https://speechai-api.ngrok.dev',
      changeOrigin: true,
      secure: true,
      logLevel: 'debug'
    })
  );
};
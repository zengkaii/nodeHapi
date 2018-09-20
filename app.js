// app.js
const Hapi = require('hapi');
require('env2')('./.env')
const config = require('./config');
const routesHelloHapi = require('./routes/hello-hapi')
const routeShops = require('./routes/shops')
const routeOrders = require('./routes/orders')
const pluginHapiSwager = require('./plugins/hapi-swagger');
const server = new Hapi.Server();
// 配置服务器启动 host 与端口
server.connection({
  port: config.port,
  host: config.host,
  });

const init = async () => {
  await server.register([
    ...pluginHapiSwager
  ])
  server.route([
    // 创建一个简单的 hello hapi 接口
    ...routesHelloHapi,
    ...routeShops,
    ...routeOrders
  ]);
  // 启动服务
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};
init();
const Koa = require('koa');
const koaBody = require('koa-body');
const koastatic = require('koa-static');
const path = require('path');
const route = require('koa-route');
const cors = require('koa2-cors');
const koastatics = koastatic(path.join(__dirname));
const app = new Koa();
//解决跨域
app.use(cors({
    origin: "*", 
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
    maxAge: 100,
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));
app.use(koaBody());
app.use(koastatics);
//载入路由
app.use(route.post('/reg', require("./route/reg.js")));
app.use(route.post('/login', require("./route/login.js")));
app.use(route.get('/goodslist', require("./route/goodslist.js")));
app.use(route.get('/good', require("./route/good.js")));
app.use(route.post('/orderlistAdd', require("./route/orderlistAdd.js")));
app.use(route.post('/orderlistGet', require("./route/orderlistGet.js")));
app.use(route.post('/orderRemove', require("./route/orderRemove.js")));
//设置端口
app.listen(3000);

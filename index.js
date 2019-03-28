

const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const routerKOA = require('koa-router')();
const staticServer=require('koa-static');
const proxy = require('koa-proxy2');
var cors = require('koa-cors');
const bodyParser = require('koa-bodyparser')
const app = new Koa();

app.use(staticServer(__dirname + '/src'));

app
    .use(routerKOA.routes());

app.use(bodyParser());

app.listen(9304,() => {
    console.log('success')
});

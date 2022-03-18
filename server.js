const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const Router = require('@koa/router');
const router = new Router();
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');

const app = new Koa();

const options = {
  origin: '*'
};
app.use(cors(options));

app.use(koaBody({
  urlencoded: true,
  multipart: true,
  json: true
}));

const news = [];

router.get('/news', async ctx => {
  for (let i = 0; i < 3; i++) {
    news.push(
      {
        id: uuidv4(),
        date: faker.date.past().getTime(),
        text: faker.lorem.text(50)
      }
    );
  }
  ctx.response.status = 200;
  ctx.response.body = news;
  console.log(ctx.response.body);
});

app.use(router.routes()).use(router.allowedMethods());
const port = process.env.PORT || 7000;
const server = http.createServer(app.callback());

server.listen(port);

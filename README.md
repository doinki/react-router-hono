# react-router-hono

```js
import { Hono } from 'hono';
import { createRequestHandler } from 'react-router-hono';

const app = new Hono();

app.use(
  createRequestHandler({
    build: () => import('./build/server/index.js'),
  })
);
```

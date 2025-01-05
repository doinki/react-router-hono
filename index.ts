import { type Context } from 'hono';
import {
  createRequestHandler as _createRequestHandler,
  type AppLoadContext,
  type ServerBuild,
} from 'react-router';

export interface GetLoadContextFunction {
  (c: Context): Promise<AppLoadContext> | AppLoadContext;
}

export interface RequestHandler {
  (c: Context): Promise<Response>;
}

export function createRequestHandler({
  build,
  getLoadContext,
  mode = process.env.NODE_ENV,
}: {
  build: ServerBuild | (() => ServerBuild | Promise<ServerBuild>);
  getLoadContext?: GetLoadContextFunction;
  mode?: string;
}): RequestHandler {
  let handleRequest = _createRequestHandler(build, mode);

  if (getLoadContext) {
    return async (c) => handleRequest(c.req.raw, await getLoadContext(c));
  }

  return (c) => handleRequest(c.req.raw);
}

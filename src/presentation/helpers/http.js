import ServerError from '../errors/server-error.js';
import UnauthorizedError from '../errors/unauthorized-error.js';

const ok = (data) => ({
  statusCode: 200,
  data,
});

const badRequest = (error) => ({
  statusCode: 400,
  data: error,
});

const unauthorized = () => ({
  statusCode: 403,
  data: new UnauthorizedError(),
});

const serverError = () => ({
  statusCode: 500,
  data: new ServerError(),
});

export { ok, badRequest, unauthorized, serverError };

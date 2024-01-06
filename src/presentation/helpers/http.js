import ServerError from '../errors/server-error.js';
import UnauthorizedError from '../errors/unauthorized-error.js';

const ok = (data) => ({
  statusCode: 200,
  data,
});

const created = (data) => ({
  statusCode: 201,
  data,
});

const redirect = (url) => ({
  statusCode: 301,
  data: url,
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

export { ok, created, redirect, badRequest, unauthorized, serverError };

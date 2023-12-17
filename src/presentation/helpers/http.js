const badRequest = (error) => ({
  statusCode: 400,
  data: error.message,
});

const ok = (data) => ({
  statusCode: 200,
  data,
});

const serverError = () => ({
  statusCode: 500,
  data: new Error('Internal Server Error'),
});

export { badRequest, ok, serverError };

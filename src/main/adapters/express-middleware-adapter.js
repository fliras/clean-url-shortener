export default (middleware) => async (req, res, next) => {
  const headers = req.headers || {};
  const accessToken = headers.authorization?.split(' ')[1]; // authorization: Basic <token>
  const request = {
    ...headers,
    accessToken,
  };
  const response = await middleware.handle(request);
  if (response.statusCode === 200) {
    Object.assign(req, response.data);
    next();
  } else {
    return res
      .status(response.statusCode)
      .json({ error: response.data.message });
  }
};

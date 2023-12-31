export default (middleware) => async (req, res, next) => {
  const request = {
    accessToken: req.headers?.['x-access-token'],
    ...(req.headers || {}),
  };
  const response = await middleware.handle(request);
  if (response.statusCode === 200) {
    Object.assign(request, response.data);
    next();
  } else {
    return res
      .status(response.statusCode)
      .json({ error: response.data.message });
  }
};

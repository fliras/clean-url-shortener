export default (controller) => async (req, res) => {
  const request = {
    ...(req.body || {}),
    ...(req.params || {}),
  };
  const { statusCode, ...response } = await controller.handle(request);
  if (statusCode >= 200 && statusCode <= 299) {
    return res.status(statusCode).json(response.data);
  } else {
    return res.status(statusCode).json({ error: response.data.message });
  }
};

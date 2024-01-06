export default (controller) => async (req, res) => {
  const request = {
    ...(req.body || {}),
    ...(req.params || {}),
    userId: req.userId,
  };
  const { statusCode, ...response } = await controller.handle(request);
  if (statusCode >= 200 && statusCode <= 299)
    return res.status(statusCode).json(response.data);
  if (statusCode >= 300 && statusCode <= 399)
    return res.status(statusCode).redirect(response.data);
  return res.status(statusCode).json({ error: response.data.message });
};

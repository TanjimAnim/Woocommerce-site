import api from ".";

export default async function handler(req, res) {
  const orderOption = req.body;
  const responseData = {
    success: false,
    products: [],
  };
  try {
    const { data } = await api.post("orders", orderOption);
    responseData.success = true;
    responseData.products = data;
    res.send(responseData);
  } catch (error) {
    responseData.error = error.message;
    res.send(responseData);
  }
}

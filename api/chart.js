export default async function handler(request, response) {
  try {
    const { id, vs_currency = "usd" } = request.query;

    const apiResponse = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${vs_currency}&days=10&interval=daily`,
      {
        headers: {
          "x-cg-demo-api-key": process.env.COINGECKO_API_KEY,
        },
      }
    );

    const data = await apiResponse.json();

    response.status(apiResponse.status).json(data);
  } catch (error) {
    console.error(error);

    response.status(500).json({
      error: "Failed to fetch historical data",
    });
  }
}
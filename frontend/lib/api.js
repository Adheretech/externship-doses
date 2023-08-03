import axios from "axios";

const fetcher = async ({
  url,
  method,
  body,
  json = true
}) => {
  const res = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  if (json) {
    const data = await res.json();
    return data;
  }
};

export const createDose = async (dose) => {
  const DOSES_POST_ENDPOINT = process.env.DOSES_POST_ENDPOINT;
  const DOSES_ENDPOINT_PORT = process.env.DOSES_ENDPOINT_PORT;
  console.log(`${DOSES_POST_ENDPOINT}:${DOSES_ENDPOINT_PORT}/dose`);
  try {
    const response = await axios.post(
      `${DOSES_POST_ENDPOINT}:${DOSES_ENDPOINT_PORT}/dose`,
      dose, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating dose:", error);
    throw error;
  }
};

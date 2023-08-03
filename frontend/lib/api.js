const fetcher = async ({ url, method, body, json = true }) => {
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
  const DOSES_ENDPOINT_URL = process.env.DOSES_ENDPOINT_URL;
  const DOSES_ENDPOINT_PORT = process.env.DOSES_ENDPOINT_PORT;
  return fetcher({
    url: `${DOSES_ENDPOINT_URL}:${DOSES_ENDPOINT_PORT}/dose`,
    method: "POST",
    body: dose,
  });
};

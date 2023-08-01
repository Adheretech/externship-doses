const fetcher = async ({ url, method, body, json = true }) => {
  const res = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error("API Error")
  }

  if (json) {
    const data = await res.json()
    return data
  }
}


export const createDose = async (dose) => {
  return fetcher({
    url: '/api/doses',
    method: 'POST',
    body: dose
  })
}
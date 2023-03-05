const authURL = process.env.NEXT_PUBLIC_API

export declare interface IHttpClient {
  (endpoint: string, data: Record<string, string>): Promise<unknown>;
}

export async function client(endpoint: string, data: Record<string, string>) {
  const config = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  }

  return fetch(`${authURL}/${endpoint}`, config).then(async response => {
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}
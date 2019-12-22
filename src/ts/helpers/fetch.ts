export default async function request(
  url: string,
  options = {},
): Promise<object | undefined> {
  const response = await fetch(url, options);
  try {
    if (response.ok) {
      const parsedData = await response.json();
      return parsedData;
    }
    throw new Error(`FETCH_ERROR: ${response}`);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

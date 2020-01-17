export default async function request(remainingUrl: string) {
  const baseUrl = 'http://hacker-news.firebaseio.com/v0/';
  const response = await fetch(`${baseUrl}${remainingUrl}`);
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

export default async function request(url, options, responseType) {
  try {
    let response;
    if (!options) {
      response = await fetch(url);
    } else {
      response = await fetch(url, options);
    }
    if (!response.ok) {
      throw response;
    }
    if (response.status === 204) {
      return response;
    }
    let parsedData;
    if (responseType === 'blob') {
      parsedData = await response.blob();
    } else {
      parsedData = await response.json();
    }
    return parsedData;
  } catch (errorResponse) {
    console.log(errorResponse);
    if (!(errorResponse instanceof Error)) {
      const parsedErrorData = await errorResponse.json();
      console.log(parsedErrorData);
      return parsedErrorData;
    }
  }
}

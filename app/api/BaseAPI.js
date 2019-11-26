export default class BaseAPI {
  getResult(acceptableResultCodes, result) {
    if (acceptableResultCodes.indexOf(result.result_code) !== -1) {
      return result;
    } else {
      console.log(`result_code: ${result.result_code}`);
      throw result.errors;
    }
  }

  // getHeader(withToken) {
  // withToken ? {}
  // return {...headers};
  // }

  async postRequest(URL, data, acceptableResultCodes = ['OK'], headers = {}) {
    try {
      const formData = new FormData();

      if (data)
        Object.entries(data).forEach(([key, value]) =>
          formData.append(key, value),
        );

      const response = await fetch(URL, {
        method: 'POST',
        headers: headers,
        // headers: this.getHeader(headers),
        body: formData,
      });

      let result = await response.json();

      return this.getResult(acceptableResultCodes, result);
    } catch (e) {
      console.log(`${e.name}: ${e.message}`);
      throw e;
    }
  }

  async getRequest(URL, acceptableResultCodes = ['OK']) {
    try {
      const response = await fetch(URL);
      const result = await response.json();

      return this.getResult(acceptableResultCodes, result);
    } catch (e) {
      console.log(`${e.name}: ${e.message}`);
    }
  }
}

import { AuthController } from 'instruments/export';

class BaseAPI {
  async postRequest(URL, data, acceptableResultCodes = ['OK']) {
    try {
      const formData = new FormData();
      const TOKEN = new AuthController().getToken();

      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value),
      );

      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'User-Token': TOKEN,
        },
        body: formData,
      });

      const result = await response.json();

      if (acceptableResultCodes.indexOf(result.result_code) !== -1) {
        return result;
      } else {
        console.log(`result_code: ${result.result_code}`);
        throw result.errors;
      }

    } catch (e) {
      console.log(`${e.name}: ${e.message}`);
      throw e;
    }
  }

  async getRequest(URL) {
    try {
      const response = await fetch(URL);

      return await response.json();
    } catch (e) {
      console.log(`${e.name}: ${e.message}`);
    }
  }
}

export default BaseAPI;

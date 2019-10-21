import { cookies } from 'instruments';

class BaseAPI {
  async postRequest(URL, data) {
    try {
      const formData = new FormData();
      const TOKEN = cookies.get('TOKEN');

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

      switch (result.result_code) {
        case 'OK':
          return result;
          break;

        default:
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

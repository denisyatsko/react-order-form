import { AuthController } from 'core/export';

export default class BaseAPI {
  getHeader() {
    // console.log(this);
    // return {
    //   'User-Token': this.TOKEN,
    // }
  }

  async postRequest(URL, data, acceptableResultCodes = ['OK']) {
    try {
      const formData = new FormData();
      const TOKEN = new AuthController().getToken();
      // console.log(this);
      // console.log(this.getHeader());
      if (data)
        Object.entries(data).forEach(([key, value]) =>
          formData.append(key, value)
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

      const result = await response.json();

      switch (result.result_code) {
        case 'OK':
          return result;
        default:
          console.log(`result_code: ${result.result_code}`);
          throw result.errors;
      }
    } catch (e) {
      console.log(`${e.name}: ${e.message}`);
    }
  }
}

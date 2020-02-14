class ApiService {
  constructor(baseUrl) {
    this.url = baseUrl;
  }

  async makeRecordInDb(record) {
    try {
      const request = new Request(this.url + '/posts.json', {
        method: 'post',
        body: JSON.stringify(record)
      });
      const response = await fetch(request);
      return response.json();
    } catch (e) {
      console.error(e);
    }
  }

  async fetchPosts() {
    try {
      const response = await fetch(this.url + '/posts.json');
      return response.json();
    } catch (e) {
      console.error(e);
    }
  }
}

export const apiService = new ApiService('https://form-classes-js.firebaseio.com');
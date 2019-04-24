class ApiService {
    constructor(baseUrl) {
        this.url = baseUrl;
    }

    async createPost(post) {
        try {
            const request = new Request(this.url + '/posts.json', {
                method: 'post',
                body: JSON.stringify(post)
            });

            const response = await fetch(request);
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async getPosts() {
        try {
            const request = new Request(this.url + '/posts.json')
            const response = await fetch(request);
            return await response.json();
        } catch(error) {
            console.log(error);
        }
    }

    async getPostById(id) {
        try {
            const request = new Request(this.url + `/posts/${id}.json`)
            const response = await fetch(request);
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }
}

export const apiService = new ApiService('https://js-native-blog.firebaseio.com');
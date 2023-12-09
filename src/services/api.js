import axios from 'axios';
// BASE DA API: https://api.themoviedb.org/3/
//URL DA API: /movie/now_playing?api_key=d0fbf89958baf568db48961158f6b7a6&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;


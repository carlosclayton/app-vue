import Vue from 'vue';

export default class Jwt {
    static accessToken(email, password) {
        return Vue.http.post('access_token', {
            email: email,
            password: password
        })
    }

    static getUser(){
        return Vue.http.get('user');
    }

    static logout(){
        return Vue.http.post('logout')
    }

    static forgot(email){
        return Vue.http.post('password/forgot', {
            email: email
        })
    }

    static register(name, email, password){
        return Vue.http.post('register', {
            name: name,
            email: email,
            password: password,
            role: 2
        })
    }

    static addUser(name, email, password){
        return Vue.http.post('users', {
            name: name,
            email: email,
            password: password,
            role: 2
        })
    }

    static updateUser(id, name, email, password){
        return Vue.http.put(`users/${id}`, {
            name: name,
            email: email,
            password: password,
            role: 2
        })
    }

    static destroyUser(id){
        return Vue.http.delete(`users/${id}`)
    }

    static getUsers(page, limit, order, sort){
        return Vue.http.get(`users?page=${page}&limit=${limit}&orderBy=${order}&sortedBy=${sort}`);
    }

    static getUsersSearch(by, operator, keyword){
        return Vue.http.get(`users?search=${keyword}&searchFields=${by}:${operator}`);
    }
}


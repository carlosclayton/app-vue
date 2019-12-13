import localStorage from "./localStorage";
import Jwt from "./resources";

export default {
    login(email, password) {
        return Jwt.accessToken(email, password)
            .then((response) => {
                localStorage.set('token', response.body.token)
                return response
            })
    },
    user(){
        return Jwt.getUser()
    },

    users(page, limit, order, sort){
        return Jwt.getUsers(page, limit, order, sort);
    },

    usersSearch(by, operator, keyword){
        return Jwt.getUsersSearch(by, operator, keyword);
    },

    logout(){
        return Jwt.logout()
            .then((response) => {
                localStorage.remove('token');
                return response
            })
    },

    forgot(email){
        return Jwt.forgot(email);
    },

    register(id, name, email, password ){
        return Jwt.register(id, name, email, password)
            .then((response) => {
                localStorage.set('token', response.body.token)
                return response
            })
    },

    addUser(name, email, password ){
        return Jwt.addUser(name, email, password)
    },

    updateUser(name, email, password ){
        return Jwt.updateUser(name, email, password)
    },

    destroyUser(id){
        return Jwt.destroyUser(id)
    }

}



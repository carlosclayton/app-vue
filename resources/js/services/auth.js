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
        return Jwt.getUsers(page, limit, order, sort)
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

    register(name, email, password ){
        return Jwt.register(name, email, password)
            .then((response) => {
                localStorage.set('token', response.body.token)
                return response
            })
    }
}



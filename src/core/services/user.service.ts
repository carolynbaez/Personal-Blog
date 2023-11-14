import { BaseService } from '@/core/services/base.service'
import { UserModel, LoginModel } from '@/core/models/user.model'
import settings from "@/core/utils/app-settings";
import store from '@/store/index'
import { ToastProgrammatic as Toast } from "buefy";

import axios, { AxiosError, AxiosResponse } from 'axios'

export default class UserService extends BaseService<UserModel>{

    constructor() {
        super("user")
    }

    async SignUp(user: UserModel) {
        try {

            await axios.post(`${settings.API_URL}/user/sign-up`, user, {
                headers: {
                    "Content-type": "application/json"
                }
            }).then((response: AxiosResponse) => {
                store.state.user = response.data.data
                store.state.token = response.data.token
                return true
            })
                .catch(async (error: AxiosError) => {
                    if (error.response?.status == 400) {
                        Toast.open({
                            message: `Este correo ya está registrado.`,
                            type: 'is-danger',
                        })
                        return false
                    }

                    else if (error.response?.status == 500) {
                        Toast.open({
                            message: `Ha ocurrido un error. Intente de nuevo`,
                            type: 'is-danger is-light',
                        })
                        return false
                    }
                })
        }
        catch (error) {
            return false
        }
    }

    async Login(user: LoginModel) {
        try {
            await axios.post(`${settings.API_URL}/user/sign-in`, user, {
                headers: {
                    "Content-type": "application/json",
                    'Access-Control-Allow-Origin': '*'
                }
            }).then(async (response) => {
                localStorage.token = response.data.token
                localStorage.userId = response.data.data._id
                store.state.errorLogin = false
                store.state.user = response.data.data
                return response
            })
                .catch(error => {
                    store.state.errorLogin = true
                })
        }
        catch (error) {

            return true
        }
    }
}
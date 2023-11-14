import { BaseService } from '@/core/services/base.service'
import { PlaceModel } from '@/core/models/place.model'
import settings from "@/core/utils/app-settings";
import axios from 'axios'
import store from '@/store/index'

export default class PlaceService extends BaseService<PlaceModel>{

    constructor() {
        super("place")
    }

    async addPlace(place: any){
        let response = await axios.post(settings.API_URL + "/place", place, {
            headers: {
                "Content-Type": "multipart/form-data",
                "token": store.state.token
            }
        })
        return response
    }
}
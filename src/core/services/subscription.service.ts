import axios from 'axios'
import { SubscriptionModel } from '@/core/models/subscription.model'
import settings from "@/core/utils/app-settings";
import { config } from '@/core/utils/header-config'

export default class SubscriptionService {

    async generateSubscription(data: SubscriptionModel) {
        const body = data
        let response = await axios.post(settings.API_URL + "/subscription/generate-subscription", body, {
            headers: config
        })

        let subscription = response.data.data.body.id
        localStorage.setItem("PeddingApproval", "true")
        localStorage.setItem("SubscriptionId", JSON.stringify(subscription))
        let url = response.data.data.body.links[0].href
        window.open(url, '_blank')
    }

    async validateSubscription() {
        let subscriptionId = localStorage.getItem("SubscriptionId")
        subscriptionId = JSON.parse(subscriptionId!)
        await axios.get(`${settings.API_URL}/subscription/validate-subscription/${subscriptionId}`)
    }

    async cancelSubscription(subscription: any) {
        let response = await axios.get(`${settings.API_URL}/subscription/cancel-subscription/${subscription}`, {
        })
        if (response.status == 201) {
            return false
        }
        else {
            return true
        }
    }
}
export class PlaceModel {
    name = ""
    category = ""
    price = 0
    public = true
    premium = false
    assessment = 0
    longDescription = ""
    shortDescription = ""
    images : [] | null = []
    transportations: TransportationModel[] = []
    contacts: ContactModel | null = new ContactModel
}

export class TransportationModel {
    type = 0
    from = ""
    to = ""
    price = 0
}

export class ContactModel {
    phoneNumber = ""
    whatsappNumber = ""
    email = ""
    facebook = ""
    instagram = ""
    web = ""
}
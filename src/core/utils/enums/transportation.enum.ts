export enum TransportationEnum{
    Bus,
    PublicCar,
    PrivateCar,
    Moto,
    Train,
}

export const Transportation = {
    [TransportationEnum.Bus]: "Guagua",
    [TransportationEnum.PublicCar]: "Carro Público",
    [TransportationEnum.PrivateCar]: "Carro Privado",
    [TransportationEnum.Moto]: "Motor",
    [TransportationEnum.Train]: "Metro"

}
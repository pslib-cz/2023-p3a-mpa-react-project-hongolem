import {
    BusType,
    DamType,
    DavkyType,
    DistrictType,
    FreeFieldType,
    GambaType,
    IncineratorType,
    JanitorType,
    MonopolyTypes,
    StartType,
    TaxType,
    TramStopType
} from "../types/MonopolyTypes.tsx";

export const districts: DistrictType[] = [
    {
        type: MonopolyTypes.DISTRICT,
        id: 1,
        text: "Doubí",
        price: 50,
        rent: 25,
        owner: undefined,
        monopolyId: 1,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 3,
        text: "Vesec",
        price: 55,
        rent: 25,
        owner: undefined,
        monopolyId: 1,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 4,
        text: "Pilínkov",
        price: 60,
        rent: 30,
        owner: undefined,
        monopolyId: 1,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 6,
        text: "Rochlice",
        price: 65,
        rent: 35,
        owner: undefined,
        monopolyId: 2,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 8,
        text: "Hanychov",
        price: 70,
        rent: 35,
        owner: undefined,
        monopolyId: 2,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 9,
        text: "Janův Důl",
        price: 80,
        rent: 40,
        owner: undefined,
        monopolyId: 2,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 11,
        text: "Harcov",
        price: 90,
        rent: 45,
        owner: undefined,
        monopolyId: 3,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 13,
        text: "Kunratice",
        price: 100,
        rent: 50,
        owner: undefined,
        monopolyId: 3,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 14,
        text: "Vratislavice",
        price: 110,
        rent: 55,
        owner: undefined,
        monopolyId: 3,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 16,
        text: "Rudolfov",
        price: 120,
        rent: 60,
        owner: undefined,
        monopolyId: 4,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 18,
        text: "Kristiánov",
        price: 130,
        rent: 65,
        owner: undefined,
        monopolyId: 4,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 19,
        text: "Jeřáb",
        price: 140,
        rent: 70,
        owner: undefined,
        monopolyId: 4,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 21,
        text: "Krásná Studánka",
        price: 150,
        rent: 75,
        owner: undefined,
        monopolyId: 5,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 23,
        text: "Stráž nad Nisou",
        price: 160,
        rent: 80,
        owner: undefined,
        monopolyId: 5,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 24,
        text: "Karlov",
        price: 170,
        rent: 85,
        owner: undefined,
        monopolyId: 5,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 26,
        text: "Pavlovice",
        price: 180,
        rent: 90,
        owner: undefined,
        monopolyId: 6,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 27,
        text: "Ruprechtice",
        price: 190,
        rent: 95,
        owner: undefined,
        monopolyId: 6,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 29,
        text: "Kateřinky",
        price: 200,
        rent: 100,
        owner: undefined,
        monopolyId: 6,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 31,
        text: "Perštýn",
        price: 210,
        rent: 105,
        owner: undefined,
        monopolyId: 7,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 32,
        text: "Františkov",
        price: 220,
        rent: 110,
        owner: undefined,
        monopolyId: 7,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 34,
        text: "Ostašov",
        price: 230,
        rent: 115,
        owner: undefined,
        monopolyId: 7,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 37,
        text: "Nové Město",
        price: 240,
        rent: 120,
        owner: undefined,
        monopolyId: 8,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 39,
        text: "Staré Město",
        price: 250,
        rent: 125,
        owner: undefined,
        monopolyId: 8,
        level: 0,
    },
];

export const tramStops: TramStopType[] = [
    {
        type: MonopolyTypes.TRAM_STOP,
        id: 5,
        text: "Lidové sady",
        price: 200,
        rent: 50,
        owner: undefined,
        img: "",
    },
    {
        type: MonopolyTypes.TRAM_STOP,
        id: 15,
        text: "Horní Hanychov",
        price: 200,
        rent: 50,
        owner: undefined,
        img: "",
    },
    {
        type: MonopolyTypes.TRAM_STOP,
        id: 25,
        text: "Šaldovo náměstí",
        price: 200,
        rent: 50,
        owner: undefined,
        img: "",
    },
    {
        type: MonopolyTypes.TRAM_STOP,
        id: 35,
        text: "Průmyslová škola",
        price: 200,
        rent: 50,
        owner: undefined,
        img: "",
    },
];

export const janitor: JanitorType = {
    type: MonopolyTypes.JANITOR, 
    id: 10,
    text: "Janitor",
    players: [],
    img: "",
};

export const gamby: GambaType[] = [
    { type: MonopolyTypes.GAMBA, id: 7, text: "Gamba", img: "" },
    { type: MonopolyTypes.GAMBA, id: 22, text: "Gamba", img: "" },
    { type: MonopolyTypes.GAMBA, id: 36, text: "Gamba", img: "" },
];

export const davky: DavkyType[] = [
    { type: MonopolyTypes.DAVKY, id: 2, text: "Davky", img: "" },
    { type: MonopolyTypes.DAVKY, id: 17, text: "Davky", img: "" },
    { type: MonopolyTypes.DAVKY, id: 33, text: "Davky", img: "" },
];

export const busStation: FreeFieldType = {
    type: MonopolyTypes.FREE_FIELD,
    id: 20,
    text: "Fügnerka",
    img: "",
};

export const bus: BusType = {
    type: MonopolyTypes.BUS,
    id: 30,
    text: "Bus",
    img: "",
};

export const tax: TaxType[] = [{
    type: MonopolyTypes.TAX,
    id: 38,
    text: "Finančák",
    price: 100,
    img: "",
}];

export const incinerator: IncineratorType[] = [{
    type: MonopolyTypes.INCINERATOR,
    id: 12,
    text: "Spalovna Odpadu",
    price: 250,
    rent: 50,
    owner: undefined,
    img: "",
}];

export const dam: DamType[] = [{
    type: MonopolyTypes.DAM,
    id: 28,
    text: "Liberecká přehrada",
    price: 250,
    rent: 50,
    owner: undefined,
    img: "",
}];

export const start: StartType = {
    type: MonopolyTypes.START,
    id: 0,
    text: "Start",
    reward: 100,
    img: "./img/start.png",
};
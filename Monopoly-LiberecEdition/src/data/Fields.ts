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
        rent: 2,
        owner: undefined,
        monopolyId: 1,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 3,
        text: "Vesec",
        price: 60,
        rent: 4,
        owner: undefined,
        monopolyId: 1,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 4,
        text: "Pilínkov",
        price: 70,
        rent: 6,
        owner: undefined,
        monopolyId: 1,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 6,
        text: "Rochlice",
        price: 80,
        rent: 8,
        owner: undefined,
        monopolyId: 2,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 8,
        text: "Hanychov",
        price: 90,
        rent: 10,
        owner: undefined,
        monopolyId: 2,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 9,
        text: "Janův Důl",
        price: 100,
        rent: 12,
        owner: undefined,
        monopolyId: 2,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 11,
        text: "Harcov",
        price: 110,
        rent: 14,
        owner: undefined,
        monopolyId: 3,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 13,
        text: "Kunratice",
        price: 120,
        rent: 16,
        owner: undefined,
        monopolyId: 3,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 14,
        text: "Vratislavice",
        price: 130,
        rent: 18,
        owner: undefined,
        monopolyId: 3,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 16,
        text: "Rudolfov",
        price: 140,
        rent: 20,
        owner: undefined,
        monopolyId: 4,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 18,
        text: "Kristiánov",
        price: 150,
        rent: 22,
        owner: undefined,
        monopolyId: 4,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 19,
        text: "Jeřáb",
        price: 160,
        rent: 24,
        owner: undefined,
        monopolyId: 4,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 21,
        text: "Krásná Studánka",
        price: 180,
        rent: 26,
        owner: undefined,
        monopolyId: 5,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 23,
        text: "Stráž nad Nisou",
        price: 170,
        rent: 28,
        owner: undefined,
        monopolyId: 5,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 24,
        text: "Karlov",
        price: 170,
        rent: 28,
        owner: undefined,
        monopolyId: 5,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 26,
        text: "Pavlovice",
        price: 180,
        rent: 30,
        owner: undefined,
        monopolyId: 6,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 27,
        text: "Ruprechtice",
        price: 190,
        rent: 32,
        owner: undefined,
        monopolyId: 6,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 29,
        text: "Kateřinky",
        price: 200,
        rent: 34,
        owner: undefined,
        monopolyId: 6,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 31,
        text: "Perštýn",
        price: 210,
        rent: 36,
        owner: undefined,
        monopolyId: 7,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 32,
        text: "Františkov",
        price: 220,
        rent: 38,
        owner: undefined,
        monopolyId: 7,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 34,
        text: "Ostašov",
        price: 220,
        rent: 38,
        owner: undefined,
        monopolyId: 7,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 37,
        text: "Nové Město",
        price: 230,
        rent: 40,
        owner: undefined,
        monopolyId: 8,
        level: 0,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 39,
        text: "Staré Město",
        price: 240,
        rent: 42,
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
    },
    {
        type: MonopolyTypes.TRAM_STOP,
        id: 15,
        text: "Horní Hanychov",
        price: 200,
        rent: 50,
        owner: undefined,
    },
    {
        type: MonopolyTypes.TRAM_STOP,
        id: 25,
        text: "Šaldovo náměstí",
        price: 200,
        rent: 50,
        owner: undefined,
    },
    {
        type: MonopolyTypes.TRAM_STOP,
        id: 35,
        text: "Průmyslová škola",
        price: 200,
        rent: 50,
        owner: undefined,
    },
];

export const janitor: JanitorType = {
    type: MonopolyTypes.JANITOR, 
    id: 10,
    text: "Janitor"
};

export const gamby: GambaType[] = [
    { type: MonopolyTypes.GAMBA, id: 7, text: "Gamba" },
    { type: MonopolyTypes.GAMBA, id: 22, text: "Gamba" },
    { type: MonopolyTypes.GAMBA, id: 36, text: "Gamba" },
];

export const davky: DavkyType[] = [
    { type: MonopolyTypes.DAVKY, id: 2, text: "Davky" },
    { type: MonopolyTypes.DAVKY, id: 17, text: "Davky" },
    { type: MonopolyTypes.DAVKY, id: 33, text: "Davky" },
];

export const busStation: FreeFieldType = {
    type: MonopolyTypes.FREE_FIELD,
    id: 20,
    text: "Fügnerka"
};

export const bus: BusType = {
    type: MonopolyTypes.BUS,
    id: 30,
    text: "Bus"
};

export const tax: TaxType[] = [{
    type: MonopolyTypes.TAX,
    id: 38,
    text: "Finančák",
    price: 100
}];

export const incinerator: IncineratorType[] = [{
    type: MonopolyTypes.INCINERATOR,
    id: 12,
    text: "Spalovna Odpadu",
    price: 250,
    rent: 50,
    owner: undefined
}];

export const dam: DamType[] = [{
    type: MonopolyTypes.DAM,
    id: 28,
    text: "Liberecká přehrada",
    price: 250,
    rent: 50,
    owner: undefined
}];

export const start: StartType = {
    type: MonopolyTypes.START,
    id: 0,
    text: "Start",
};
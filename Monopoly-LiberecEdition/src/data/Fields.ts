import {
    BusType, DamType,
    DavkyType,
    DistrictType, FreeFieldType,
    GambaType,
    IncineratorType,
    JanitorType,
    MonopolyTypes, StartType,
    TaxType,
    TramStopType
} from "../types/MonopolyTypes.tsx";

export const districts: DistrictType[] = [
    {
        type: MonopolyTypes.DISTRICT,
        id: 1,
        name: "Doubí",
        price: 50,
        rent: 2,
        owner: undefined,
        monopolyId: 1,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 3,
        name: "Vesec",
        price: 60,
        rent: 4,
        owner: undefined,
        monopolyId: 1,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 4,
        name: "Pilínkov",
        price: 70,
        rent: 6,
        owner: undefined,
        monopolyId: 1,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 6,
        name: "Rochlice",
        price: 80,
        rent: 8,
        owner: undefined,
        monopolyId: 2,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 8,
        name: "Hanychov",
        price: 90,
        rent: 10,
        owner: undefined,
        monopolyId: 2,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 9,
        name: "Janův Důl",
        price: 100,
        rent: 12,
        owner: undefined,
        monopolyId: 2,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 11,
        name: "Harcov",
        price: 110,
        rent: 14,
        owner: undefined,
        monopolyId: 3,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 13,
        name: "Kunratice",
        price: 120,
        rent: 16,
        owner: undefined,
        monopolyId: 3,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 14,
        name: "Vratislavice",
        price: 130,
        rent: 18,
        owner: undefined,
        monopolyId: 3,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 16,
        name: "Rudolfov",
        price: 140,
        rent: 20,
        owner: undefined,
        monopolyId: 4,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 18,
        name: "Kristiánov",
        price: 150,
        rent: 22,
        owner: undefined,
        monopolyId: 4,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 19,
        name: "Jeřáb",
        price: 160,
        rent: 24,
        owner: undefined,
        monopolyId: 4,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 21,
        name: "Krásná Studánka",
        price: 180,
        rent: 26,
        owner: undefined,
        monopolyId: 5,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 23,
        name: "Stráž nad Nisou",
        price: 170,
        rent: 28,
        owner: undefined,
        monopolyId: 5,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 24,
        name: "Karlov",
        price: 170,
        rent: 28,
        owner: undefined,
        monopolyId: 5,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 26,
        name: "Pavlovice",
        price: 180,
        rent: 30,
        owner: undefined,
        monopolyId: 6,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 27,
        name: "Ruprechtice",
        price: 190,
        rent: 32,
        owner: undefined,
        monopolyId: 6,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 29,
        name: "Kateřinky",
        price: 200,
        rent: 34,
        owner: undefined,
        monopolyId: 6,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 31,
        name: "Perštýn",
        price: 210,
        rent: 36,
        owner: undefined,
        monopolyId: 7,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 32,
        name: "Františkov",
        price: 220,
        rent: 38,
        owner: undefined,
        monopolyId: 7,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 34,
        name: "Ostašov",
        price: 220,
        rent: 38,
        owner: undefined,
        monopolyId: 7,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 37,
        name: "Nové Město",
        price: 230,
        rent: 40,
        owner: undefined,
        monopolyId: 8,
    },
    {
        type: MonopolyTypes.DISTRICT,
        id: 39,
        name: "Staré Město",
        price: 240,
        rent: 42,
        owner: undefined,
        monopolyId: 8,
    },
];

export const tramStops: TramStopType[] = [
    {
        type: MonopolyTypes.TRAM_STOP,
        id: 5,
        name: "Lidové sady",
        price: 200,
        rent: 50,
        owner: undefined,
    },
    {
        type: MonopolyTypes.TRAM_STOP,
        id: 15,
        name: "Horní Hanychov",
        price: 200,
        rent: 50,
        owner: undefined,
    },
    {
        type: MonopolyTypes.TRAM_STOP,
        id: 25,
        name: "Šaldovo náměstí",
        price: 200,
        rent: 50,
        owner: undefined,
    },
    {
        type: MonopolyTypes.TRAM_STOP,
        id: 35,
        name: "Průmyslová škola",
        price: 200,
        rent: 50,
        owner: undefined,
    },
];

export const janitor: JanitorType = {
    type: MonopolyTypes.JANITOR,
    id: 10,
    name: "Janitor"
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
    name: "Fügnerka"
};

export const bus: BusType = {
    type: MonopolyTypes.BUS,
    id: 30,
    name: "Bus"
};

export const tax: TaxType[] = [{
    type: MonopolyTypes.TAX,
    id: 38,
    name: "Finančák",
    price: 100
}];

export const incinerator: IncineratorType[] = [{
    type: MonopolyTypes.INCINERATOR,
    id: 12,
    name: "Spalovna Odpadu",
    price: 250,
    rent: 50,
    owner: undefined
}];

export const dam: DamType[] = [{
    type: MonopolyTypes.DAM,
    id: 28,
    name: "Liberecká přehrada",
    price: 250,
    rent: 50,
    owner: undefined
}];

export const start: StartType = {
    type: MonopolyTypes.START,
    id: 0,
    name: "Start",
};
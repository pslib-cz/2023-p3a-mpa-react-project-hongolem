export enum FieldTypes {
    START = "START",
    STREET = "STREET",
    TRAM_STOP = "TRAM_STOP",
    JANITOR = "JANITOR",
    GAMBA = "GAMBA",
    BUS_STATION = "BUS_STATION",
    BUS = "BUS",
    TAX = "TAX",
}

export type StreetType = {
    type: FieldTypes.STREET;
    id: number;
    name: string;
    price: number;
    rent: number;
    owner?: string;
    color: string;
};

export type TramStopType = {
    type: FieldTypes.TRAM_STOP;
    id: number;
    name: string;
    price: number;
    rent: number;
    owner?: string;
};

export type JanitorType = {
    type: FieldTypes.JANITOR;
    id: number;
    buyout: number;
};

export type GambaType = {
    type: FieldTypes.GAMBA;
    id: number;
};

export type BusStationType = {
    type: FieldTypes.BUS_STATION;
    id: number;
};

export type BusType = {
    type: FieldTypes.BUS;
    id: number;
};

export type TaxType = {
    type: FieldTypes.TAX;
    id: number;
    price: number;
};

export type StartType = {
    type: FieldTypes.START;
    id: number;
    moneyBonus: number;
};

export type PlayerType = {
    id: number;
    name: string;
    money: number;
    position: number;
    properties: string[];
};

export type BoardType = {
    fields: FieldType[];
};

export type FieldType = {
    name: string;
    price: number;
    rent: number;
    owner: string;
    color: string;
    type: FieldTypes;
    id: number;
};

export type DiceRollType = {
    die1: number;
    die2: number;
};

export type GambaActionType = {
    text: string;
    payload: any;
};
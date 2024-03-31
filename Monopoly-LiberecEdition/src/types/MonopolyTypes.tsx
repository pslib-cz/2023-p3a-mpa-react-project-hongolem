export enum MonopolyTypes {
    START = "START",
    DISTRICT = "DISTRICT",
    TRAM_STOP = "TRAM_STOP",
    JANITOR = "JANITOR",
    GAMBA = "GAMBA",
    DAVKY = "DÁVKY",
    FREE_FIELD = "FREE_FIELD",
    BUS = "BUS",
    TAX = "TAX",
    INCINERATOR = "INCINERATOR",
    DAM = "DAM",
}

export type BoardType = {
    fields: Field[];
};

export type FieldType = {
    name: string;
    price: number;
    rent: number;
    owner: PlayerType;
    color: string;
    type: MonopolyTypes;
    id: number;
};

export type Field = DistrictType | TramStopType | JanitorType | GambaType | DavkyType | FreeFieldType | BusType | TaxType | IncineratorType | DamType | StartType;

export type DistrictType = {
    type: MonopolyTypes.DISTRICT;
    id: number;
    monopolyId: number;
    name: string;
    price: number;
    rent: number;
    owner?: PlayerType;
};

export type TramStopType = {
    type: MonopolyTypes.TRAM_STOP;
    id: number;
    name: string;
    price: number;
    rent: number;
    owner?: PlayerType;
};

export type JanitorType = {
    type: MonopolyTypes.JANITOR;
    id: number;
    name: string;
};

export type GambaType = {
    type: MonopolyTypes.GAMBA;
    id: number;
    text: string;
};

export type DavkyType = {
    type: MonopolyTypes.DAVKY;
    id: number;
    text: string;
};

export type FreeFieldType = {
    type: MonopolyTypes.FREE_FIELD;
    id: number;
    name: string;
};

export type BusType = {
    type: MonopolyTypes.BUS;
    id: number;
    name: string;
};

export type TaxType = {
    type: MonopolyTypes.TAX;
    id: number;
    name: string;
    price: number;
};

export type IncineratorType = {
    type: MonopolyTypes.INCINERATOR;
    id: number;
    name: string;
    price: number;
    owner?: PlayerType;
};

export type DamType = {
    type: MonopolyTypes.DAM;
    id: number;
    name: string;
    price: number;
    owner?: PlayerType;
};

export type StartType = {
    type: MonopolyTypes.START;
    id: number;
    name: string;
};

export type PlayerType = {
    id: number;
    name: string;
    money: number;
    position: number;
    properties: string[];
};

export interface GameState {
    players: PlayerType[];
    currentPlayerIndex: number;
    gameBoard: BoardType;
}
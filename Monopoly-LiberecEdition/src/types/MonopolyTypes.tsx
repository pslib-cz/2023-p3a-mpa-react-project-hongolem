export enum MonopolyTypes {
    START = "START",
    DISTRICT = "DISTRICT",
    TRAM_STOP = "TRAM_STOP",
    JANITOR = "JANITOR",
    GAMBA = "GAMBA",
    DAVKY = "DAVKY",
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
    text: string;
    type: MonopolyTypes;
    id: number;
};

export type Field = DistrictType | TramStopType | JanitorType | GambaType | DavkyType | FreeFieldType | BusType | TaxType | IncineratorType | DamType | StartType;

export type DistrictType = FieldType & {
    monopolyId: number;
    price: number;
    rent: number;
    owner?: PlayerType["id"];
    level: 0|1|2|3|4;
};

export type TramStopType = FieldType & {
    type: MonopolyTypes.TRAM_STOP;
    price: number;
    rent: number;
    owner?: PlayerType["id"];
    img: string;
};

export type JanitorType = FieldType & {
    type: MonopolyTypes.JANITOR;
    players: number[];
    img: string;
};

export type GambaType = FieldType & {
    type: MonopolyTypes.GAMBA;
    img: string;
};

export type DavkyType = FieldType & {
    type: MonopolyTypes.DAVKY;
    img: string;
};

export type FreeFieldType = FieldType & {
    type: MonopolyTypes.FREE_FIELD;
    img: string;
};

export type BusType = FieldType & {
    type: MonopolyTypes.BUS;
    img: string;
};

export type TaxType = FieldType & {
    type: MonopolyTypes.TAX;
    price: number;
    img: string;
};

export type IncineratorType = FieldType & {
    type: MonopolyTypes.INCINERATOR;
    price: number;
    rent: number;
    owner?: PlayerType["id"];
    img: string;
};

export type DamType = FieldType & {
    type: MonopolyTypes.DAM;
    price: number;
    rent: number;
    owner?: PlayerType["id"];
    img: string;
};

export type StartType = FieldType & {
    type: MonopolyTypes.START;
    reward: number;
    img: string;
};

export type PlayerType = {
    id: number;
    name: string;
    money: number;
    position: number;
    round: number;
    districts: DistrictType["id"][];
    tramStops: TramStopType["id"][];
    incinerators: IncineratorType["id"][];
    dams: DamType["id"][];
    janitorRounds: number;
};

export type GameState = {
    players: PlayerType[];
    currentPlayerIndex: number;
    gameBoard: BoardType;
    winner: PlayerType | undefined;
    round: number;
    roundActionBool: boolean;
    message: string;
}
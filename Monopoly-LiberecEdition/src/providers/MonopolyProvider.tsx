import {
    DamType,
    DistrictType,
    FieldType,
    GameState,
    IncineratorType,
    PlayerType,
    TramStopType
} from "../types/MonopolyTypes.tsx";
import {createContext, PropsWithChildren, useReducer} from "react";
import {
    bus,
    busStation,
    dam,
    davky,
    districts,
    gamby,
    incinerator,
    janitor,
    start,
    tax,
    tramStops
} from "../data/Fields.ts";

interface IGameContext {
    state: GameState;
    dispatch: (state: Action) => void;
}

const GameContext = createContext<IGameContext>({} as IGameContext);

const initialState: GameState = {
    players: [
        { id: 1, name: "Player 1", money: 1500, position: 0, districts: [], tramStops: [], incinerators: [], dams: [] },
        { id: 2, name: "Player 2", money: 1500, position: 0, districts: [], tramStops: [], incinerators: [], dams: [] },
        { id: 3, name: "Player 3", money: 1500, position: 0, districts: [], tramStops: [], incinerators: [], dams: [] },
        { id: 4, name: "Player 4", money: 1500, position: 0, districts: [], tramStops: [], incinerators: [], dams: [] },
    ],
    currentPlayerIndex: 0,
    gameBoard: {
        fields: [
            start,
            ...districts,
            ...tramStops,
            ...gamby,
            ...davky,
            janitor,
            busStation,
            bus,
            ...tax,
            ...incinerator,
            ...dam,
        ].sort((a,b) => a.id - b.id),
    },
    winner: undefined,
};

type Action =
    | { type: 'DICEROLL'; }
    | { type: 'BUY_PROPERTY'; player: PlayerType; property: DistrictType | TramStopType | IncineratorType | DamType; }
    | { type: 'PAY_RENT'; player: PlayerType; property: DistrictType | TramStopType | IncineratorType | DamType; }
    | { type: 'WIN_GAME'; player: PlayerType; }

const reducer = (state: GameState, action: Action): GameState => {
    const newState: GameState = JSON.parse(JSON.stringify(state));
    let currentPlayer = newState.players[newState.currentPlayerIndex];
    switch (action.type) {
        case 'DICEROLL':
            const dice1 = Math.floor(Math.random() * 6) + 1;
            const dice2 = Math.floor(Math.random() * 6) + 1;
            const sum = dice1 + dice2;
            currentPlayer.position = (currentPlayer.position + sum) % newState.gameBoard.fields.length;
            return newState;
        case 'BUY_PROPERTY':
            const buyProperty = newState.gameBoard.fields.find(field => field.id === action.property.id) as DistrictType | TramStopType | IncineratorType | DamType
            if (buyProperty && !buyProperty.owner && currentPlayer.money >= action.property.price) {
                buyProperty.owner = currentPlayer;
                currentPlayer.money -= action.property.price;
                return newState;
            }
            return newState;
        case 'PAY_RENT':
            const rentProperty = newState.gameBoard.fields.find(field => field.id === action.property.id) as DistrictType | TramStopType | IncineratorType | DamType
            if (rentProperty && rentProperty.owner && rentProperty.owner.id !== currentPlayer.id && currentPlayer.money >= rentProperty.rent) {
                action.player.money -= rentProperty.rent;
                rentProperty.owner!.money += rentProperty.rent;
            }
            return newState;
        case 'WIN_GAME':

            const monopoles = districts.filter(district => district.monopolyId);
            const playerMonopoles = action.player.districts.filter(district => district.monopolyId);
            let numberOfMonopoles = 0;
            for (const monopole of monopoles) {
                for (const playerMonopole of playerMonopoles) {
                    if (monopole === playerMonopole) {
                        numberOfMonopoles++;
                    }
                }
            }
            if (tramStops.every(stop => stop.owner === currentPlayer) || (numberOfMonopoles >= 3) || (newState.players.filter(player => player.money <= 0).length === 3)) {
                return {
                    ...newState,
                    winner: currentPlayer
                };

            }
            return newState;
        default:
            return state;
    }
}

export const GameProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
}
export default GameProvider;
import {FieldType, GameState, PlayerType} from "../types/MonopolyTypes.tsx";
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
    dispatch: (state: GameState) => void;
}

const GameContext = createContext<IGameContext>({} as IGameContext);

const initialState: GameState = {
    players: [
        { id: 0, position: 0, name: "Player 1", money: 1500, properties: [] },
        { id: 1, position: 0, name: "Player 2", money: 1500, properties: [] },
        { id: 2, position: 0, name: "Player 3", money: 1500, properties: [] },
        { id: 3, position: 0, name: "Player 4", money: 1500, properties: [] },
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
            tax,
            incinerator,
            dam,
        ].sort((a,b) => a.id - b.id),
    }
};

type Action =
    | { type: 'DICEROLL'; }
    | { type: 'BUY_PROPERTY'; player: PlayerType; property: FieldType; }
    | { type: 'PAY_RENT'; player: PlayerType; property: FieldType; }
    | { type: 'WIN_GAME'; player: PlayerType; }
    | { type: 'PLAYER_MOVEMENT'; }

const reducer = (state: GameState, action: Action): GameState => {
    const newState: GameState = JSON.parse(JSON.stringify(state));
    switch(action.type) {
        case 'DICEROLL':
            const diceroll = Math.floor(Math.random() * 6) + 1;
            const currentPlayer = newState.players[newState.currentPlayerIndex+diceroll] || newState.players[diceroll];
            return newState;
        case 'BUY_PROPERTY':
            const property = newState.gameBoard.fields.find(field => field.id === action.property.id) as FieldType;
            if (property) {
                property.owner = action.player;
                action.player.money -= property.price;
            }
            return newState;
        case 'PAY_RENT':
            const rentProperty = newState.gameBoard.fields.find(field => field.id === action.property.id) as FieldType;
            if (rentProperty) {
                action.player.money -= rentProperty.rent;
                rentProperty.owner!.money += rentProperty.rent;
            }
            return newState;
        case 'WIN_GAME':
            return newState;
        case 'PLAYER_MOVEMENT':
            return newState;
        default:
            return state;
    }
}

export const GameProvider: React.FC<PropsWithChildren> = ({ children }) => {
//    const [state, setState] = useState({ players: [], currentPlayer: 0 });
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
}
export default GameProvider;
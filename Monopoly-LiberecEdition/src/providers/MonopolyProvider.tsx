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
    let currentPlayer = newState.players[newState.currentPlayerIndex];
    switch (action.type) {
        case 'DICEROLL':
            const dice1 = Math.floor(Math.random() * 6) + 1;
            const dice2 = Math.floor(Math.random() * 6) + 1;
            const sum = dice1 + dice2;
            currentPlayer.position = (currentPlayer.position + sum) % newState.gameBoard.fields.length;
            return newState;
        case 'BUY_PROPERTY':
            currentPlayer.properties.push(action.property.name);
            currentPlayer.money -= action.property.price;
            return newState;
        case 'PAY_RENT':
            let owner = newState.players.find(player => player.properties.includes(action.property.name))!;
            if (owner) {
                owner.money += action.property.price;
                currentPlayer.money -= action.property.price;
                return newState;
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
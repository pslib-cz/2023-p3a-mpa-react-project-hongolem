import {
    DamType,
    DistrictType,
    GameState,
    IncineratorType,
    JanitorType,
    MonopolyTypes,
    StartType,
    TaxType,
    TramStopType
} from "../types/MonopolyTypes.tsx";
import React, {createContext, PropsWithChildren, useReducer} from "react";
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
    dispatch: (action: Action) => void;
}

export const GameContext = createContext<IGameContext>({} as IGameContext);

const initialState: GameState = {
    players: [
        { id: 1, name: "Player 1", money: 1500, position: 0, round: 1, districts: [], tramStops: [], incinerators: [], dams: [], janitorRounds: 0},
        { id: 2, name: "Player 2", money: 1500, position: 0, round: 1, districts: [], tramStops: [], incinerators: [], dams: [], janitorRounds: 0},
        { id: 3, name: "Player 3", money: 1500, position: 0, round: 1, districts: [], tramStops: [], incinerators: [], dams: [], janitorRounds: 0},
        { id: 4, name: "Player 4", money: 1500, position: 0, round: 1, districts: [], tramStops: [], incinerators: [], dams: [], janitorRounds: 0},
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
    | { type: 'DICE_ROLL'; }
    | { type: 'BUY_PROPERTY'; }
    | { type: "UPGRADE"; }
    | { type: "SELL"; }
    | { type: "END_TURN"; }
    | { type: 'WIN_GAME'; }

const reducer = (state: GameState, action: Action): GameState => {
    const newState: GameState = JSON.parse(JSON.stringify(state));
    let currentPlayer = newState.players[newState.currentPlayerIndex];
    let currentPlayerField = newState.gameBoard.fields[currentPlayer.position];
    function diceRoll() {
        const dice = (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1);
        const start = newState.gameBoard.fields.find(field => field.type === MonopolyTypes.START);
        if (currentPlayer.position + dice >= newState.gameBoard.fields.length && start) {
            currentPlayer.money += (start as StartType).reward;
        }
        currentPlayer.position = (currentPlayer.position + dice) % newState.gameBoard.fields.length;
    }
    
    switch (action.type) {
        case 'DICE_ROLL':
            if (currentPlayerField.type === MonopolyTypes.JANITOR) {
                currentPlayer.janitorRounds += 1;
            } else {
                diceRoll();
            }
            currentPlayer.round += 1;
            switch (currentPlayerField.type) {
                case MonopolyTypes.DISTRICT:
                    const district = currentPlayerField as DistrictType;
                    if (!district.owner) {
                        break;
                    } else if (district.owner.id !== currentPlayer.id) {
                        currentPlayer.money -= district.rent;
                        district.owner.money += district.rent;
                    }
                    break;
                case MonopolyTypes.TRAM_STOP:
                    const tramStop = currentPlayerField as TramStopType;
                    if (!tramStop.owner) {
                        break;
                    } else if (tramStop.owner.id !== currentPlayer.id) {
                        currentPlayer.money -= tramStop.rent;
                        tramStop.owner.money += tramStop.rent;
                    }
                    break;
                case MonopolyTypes.INCINERATOR:
                    const incinerator = currentPlayerField as IncineratorType;
                    if (!incinerator.owner) {
                        break;
                    } else if (incinerator.owner.id !== currentPlayer.id) {
                        currentPlayer.money -= incinerator.rent;
                        incinerator.owner.money += incinerator.rent;
                    }
                    break;
                case MonopolyTypes.DAM:
                    const dam = currentPlayerField as DamType;
                    if (!dam.owner) {
                        break;
                    } else if (dam.owner.id !== currentPlayer.id) {
                        currentPlayer.money -= dam.rent;
                        dam.owner.money += dam.rent;
                    }
                    break;
                case MonopolyTypes.JANITOR:
                    const janitor = currentPlayerField as JanitorType;
                    if (currentPlayer.janitorRounds > 0 && currentPlayer.janitorRounds < 4) {
                        const dice1 = Math.floor(Math.random() * 6) + 1;
                        const dice2 = Math.floor(Math.random() * 6) + 1;
                        if (dice1 == dice2) {
                            janitor.players = janitor.players.filter(playerId => playerId !== currentPlayer.id);
                        } else if (currentPlayer.janitorRounds >= 4) {
                            currentPlayer.janitorRounds = 0;
                            diceRoll();
                        }
                    } else {
                        janitor.players.push(currentPlayer.id);
                    }
                    break;
                case MonopolyTypes.BUS:
                    break;
                case MonopolyTypes.TAX:
                    const tax = currentPlayerField as TaxType;
                    currentPlayer.money -= tax.price;
                    break;
                case MonopolyTypes.FREE_FIELD || MonopolyTypes.START:
                    break;
                case MonopolyTypes.GAMBA:
                    break;
                case MonopolyTypes.DAVKY:
                    break;
            }
            if (currentPlayer.money <= 0) {
                newState.players = newState.players.filter(player => player.id !== currentPlayer.id);
            }
            return newState;
        case 'BUY_PROPERTY':
            if (currentPlayerField.type === MonopolyTypes.DISTRICT) {
                const district = currentPlayerField as DistrictType;
                if (!district.owner && currentPlayer.money >= district.price) {
                    currentPlayer.districts.push(district);
                    currentPlayer.money -= district.price;
                    district.owner = currentPlayer;
                    district.level = 1;
                }
            } else if (currentPlayerField.type === MonopolyTypes.TRAM_STOP) {
                const tramStop = currentPlayerField as TramStopType;
                if (!tramStop.owner && currentPlayer.money >= tramStop.price) {
                    currentPlayer.tramStops.push(tramStop);
                    currentPlayer.money -= tramStop.price;
                    tramStop.owner = currentPlayer;
                }
            } else if (currentPlayerField.type === MonopolyTypes.INCINERATOR) {
                const incinerator = currentPlayerField as IncineratorType;
                if (!incinerator.owner && currentPlayer.money >= incinerator.price) {
                    currentPlayer.incinerators.push(incinerator);
                    currentPlayer.money -= incinerator.price;
                    incinerator.owner = currentPlayer;
                }
            } else if (currentPlayerField.type === MonopolyTypes.DAM) {
                const dam = currentPlayerField as DamType;
                if (!dam.owner && currentPlayer.money >= dam.price) {
                    currentPlayer.dams.push(dam);
                    currentPlayer.money -= dam.price;
                    dam.owner = currentPlayer;
                }
            }
            return newState;
        case "UPGRADE":
            if (currentPlayerField.type === MonopolyTypes.DISTRICT && currentPlayerField.owner === currentPlayer) {
                const district = currentPlayerField as DistrictType;
                if (district.level < 4 && currentPlayer.money >= district.price) {
                    currentPlayer.money -= district.price/ (district.rent * 5);
                    district.level += 1;
                }
            }
            return newState;
        case "SELL":
            if (currentPlayerField.type === (MonopolyTypes.DISTRICT || MonopolyTypes.TRAM_STOP || MonopolyTypes.INCINERATOR || MonopolyTypes.DAM) && currentPlayerField.owner === currentPlayer) {
                const district = currentPlayerField as DistrictType | TramStopType | IncineratorType | DamType;
                currentPlayer.money += district.price;
                if (district.type === MonopolyTypes.DISTRICT) {
                    district.level = 0;
                }
                district.owner = undefined;
            }
            return newState;
        case "END_TURN":
            newState.currentPlayerIndex = (newState.currentPlayerIndex + 1) % newState.players.length;
            return newState;
        case 'WIN_GAME':
            const monopoles = districts.filter(district => district.monopolyId);
            const playerMonopoles = currentPlayer.districts.filter(district => district.monopolyId);
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
                }
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
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

export const PurchasableFields = [MonopolyTypes.DISTRICT, MonopolyTypes.TRAM_STOP, MonopolyTypes.INCINERATOR, MonopolyTypes.DAM];

export const GameContext = createContext<IGameContext>({} as IGameContext);

const initialState: GameState = {
    players: [
        { id: 1, name: "Player 1", money: 1500, position: 0, round: 1, districts: [], tramStops: [], incinerators: [], dams: [], janitorRounds: 0, color: "red"},
        { id: 2, name: "Player 2", money: 1500, position: 0, round: 1, districts: [], tramStops: [], incinerators: [], dams: [], janitorRounds: 0, color: "green"},
        { id: 3, name: "Player 3", money: 1500, position: 0, round: 1, districts: [], tramStops: [], incinerators: [], dams: [], janitorRounds: 0, color: "blue"},
        { id: 4, name: "Player 4", money: 1500, position: 0, round: 1, districts: [], tramStops: [], incinerators: [], dams: [], janitorRounds: 0, color: "yellow"},
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
    round: 1,
    roundActionBool: false,
    message: "",
};

type Action =
    | { type: 'SET_PLAYER_NAME'; payload: { playerId: number; name: string; } }
    | { type: 'DICE_ROLL'; }
    | { type: 'BUY_PROPERTY'; }
    | { type: "UPGRADE"; }
    | { type: "SELL"; }
    | { type: "END_TURN"; }
    | { type: 'WIN_GAME'; }

const reducer = (state: GameState, action: Action): GameState => {
    const newState: GameState = JSON.parse(JSON.stringify(state));
    const currentPlayer = newState.players[newState.currentPlayerIndex];
    let currentPlayerField = newState.gameBoard.fields[currentPlayer.position];
    function diceRoll() {
        const dice = (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1);
        const start = newState.gameBoard.fields.find(field => field.type === MonopolyTypes.START);
        if (currentPlayer.position + dice >= newState.gameBoard.fields.length && start) {
            currentPlayer.money += (start as StartType).reward;
        }
        currentPlayer.position = (currentPlayer.position + dice) % newState.gameBoard.fields.length;
        currentPlayerField = newState.gameBoard.fields[currentPlayer.position];
        state.message = `Player ${currentPlayer.id} rolled ${dice} and landed on ${currentPlayerField.text}`;
    }
    
    switch (action.type) {
        case 'SET_PLAYER_NAME':
            const player = state.players.find(player => player.id === action.payload.playerId);
            if (player) {
                player.name = action.payload.name;
            }
            return { ...state };
        case 'DICE_ROLL':
            if (currentPlayer.round > newState.round) {
                state.message = "You can't roll the dice more than once per round.";
            } else {
                if (currentPlayerField.type === MonopolyTypes.JANITOR) {
                    currentPlayer.janitorRounds += 1;
                } else {
                    diceRoll();
                }
                currentPlayer.round += 1;
            }
            switch (currentPlayerField.type) {
                case MonopolyTypes.DISTRICT:
                    const district = currentPlayerField as DistrictType;
                    if (!district.owner) {
                        break;
                    } else if (district.owner !== currentPlayer.id) {
                        currentPlayer.money -= district.rent;
                        newState.players[district.owner].money += district.rent;
                    }
                    break;
                case MonopolyTypes.TRAM_STOP:
                    const tramStop = currentPlayerField as TramStopType;
                    if (!tramStop.owner) {
                        break;
                    } else if (tramStop.owner !== currentPlayer.id) {
                        currentPlayer.money -= tramStop.rent;
                        newState.players[tramStop.owner].money += tramStop.rent;
                    }
                    break;
                case MonopolyTypes.INCINERATOR:
                    const incinerator = currentPlayerField as IncineratorType;
                    if (!incinerator.owner) {
                        break;
                    } else if (incinerator.owner !== currentPlayer.id) {
                        currentPlayer.money -= incinerator.rent;
                        newState.players[incinerator.owner].money += incinerator.rent;
                    }
                    break;
                case MonopolyTypes.DAM:
                    const dam = currentPlayerField as DamType;
                    if (!dam.owner) {
                        break;
                    } else if (dam.owner !== currentPlayer.id) {
                        currentPlayer.money -= dam.rent;
                        newState.players[dam.owner].money += dam.rent;
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
            if (!state.roundActionBool) {
                if (currentPlayerField.type === MonopolyTypes.DISTRICT) {
                    const district = currentPlayerField as DistrictType;
                    if (!district.owner && currentPlayer.money >= district.price) {
                        currentPlayer.districts.push(district.id);
                        currentPlayer.money -= district.price;
                        district.owner = currentPlayer.id;
                        district.level = 1;
                        state.roundActionBool = true;
                        state.message = `Player ${currentPlayer.id} bought ${district.text} for ${district.price} and now has ${currentPlayer.money} money left.`;
                    }
                } else if (currentPlayerField.type === MonopolyTypes.TRAM_STOP) {
                    const tramStop = currentPlayerField as TramStopType;
                    if (!tramStop.owner && currentPlayer.money >= tramStop.price) {
                        currentPlayer.tramStops.push(tramStop.id);
                        currentPlayer.money -= tramStop.price;
                        tramStop.owner = currentPlayer.id;
                        state.roundActionBool = true;
                        state.message = `Player ${currentPlayer.id} bought ${tramStop.text} for ${tramStop.price} and now has ${currentPlayer.money} money left.`;
                    }
                } else if (currentPlayerField.type === MonopolyTypes.INCINERATOR) {
                    const incinerator = currentPlayerField as IncineratorType;
                    if (!incinerator.owner && currentPlayer.money >= incinerator.price) {
                        currentPlayer.incinerators.push(incinerator.id);
                        currentPlayer.money -= incinerator.price;
                        incinerator.owner = currentPlayer.id;
                        state.roundActionBool = true;
                        state.message = `Player ${currentPlayer.id} bought ${incinerator.text} for ${incinerator.price} and now has ${currentPlayer.money} money left.`;
                    }
                } else if (currentPlayerField.type === MonopolyTypes.DAM) {
                    const dam = currentPlayerField as DamType;
                    if (!dam.owner && currentPlayer.money >= dam.price) {
                        currentPlayer.dams.push(dam.id);
                        currentPlayer.money -= dam.price;
                        dam.owner = currentPlayer.id;
                        state.roundActionBool = true;
                        state.message = `Player ${currentPlayer.id} bought ${dam.text} for ${dam.price} and now has ${currentPlayer.money} money left.`;
                    } else {
                        state.message = "You can't buy this field. (2)";
                    }
                }
            } else {
                state.message = "You already played this round.";
            }
            console.log(state.players[currentPlayer.id].money)
            return newState;
        case "UPGRADE":
            if (!state.roundActionBool) {
                if (currentPlayerField.type === MonopolyTypes.DISTRICT && currentPlayerField.owner === currentPlayer.id) {
                    const district = currentPlayerField as DistrictType;
                    if (district.level < 4 && currentPlayer.money >= district.price) {
                        const upgradePrice = district.price/ (district.rent * 5)
                        currentPlayer.money -= upgradePrice;
                        district.level += 1;
                        state.roundActionBool = true;
                        state.message = `Player ${currentPlayer.id} upgraded ${district.text} to level ${district.level} for ${upgradePrice} and now has ${currentPlayer.money} money left.`;
                    } else {
                        state.message = "You can't upgrade this district.";
                    }
                }
            } else {
                state.message = "You already played this round.";
            }
            return newState;
        case "SELL":
            if (!state.roundActionBool) {
                if (currentPlayerField.type === (MonopolyTypes.DISTRICT || MonopolyTypes.TRAM_STOP || MonopolyTypes.INCINERATOR || MonopolyTypes.DAM) && currentPlayerField.owner === currentPlayer.id) {
                    const district = currentPlayerField as DistrictType | TramStopType | IncineratorType | DamType;
                    currentPlayer.money += district.price;
                    if (district.type === MonopolyTypes.DISTRICT) {
                        district.level = 0;
                    }
                    district.owner = undefined;
                    state.roundActionBool = true;
                    state.message = `Player ${currentPlayer.id} sold ${district.text} for ${district.price} and now has ${currentPlayer.money} money left.`;
                } else {
                    state.message = "You can't sell this field.";
                }
            } else {
                state.message = "You already played this round.";
            }
            return newState;
        case "END_TURN":
            newState.currentPlayerIndex = (newState.currentPlayerIndex + 1) % newState.players.length;
            state.roundActionBool = false;
            if (newState.currentPlayerIndex === 0) {
                newState.round += 1;
            }
            state.message = `Player ${currentPlayer.id} ended their turn.`;
            return newState;
        case 'WIN_GAME':
            const monopoles = districts.filter(district => district.monopolyId);
            const playerMonopoles = districts.filter(district => district.owner === currentPlayer.id && district.monopolyId);
            let numberOfMonopoles = 0;
            for (const monopole of monopoles) {
                for (const playerMonopole of playerMonopoles) {
                    if (monopole === playerMonopole) {
                        numberOfMonopoles++;
                    }
                }
            }
            if (tramStops.every(stop => stop.owner === currentPlayer.id) || (numberOfMonopoles >= 3) || (newState.players.filter(player => player.money <= 0).length === 3)) {
                state.message = `Player ${currentPlayer.id} won the game!`;
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
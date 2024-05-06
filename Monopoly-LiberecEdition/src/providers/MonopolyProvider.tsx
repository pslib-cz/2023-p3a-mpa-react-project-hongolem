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
    moneyMessage: "",
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
    //variables
    const newState: GameState = JSON.parse(JSON.stringify(state));
    const currentPlayer = newState.players[newState.currentPlayerIndex];
    let currentPlayerField = newState.gameBoard.fields[currentPlayer.position];
    //DiceRoll function
    function diceRoll() {
        //variables
        const dice = (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1);
        const start = newState.gameBoard.fields.find(field => field.type === MonopolyTypes.START);
        let startReward = false;
        //start reward
        if (currentPlayer.position + dice >= newState.gameBoard.fields.length && start) {
            newState.players[newState.currentPlayerIndex].money += (start as StartType).reward;
            startReward = true;
        }
        //data change
        newState.players[newState.currentPlayerIndex].position = (currentPlayer.position + dice) % newState.gameBoard.fields.length;
        //message change
        currentPlayerField = newState.gameBoard.fields[currentPlayer.position];
        newState.message = `${currentPlayer.name} rolled ${dice} and landed on ${currentPlayerField.text}`;
        if (startReward) {
            newState.moneyMessage = `${currentPlayer.name} walked through Start and received ${(start as StartType).reward} Kč.`;
            startReward = false;
        }
    }
    //reducer switch
    switch (action.type) {
        case 'SET_PLAYER_NAME':
            //variables
            const player = newState.players.find(player => player.id === action.payload.playerId);
            //data change
            if (player) {
                player.name = action.payload.name;
            }
            return { ...newState };

        case 'DICE_ROLL':
            //check if player already rolled the dice
            if (currentPlayer.round > newState.round) {
                //message change
                newState.message = "You can't roll the dice more than once per round.";
            } else {
                //check if player is in jail
                if (currentPlayerField.type === MonopolyTypes.JANITOR) {
                    //data change
                    newState.players[newState.currentPlayerIndex].janitorRounds += 1;
                    //message change
                    newState.message = `${currentPlayer.name} is with the Janitor for ${newState.players[newState.currentPlayerIndex].janitorRounds} rounds.`
                } else {
                    diceRoll();
                }
                //data change
                newState.players[newState.currentPlayerIndex].round += 1;
                //switch case for field types upon landing
                switch (currentPlayerField.type) {
                    case MonopolyTypes.DISTRICT:
                        //variables
                        const district = currentPlayerField as DistrictType;
                        //check if district is owned
                        if (!district.owner) {
                            break;
                        } else if (district.owner !== currentPlayer.id) {
                            //data change
                            newState.players[newState.currentPlayerIndex].money -= district.rent;
                            newState.players[district.owner].money += district.rent;
                            //message change
                            newState.moneyMessage = `${currentPlayer.name} paid ${district.rent} Kč to Player ${newState.players[district.owner].name}.`;
                        }
                        break;

                    case MonopolyTypes.TRAM_STOP:
                        //variables
                        const tramStop = currentPlayerField as TramStopType;
                        //check if tram stop is owned
                        if (!tramStop.owner) {
                            break;
                        } else if (tramStop.owner !== currentPlayer.id) {
                            //data change
                            newState.players[newState.currentPlayerIndex].money -= tramStop.rent;
                            newState.players[tramStop.owner].money += tramStop.rent;
                            //message change
                            newState.moneyMessage = `${currentPlayer.name} paid ${tramStop.rent} Kč to Player ${newState.players[tramStop.owner].name}.`;
                        }
                        break;

                    case MonopolyTypes.INCINERATOR:
                        //variables
                        const incinerator = currentPlayerField as IncineratorType;
                        //check if incinerator is owned
                        if (!incinerator.owner) {
                            break;
                        } else if (incinerator.owner !== currentPlayer.id) {
                            //data change
                            newState.players[newState.currentPlayerIndex].money -= incinerator.rent;
                            newState.players[incinerator.owner].money += incinerator.rent;
                            //message change
                            newState.moneyMessage = `${currentPlayer.name} paid ${incinerator.rent} Kč to Player ${newState.players[incinerator.owner].name}.`;
                        }
                        break;

                    case MonopolyTypes.DAM:
                        //variables
                        const dam = currentPlayerField as DamType;
                        //check if dam is owned
                        if (!dam.owner) {
                            break;
                        } else if (dam.owner !== currentPlayer.id) {
                            //data change
                            newState.players[newState.currentPlayerIndex].money -= dam.rent;
                            newState.players[dam.owner].money += dam.rent;
                            //message change
                            newState.moneyMessage = `${currentPlayer.name} paid ${dam.rent} Kč to Player ${newState.players[dam.owner].name}.`;
                        }
                        break;

                    case MonopolyTypes.JANITOR:
                        //variables
                        const janitor = currentPlayerField as JanitorType;
                        //check if player already is on janitor
                        if (currentPlayer.janitorRounds > 0 && currentPlayer.janitorRounds < 4) {
                            //variables
                            const dice1 = Math.floor(Math.random() * 6) + 1;
                            const dice2 = Math.floor(Math.random() * 6) + 1;
                            //check if player rolled doubles or is on janitor for at least 4 rounds
                            if (dice1 == dice2 || currentPlayer.janitorRounds >= 4) {
                                //data change
                                janitor.players = janitor.players.filter(playerId => playerId !== currentPlayer.id);
                                newState.players[newState.currentPlayerIndex].janitorRounds = 0;
                                diceRoll();
                                //message change
                                newState.message = `${currentPlayer.name} left the Janitor.`
                            }
                        } else {
                            //data change
                            janitor.players.push(currentPlayer.id);
                            //message change
                            newState.message = `${currentPlayer.name} is with the Janitor.`
                        }
                        break;

                    case MonopolyTypes.BUS:
                        break;//NEEDS TO BE IMPLEMENTED

                    case MonopolyTypes.TAX:
                        //variables
                        const tax = currentPlayerField as TaxType;
                        //data change
                        newState.players[newState.currentPlayerIndex].money -= tax.price;
                        //message change
                        newState.moneyMessage = `${currentPlayer.name} paid ${tax.price} Kč in taxes.`;
                        break;

                    case MonopolyTypes.FREE_FIELD || MonopolyTypes.START:
                        break;

                    case MonopolyTypes.GAMBA:
                        break;//NEEDS TO BE IMPLEMENTED
                    case MonopolyTypes.DAVKY:
                        break;//NEEDS TO BE IMPLEMENTED
                }
            }
            //check if player is bankrupt
            if (currentPlayer.money <= 0) {
                //data change
                newState.players = newState.players.filter(player => player.id !== currentPlayer.id);
                //message change
                newState.message = `${currentPlayer.name} went bankrupt!`;
            }
            return newState;
        //NEEDS TO BE REWORKED
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
        //NEEDS TO BE IMPLEMENTED
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
        //NEEDS TO BE IMPLEMENTED
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
        //NEEDS TO BE IMPLEMENTED
        case "END_TURN":
            newState.currentPlayerIndex = (newState.currentPlayerIndex + 1) % newState.players.length;
            state.roundActionBool = false;
            if (newState.currentPlayerIndex === 0) {
                newState.round += 1;
            }
            state.message = `Player ${currentPlayer.id} ended their turn.`;
            return newState;
        //NEEDS TO BE IMPLEMENTED
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
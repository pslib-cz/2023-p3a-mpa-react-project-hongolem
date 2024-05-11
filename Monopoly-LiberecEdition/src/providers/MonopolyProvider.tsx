import {
    DamType,
    DistrictType,
    GameState,
    IncineratorType,
    JanitorType,
    MonopolyTypes, PlayerType,
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
        { id: 1, name: "Player 1", money: 1000, position: 0, round: 1, districts: [], tramStops: [], incinerators: [], dams: [], janitorRounds: 0, color: "red", bankrupt: false},
        { id: 2, name: "Player 2", money: 1000, position: 0, round: 1, districts: [], tramStops: [], incinerators: [], dams: [], janitorRounds: 0, color: "green", bankrupt: false},
        { id: 3, name: "Player 3", money: 1000, position: 0, round: 1, districts: [], tramStops: [], incinerators: [], dams: [], janitorRounds: 0, color: "blue", bankrupt: false},
        { id: 4, name: "Player 4", money: 1000, position: 0, round: 1, districts: [], tramStops: [], incinerators: [], dams: [], janitorRounds: 0, color: "yellow", bankrupt: false},
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
    rollMessage: "",
    bankruptMessage: "",
};

type Action =
    | { type: 'SET_PLAYER_NAME'; payload: { playerId: number; name: string; } }
    | { type: 'DICE_ROLL'; }
    | { type: 'BUY_PROPERTY'; }
    | { type: "UPGRADE"; }
    | { type: "SELL"; }
    | { type: "END_TURN"; }


//local variables
function checkWin(newState: GameState): PlayerType | undefined {
    const monopoles = districts.filter(district => district.monopolyId);
    const playerMonopoles = districts.filter(district => district.owner === newState.players[newState.currentPlayerIndex].id && district.monopolyId);
    let numberOfMonopoles = 0;
    for (const monopole of monopoles) {
        for (const playerMonopole of playerMonopoles) {
            if (monopole === playerMonopole) {
                numberOfMonopoles++;
            }
        }
    }
    //check if player has all tram stops or has 3 monopoles or if 3 players are bankrupt
    if ((
            newState.gameBoard.fields.filter(fields => fields.type == MonopolyTypes.TRAM_STOP && fields.owner == newState.players[newState.currentPlayerIndex].id).length === 4
            || (numberOfMonopoles >= 3)
            || (newState.players.filter(player => player.bankrupt).length === 3))
            && !newState.players[newState.currentPlayerIndex].bankrupt) {
        console.log(newState.gameBoard.fields.filter(fields => fields.type == MonopolyTypes.TRAM_STOP && fields.owner == newState.players[newState.currentPlayerIndex].id).length === 4)

        //console.log(numberOfMonopoles >= 3)
        //console.log((newState.players.filter(player => player.bankrupt).length === 3))
        //data change
        newState.winner = newState.players[newState.currentPlayerIndex];
        //message change
        console.log(`Player ${newState.players[newState.currentPlayerIndex].id} won the game!`);
        newState.message = `Player ${newState.players[newState.currentPlayerIndex].id} won the game!`;
        return newState.winner;
    }
    return newState.winner;
}
const reducer = (state: GameState, action: Action): GameState => {
    //local variables
    const newState: GameState = JSON.parse(JSON.stringify(state));
    let currentPlayer = newState.players[newState.currentPlayerIndex];
    let currentPlayerField = newState.gameBoard.fields[currentPlayer.position];
    //DiceRoll function
    function diceRoll() {
        //local variables
        const dice = (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1);
        const start = newState.gameBoard.fields.find(field => field.type === MonopolyTypes.START);
        //start reward
        if (currentPlayer.position + dice >= newState.gameBoard.fields.length && start) {
            newState.players[newState.currentPlayerIndex].money += (start as StartType).reward;
            //message change
            newState.moneyMessage = `${currentPlayer.name} walked through Start and received ${(start as StartType).reward} Kč.`
        }
        //data change
        newState.players[newState.currentPlayerIndex].position = (currentPlayer.position + dice) % newState.gameBoard.fields.length;
        currentPlayerField = newState.gameBoard.fields[currentPlayer.position];
        //message change
        newState.rollMessage = `${currentPlayer.name} rolled ${dice}`;
    }
    //reducer switch
    switch (action.type) {
        case 'SET_PLAYER_NAME':
            //local variables
            const player = newState.players.find(player => player.id === action.payload.playerId);
            //data change
            if (player) {
                player.name = action.payload.name;
            }
            return newState;

        case 'DICE_ROLL':
            //check if player already rolled the dice
            if (currentPlayer.round > newState.round) {
                //message change
                newState.message = "You can't roll the dice more than once per round.";
            } else {
                //check if player is in jail
                if (currentPlayerField.type !== MonopolyTypes.JANITOR || currentPlayer.janitorRounds >= 3) {
                    diceRoll();
                }
                //data change
                newState.players[newState.currentPlayerIndex].round += 1;
                //switch case for field types upon landing
                switch (currentPlayerField.type) {
                    case MonopolyTypes.DISTRICT:
                        //local variables
                        const district = currentPlayerField as DistrictType;
                        //check if district is owned
                        if (!district.owner) {
                            break;
                        } else if (district.owner !== currentPlayer.id && district.owner ) {
                            //data change
                            newState.players[newState.currentPlayerIndex].money -= district.rent;
                            newState.players[(district.owner as number)-1].money += district.rent;
                            //message change
                            newState.moneyMessage = `${currentPlayer.name} paid ${district.rent} Kč to Player ${newState.players[district.owner-1].name}.`;
                        }
                        break;

                    case MonopolyTypes.TRAM_STOP:
                        //local variables
                        const tramStop = currentPlayerField as TramStopType;
                        //check if tram stop is owned
                        if (!tramStop.owner) {
                            break;
                        } else if (tramStop.owner !== currentPlayer.id) {
                            //data change
                            newState.players[newState.currentPlayerIndex].money -= tramStop.rent;
                            newState.players[(tramStop.owner as number)-1].money += tramStop.rent;
                            //message change
                            newState.moneyMessage = `${currentPlayer.name} paid ${tramStop.rent} Kč to Player ${newState.players[tramStop.owner-1].name}.`;
                        }
                        break;

                    case MonopolyTypes.INCINERATOR:
                        //local variables
                        const incinerator = currentPlayerField as IncineratorType;
                        //check if incinerator is owned
                        if (!incinerator.owner) {
                            break;
                        } else if (incinerator.owner !== currentPlayer.id) {
                            //data change
                            newState.players[newState.currentPlayerIndex].money -= incinerator.rent;
                            newState.players[(incinerator.owner as number)-1].money += incinerator.rent;
                            //message change
                            newState.moneyMessage = `${currentPlayer.name} paid ${incinerator.rent} Kč to Player ${newState.players[incinerator.owner-1].name}.`;
                        }
                        break;

                    case MonopolyTypes.DAM:
                        //local variables
                        const dam = currentPlayerField as DamType;
                        //check if dam is owned
                        if (!dam.owner) {
                            break;
                        } else if (dam.owner !== currentPlayer.id) {
                            //data change
                            newState.players[newState.currentPlayerIndex].money -= dam.rent;
                            newState.players[(dam.owner as number)-1].money += dam.rent;
                            //message change
                            newState.moneyMessage = `${currentPlayer.name} paid ${dam.rent} Kč to Player ${newState.players[dam.owner-1].name}.`;
                        }
                        break;

                    case MonopolyTypes.JANITOR:
                        //local variables
                        const janitor = currentPlayerField as JanitorType;
                        //data change
                        newState.players[newState.currentPlayerIndex].janitorRounds += 1;
                        //message change
                        newState.message = `${currentPlayer.name} is with the Janitor for ${currentPlayer.janitorRounds} rounds.`
                        //check if player already is on janitor
                        if (currentPlayer.janitorRounds < 4) {
                            //local variables
                            const dice1 = Math.floor(Math.random() * 6) + 1;
                            const dice2 = Math.floor(Math.random() * 6) + 1;
                            //check if player rolled doubles or is on janitor for at least 4 rounds
                            if (dice1 == dice2 || currentPlayer.janitorRounds >= 4) {
                                //data change
                                janitor.players = janitor.players.filter(playerId => playerId !== currentPlayer.id);
                                newState.players[newState.currentPlayerIndex].janitorRounds = 0;
                                diceRoll();
                                //message change
                                if (dice1 == dice2) {
                                    newState.message = `${currentPlayer.name} rolled doubles and left the Janitor.`
                                } else {
                                    newState.message = `${currentPlayer.name} left the Janitor.`
                                }
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
                        //local variables
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
            return newState;

        case 'BUY_PROPERTY':
            //check if player already played this round
            if (!state.roundActionBool) {
                //check if field is district
                if (currentPlayerField.type === MonopolyTypes.DISTRICT) {
                    //local variables
                    const district = currentPlayerField as DistrictType;
                    //check if district is owned and player has enough money
                    if (!district.owner && currentPlayer.money >= district.price) {
                        //data change
                        newState.players[newState.currentPlayerIndex].districts.push(district.id);
                        newState.players[newState.currentPlayerIndex].money -= 1000;
                        (newState.gameBoard.fields[currentPlayer.position] as DistrictType).owner = currentPlayer.id;
                        (newState.gameBoard.fields[currentPlayer.position] as DistrictType).level = 1;
                        newState.roundActionBool = true;
                        //message change
                        newState.moneyMessage = `${currentPlayer.name} has paid ${district.price} Kč for ${district.text}.`;
                    } else {
                        //message change
                        newState.message = "You can't buy this field. You don't have enough money.";
                    }
                //check if field is tram stop
                } else if (currentPlayerField.type === MonopolyTypes.TRAM_STOP) {
                    //local variables
                    const tramStop = currentPlayerField as TramStopType;
                    //check if tram stop is owned and player has enough money
                    if (!tramStop.owner && currentPlayer.money >= tramStop.price) {
                        //data change
                        newState.players[newState.currentPlayerIndex].tramStops.push(tramStop.id);
                        newState.players[newState.currentPlayerIndex].money -= tramStop.price;
                        (newState.gameBoard.fields[currentPlayer.position] as TramStopType).owner = currentPlayer.id;
                        console.log((newState.gameBoard.fields[currentPlayer.position] as TramStopType).owner);
                        newState.roundActionBool = true;
                        //message change
                        newState.moneyMessage = `${currentPlayer.name} has paid ${tramStop.price} Kč for ${tramStop.text}.`;
                    } else {
                        //message change
                        newState.message = "You can't buy this field. You don't have enough money.";
                    }
                //check if field is incinerator
                } else if (currentPlayerField.type === MonopolyTypes.INCINERATOR) {
                    //local variables
                    const incinerator = currentPlayerField as IncineratorType;
                    //check if incinerator is owned and player has enough money
                    if (!incinerator.owner && currentPlayer.money >= incinerator.price) {
                        //data change
                        newState.players[newState.currentPlayerIndex].incinerators.push(incinerator.id);
                        newState.players[newState.currentPlayerIndex].money -= incinerator.price;
                        (newState.gameBoard.fields[currentPlayer.position] as IncineratorType).owner = currentPlayer.id;
                        newState.roundActionBool = true;
                        //message change
                        newState.moneyMessage = `${currentPlayer.name} has paid ${incinerator.price} Kč for ${incinerator.text}.`;
                    } else {
                        //message change
                        newState.message = "You can't buy this field. You don't have enough money.";
                    }
                //check if field is dam
                } else if (currentPlayerField.type === MonopolyTypes.DAM) {
                    //local variables
                    const dam = currentPlayerField as DamType;
                    //check if dam is owned and player has enough money
                    if (!dam.owner && currentPlayer.money >= dam.price) {
                        //data change
                        newState.players[newState.currentPlayerIndex].dams.push(dam.id);
                        newState.players[newState.currentPlayerIndex].money -= dam.price;
                        (newState.gameBoard.fields[currentPlayer.position] as DamType).owner = currentPlayer.id;
                        newState.roundActionBool = true;
                        //message change
                        newState.moneyMessage = `${currentPlayer.name} has paid ${dam.price} Kč for ${dam.text}.`;
                    //check if player has enough money
                    } else {
                        //message change
                        newState.message = "You can't buy this field. You don't have enough money.";
                    }
                }
            } else {
                //message change
                newState.message = "You already played this round.";
            }
            return newState;
        
        case "UPGRADE":
            //check if player already
            if (!state.roundActionBool) {
                //check if field is district and is owned by the current player
                if (currentPlayerField.type === MonopolyTypes.DISTRICT && currentPlayerField.owner === currentPlayer.id) {
                    //local variables
                    const district = currentPlayerField as DistrictType;
                    //check if player has enough money and district level is lower than 4
                    if (district.level < 4 && currentPlayer.money >= district.price) {
                        //local variables
                        const upgradePrice = Math.round(district.price / 2)
                        //data change
                        newState.players[newState.currentPlayerIndex].money -= upgradePrice;
                        (newState.gameBoard.fields[currentPlayer.position] as DistrictType).level += 1;
                        (newState.gameBoard.fields[currentPlayer.position] as DistrictType).rent *= 2;
                        newState.roundActionBool = true;
                        //message change
                        newState.message = `${currentPlayer.name} upgraded ${district.text} to level ${district.level}.`;
                        newState.moneyMessage = `${currentPlayer.name} has paid ${upgradePrice} Kč.`;
                    } else if (district.level === 4) {
                        //message change
                        newState.message = "You can't upgrade this district. It's already at max level.";
                    } else {
                        //message change
                        newState.message = "You can't upgrade this district. You don't have enough money.";
                    }
                } else {
                    //message change
                    newState.message = "You can't upgrade this field. It's not a district or you don't own it.";
                }
            } else {
                //message change
                newState.message = "You already played this round. You already played this round.";
            }
            return newState;
        
        case "SELL": //NEEDS TO BE IMPLEMENTED
            //check if the field is sellable and owned by the current player
            if (currentPlayerField.type === (MonopolyTypes.DISTRICT || MonopolyTypes.TRAM_STOP || MonopolyTypes.INCINERATOR || MonopolyTypes.DAM) && currentPlayerField.owner === currentPlayer.id) {
                //local variables
                const sellableField = currentPlayerField as DistrictType | TramStopType | IncineratorType | DamType;
                //data change
                newState.players[newState.currentPlayerIndex].money += sellableField.price;
                if (sellableField.type === MonopolyTypes.DISTRICT) {
                    (newState.gameBoard.fields[newState.players[newState.currentPlayerIndex].position] as DistrictType).level = 0;
                }
                (newState.gameBoard.fields[newState.players[newState.currentPlayerIndex].position] as DistrictType | TramStopType | IncineratorType | DamType).owner = undefined;
                //message change
                newState.moneyMessage = `${currentPlayer.name} has received ${sellableField.price} Kč for selling ${sellableField.text}.`;
            } else {
                //message change
                newState.message = "You can't sell this field.";
            }
            return newState;
        
        case "END_TURN":
            //check if player won
            checkWin(newState);
            if (newState.winner) {
                return newState;
            }
            //check if player is bankrupt
            if (currentPlayer.money <= 0) {
                //data change
                newState.players[newState.currentPlayerIndex].bankrupt = true;
                for (const district of currentPlayer.districts) {
                    (newState.gameBoard.fields[district] as DistrictType).owner = undefined;
                    (newState.gameBoard.fields[district] as DistrictType).level = 0;
                }
                for (const tramStop of currentPlayer.tramStops) {
                    (newState.gameBoard.fields[tramStop] as TramStopType).owner = undefined;
                }
                for (const incinerator of currentPlayer.incinerators) {
                    (newState.gameBoard.fields[incinerator] as IncineratorType).owner = undefined;
                }
                for (const dam of currentPlayer.dams) {
                    (newState.gameBoard.fields[dam] as DamType).owner = undefined;
                }
                newState.players[newState.currentPlayerIndex].districts = [];
                newState.players[newState.currentPlayerIndex].tramStops = [];
                newState.players[newState.currentPlayerIndex].incinerators = [];
                newState.players[newState.currentPlayerIndex].dams = [];
                //message change
                newState.message = `${currentPlayer.name} went bankrupt!`;
            }
            //while loop for changing players
            //do {
                //data change
                newState.currentPlayerIndex = (newState.currentPlayerIndex + 1) % newState.players.length;
                newState.roundActionBool = false;
                if (newState.currentPlayerIndex === 0) {
                    newState.round += 1;
                }
            //} while (currentPlayer.bankrupt);
            currentPlayer = newState.players[newState.currentPlayerIndex];
            //message change
            newState.message = `${currentPlayer.name} started their turn.`;
            return newState;
        default:
            return newState;
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
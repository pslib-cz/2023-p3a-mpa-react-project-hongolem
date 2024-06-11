import {
    BusTravelType,
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
import React, {createContext, PropsWithChildren, useEffect, useReducer} from "react";
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
import {GambaCards} from "../data/Gamba.ts";
import {DavkyCards} from "../data/Davky.ts";

interface IGameContext {
    state: GameState;
    dispatch: (action: Action) => void;
    button: ButtonType;
}

export type ButtonType = {
    buttonClicked: boolean;
    setButtonClicked: (button: boolean) => void;
}

const monopoles = [
    districts.filter(district => district.monopolyId === 1) as DistrictType[],
    districts.filter(district => district.monopolyId === 2) as DistrictType[],
    districts.filter(district => district.monopolyId === 3) as DistrictType[],
    districts.filter(district => district.monopolyId === 4) as DistrictType[],
    districts.filter(district => district.monopolyId === 5) as DistrictType[],
    districts.filter(district => district.monopolyId === 6) as DistrictType[],
    districts.filter(district => district.monopolyId === 7) as DistrictType[],
    districts.filter(district => district.monopolyId === 8) as DistrictType[],
];

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

export type Action =
    | { type: 'SET_PLAYER_NAME'; payload: { playerId: number; name: string; } }
    | { type: 'DICE_ROLL'; }
    | { type: 'BUY_PROPERTY'; }
    | { type: "UPGRADE"; }
    | { type: "SELL"; }
    | { type: "END_TURN"; }
    | { type: "RESET"; }
    | { type: "RESTORE"; gameState: GameState; }
    | { type: "BUS_TRAVEL"; payload: BusTravelType; }


//local variables
function checkWin(newState: GameState): PlayerType | undefined {
    let numberOfMonopoles = 0;
    let distsInMonopole = 0;
    const playerDistricts = newState.players[newState.currentPlayerIndex].districts;
    for (const monopole of monopoles) {
        for (const dist of monopole) {
            if (playerDistricts.includes(dist.id)) {
                distsInMonopole++;
            }
            if (distsInMonopole === monopole.length) {
                numberOfMonopoles++;
            }
        }
        distsInMonopole = 0;
    }
    //check if player has all tram stops or has 3 monopoles or if 3 players are bankrupt
    if ((
            newState.gameBoard.fields.filter(fields => fields.type == MonopolyTypes.TRAM_STOP && fields.owner == newState.players[newState.currentPlayerIndex].id).length === 4
            || (numberOfMonopoles >= 3)
            || (newState.players.filter(player => player.bankrupt).length === 3))
            && !newState.players[newState.currentPlayerIndex].bankrupt) {
        //data change
        newState.winner = newState.players[newState.currentPlayerIndex];
        //message change
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
            currentPlayer.money += (start as StartType).reward;
            //message change
            newState.moneyMessage = `${currentPlayer.name} walked through Start and received ${(start as StartType).reward} 000 Kč.`
        }
        //data change
        currentPlayer.position = (currentPlayer.position + dice) % newState.gameBoard.fields.length;
        currentPlayerField = newState.gameBoard.fields[currentPlayer.position];
        newState.players[newState.currentPlayerIndex] = currentPlayer;
        //message change
        //.log(currentPlayerField);
        newState.rollMessage = `${currentPlayer.name} rolled ${dice}`;
    }

    function bankruptFunc(bankrupt: boolean = true) {
        //data change
        currentPlayer.bankrupt = bankrupt;
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
        currentPlayer.districts = [];
        currentPlayer.tramStops = [];
        currentPlayer.incinerators = [];
        currentPlayer.dams = [];
        //message change
        newState.message = `${currentPlayer.name} went bankrupt!`;
        return newState;
    }

    //reducer switch
    switch (action.type) {
        case 'SET_PLAYER_NAME': {
            //local variables
            const player = newState.players.find(player => player.id === action.payload.playerId);
            //data change
            if (player) {
                player.name = action.payload.name;
            }
            return newState;
        }
        case 'DICE_ROLL': {
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
                currentPlayer.round += 1;
                //switch case for field types upon landing
                function onStepField(){
                    switch (currentPlayerField.type) {
                        case MonopolyTypes.DISTRICT:
                            //local variables
                            const district = currentPlayerField as DistrictType;
                            //check if district is owned
                            if (!district.owner) {
                                break;
                            } else if (district.owner !== currentPlayer.id && district.owner) {
                                //data change
                                currentPlayer.money -= district.rent;
                                newState.players[(district.owner as number) - 1].money += district.rent;
                                //message change
                                newState.moneyMessage = `${currentPlayer.name} paid ${district.rent} 000 Kč to Player ${newState.players[district.owner - 1].name}.`;
                            }
                            newState.players[newState.currentPlayerIndex] = currentPlayer;
                            return newState;

                        case MonopolyTypes.TRAM_STOP:
                            //local variables
                            const tramStop = currentPlayerField as TramStopType;
                            //check if tram stop is owned
                            if (!tramStop.owner) {
                                break;
                            } else if (tramStop.owner !== currentPlayer.id) {
                                //data change
                                currentPlayer.money -= tramStop.rent;
                                newState.players[(tramStop.owner as number) - 1].money += tramStop.rent;
                                //message change
                                newState.moneyMessage = `${currentPlayer.name} paid ${tramStop.rent} 000 Kč to Player ${newState.players[tramStop.owner - 1].name}.`;
                            }
                            newState.players[newState.currentPlayerIndex] = currentPlayer;
                            return newState;

                        case MonopolyTypes.INCINERATOR:
                            //local variables
                            const incinerator = currentPlayerField as IncineratorType;
                            //check if incinerator is owned
                            if (!incinerator.owner) {
                                break;
                            } else if (incinerator.owner !== currentPlayer.id) {
                                //data change
                                currentPlayer.money -= incinerator.rent;
                                newState.players[(incinerator.owner as number) - 1].money += incinerator.rent;
                                //message change
                                newState.moneyMessage = `${currentPlayer.name} paid ${incinerator.rent} 000 Kč to Player ${newState.players[incinerator.owner - 1].name}.`;
                            }
                            newState.players[newState.currentPlayerIndex] = currentPlayer;
                            return newState;

                        case MonopolyTypes.DAM:
                            //local variables
                            const dam = currentPlayerField as DamType;
                            //check if dam is owned
                            if (!dam.owner) {
                                break;
                            } else if (dam.owner !== currentPlayer.id) {
                                //data change
                                currentPlayer.money -= dam.rent;
                                newState.players[(dam.owner as number) - 1].money += dam.rent;
                                //message change
                                newState.moneyMessage = `${currentPlayer.name} paid ${dam.rent} 000 Kč to Player ${newState.players[dam.owner - 1].name}.`;
                            }
                            newState.players[newState.currentPlayerIndex] = currentPlayer;
                            return newState;

                        case MonopolyTypes.JANITOR:
                            //local variables
                            const janitor = currentPlayerField as JanitorType;
                            //data change
                            currentPlayer.janitorRounds += 1;
                            //check if player already is on janitor
                            if (currentPlayer.janitorRounds < 4 && currentPlayer.janitorRounds > 1) {
                                //message change
                                newState.message = `${currentPlayer.name} is with the Janitor for ${currentPlayer.janitorRounds} rounds.`
                                //local variables
                                const dice1 = Math.floor(Math.random() * 6) + 1;
                                const dice2 = Math.floor(Math.random() * 6) + 1;
                                //check if player rolled doubles or is on janitor for at least 4 rounds
                                if (dice1 == dice2 || currentPlayer.janitorRounds >= 4) {
                                    //data change
                                    janitor.players = janitor.players.filter(playerId => playerId !== currentPlayer.id);
                                    currentPlayer.janitorRounds = 0;
                                    //message change
                                    if (dice1 == dice2) {
                                        newState.message = `${currentPlayer.name} rolled doubles and left the Janitor.`
                                    } else {
                                        newState.message = `${currentPlayer.name} left the Janitor.`
                                    }
                                    diceRoll();
                                }
                            } else {
                                //data change
                                janitor.players.push(currentPlayer.id);
                                //message change
                                newState.message = `${currentPlayer.name} is with the Janitor.`
                            }
                            newState.players[newState.currentPlayerIndex] = currentPlayer;
                            return newState;

                        case MonopolyTypes.BUS:
                            newState.players[newState.currentPlayerIndex] = currentPlayer;
                            return newState;

                        case MonopolyTypes.TAX:
                            //local variables
                            const tax = currentPlayerField as TaxType;
                            //data change
                            currentPlayer.money -= tax.price;
                            //message change
                            newState.moneyMessage = `${currentPlayer.name} paid ${tax.price} 000 Kč in taxes.`;
                            newState.players[newState.currentPlayerIndex] = currentPlayer;
                            return newState;

                        case MonopolyTypes.FREE_FIELD:
                            newState.players[newState.currentPlayerIndex] = currentPlayer;
                            return newState;

                        case MonopolyTypes.START:
                            currentPlayer.round--;
                            diceRoll();
                            newState.message = `You landed on Start, play again!`
                            newState.players[newState.currentPlayerIndex] = currentPlayer;
                            return newState;

                        case MonopolyTypes.GAMBA:
                            const gambaCard = GambaCards[Math.floor(Math.random() * GambaCards.length)];
                            newState.message = `${gambaCard.text}`;
                            switch (gambaCard.id) {
                                case 1:
                                    currentPlayer.position = 0;
                                    //currentPlayer.money += (newState.gameBoard.fields.find(field => field.type === MonopolyTypes.START) as StartType).reward;
                                    break;
                                case 2:
                                    const incineratorField = newState.gameBoard.fields.find(field => field.type === MonopolyTypes.INCINERATOR) as IncineratorType;
                                    const damField = newState.gameBoard.fields.find(field => field.type === MonopolyTypes.DAM) as DamType;
                                    if (Math.abs(currentPlayer.position - incineratorField.id) < Math.abs(currentPlayer.position - damField.id)) {
                                        currentPlayer.position = incineratorField.id;
                                    } else if (Math.abs(currentPlayer.position - incineratorField.id) > Math.abs(currentPlayer.position - damField.id)) {
                                        currentPlayer.position = damField.id;
                                    } else {
                                        currentPlayer.position = Math.random() > 0.5 ? incineratorField.id : damField.id;
                                    }
                                    if (incineratorField.owner !== (currentPlayer.id || undefined)) {
                                        const utilityPay = 10 * ((Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1))
                                        currentPlayer.money -= utilityPay;
                                        newState.moneyMessage = `${currentPlayer.name} paid ${utilityPay} 000 Kč.`;
                                    }
                                    break;
                                case 3:
                                    const tramStopFields = newState.gameBoard.fields.filter(field => field.type === MonopolyTypes.TRAM_STOP) as TramStopType[];
                                    if (tramStopFields[0].id - currentPlayer.position < (tramStopFields[1].id - currentPlayer.position && tramStopFields[2].id - currentPlayer.position && tramStopFields[3].id - currentPlayer.position)) {
                                        currentPlayer.position = tramStopFields[0].id;
                                    } else if (tramStopFields[1].id - currentPlayer.position < (tramStopFields[0].id - currentPlayer.position && tramStopFields[2].id - currentPlayer.position && tramStopFields[3].id - currentPlayer.position)) {
                                        currentPlayer.position = tramStopFields[1].id;
                                    } else if (tramStopFields[2].id - currentPlayer.position < (tramStopFields[0].id - currentPlayer.position && tramStopFields[1].id - currentPlayer.position && tramStopFields[3].id - currentPlayer.position)) {
                                        currentPlayer.position = tramStopFields[2].id;
                                    } else if (tramStopFields[3].id - currentPlayer.position < (tramStopFields[0].id - currentPlayer.position && tramStopFields[1].id - currentPlayer.position && tramStopFields[2].id - currentPlayer.position)) {
                                        currentPlayer.position = tramStopFields[3].id;
                                    } else if (tramStopFields[0].id - currentPlayer.position === (tramStopFields[1].id - currentPlayer.position || tramStopFields[3].id - currentPlayer.position)) {
                                        const rand = Math.random()
                                        currentPlayer.position = (rand > 0.35 ? tramStopFields[0].id : (rand < 0.65 ? tramStopFields[1].id : tramStopFields[3].id));
                                    } else if (tramStopFields[2].id - currentPlayer.position === (tramStopFields[1].id - currentPlayer.position || tramStopFields[3].id - currentPlayer.position)) {
                                        const rand = Math.random()
                                        currentPlayer.position = (rand > 0.35 ? tramStopFields[1].id : (rand < 0.65 ? tramStopFields[2].id : tramStopFields[3].id));
                                    }
                                    break
                                case 4:
                                    currentPlayer.money += 50;
                                    break;
                                case 5:
                                    currentPlayer.money += 200;
                                    break;
                                case 6:
                                    currentPlayer.position -= 3;
                                    if (currentPlayer.position < 0) {
                                        currentPlayer.position = state.gameBoard.fields.length + currentPlayer.position;
                                    }
                                    break;
                                case 7:
                                    const janitorField = newState.gameBoard.fields.find(field => field.type === MonopolyTypes.JANITOR) as JanitorType;
                                    currentPlayer.position = janitorField.id;
                                    break;
                                case 8:
                                    currentPlayer.money -= 25 * currentPlayer.districts.length;
                                    newState.moneyMessage = `${currentPlayer.name} paid ${25 * currentPlayer.districts.length} 000 Kč.`;
                                    break;
                                case 9:
                                    currentPlayer.money -= 15;
                                    break;
                                case 10:
                                    for (const player of newState.players) {
                                        if (player.id !== currentPlayer.id && !player.bankrupt) {
                                            player.money += 50;
                                            currentPlayer.money -= 50;
                                        }
                                    }
                                    newState.moneyMessage = `${currentPlayer.name} paid 50 000 Kč to each player.`;
                                    break;
                                case 11:
                                    currentPlayer.money += 150;
                                    break;
                                case 12:
                                    currentPlayer.money += 100;
                                    break;
                            }
                            newState.players[newState.currentPlayerIndex] = currentPlayer;
                            return newState;
                        case MonopolyTypes.DAVKY:
                            const davkyCard = DavkyCards[Math.floor(Math.random() * GambaCards.length)];
                            newState.message = `${davkyCard.text}`;
                            switch (davkyCard.id) {
                                case 1:
                                    currentPlayer.position = 0;
                                    break;
                                case 2:
                                    currentPlayer.money += 200;
                                    break;
                                case 3:
                                    currentPlayer.money -= 50;
                                    break;
                                case 4:
                                    currentPlayer.money += 50;
                                    break;
                                case 5:
                                    currentPlayer.money -= 100;
                                    break;
                                case 6:
                                    const janitorField = newState.gameBoard.fields.find(field => field.type === MonopolyTypes.JANITOR) as JanitorType;
                                    currentPlayer.position = janitorField.id;
                                    break;
                                case 7:
                                    for (const player of newState.players) {
                                        if (player.id !== currentPlayer.id && !player.bankrupt) {
                                            player.money -= 50;
                                            currentPlayer.money += 50;
                                        }
                                    }
                                    newState.moneyMessage = `${currentPlayer.name} received 50 000 Kč from each player.`;
                                    break;
                                case 8:
                                    currentPlayer.money += 100;
                                    break;
                                case 9:
                                    currentPlayer.money += 20;
                                    break;
                                case 10:
                                    for (const player of newState.players) {
                                        if (player.id !== currentPlayer.id && !player.bankrupt) {
                                            player.money -= 10;
                                            currentPlayer.money += 10;
                                        }
                                    }
                                    newState.moneyMessage = `${currentPlayer.name} received 10 000 Kč from each player.`;
                                    break;
                                case 11:
                                    currentPlayer.money += 100;
                                    break;
                                case 12:
                                    currentPlayer.money -= 100;
                                    break;
                                case 13:
                                    currentPlayer.money -= 50;
                                    break;
                                case 14:
                                    currentPlayer.money += 25;
                                    break;
                                case 15:
                                    currentPlayer.money -= 40;
                                    break;
                                case 16:
                                    currentPlayer.money += 20;
                                    break;
                            }
                            newState.players[newState.currentPlayerIndex] = currentPlayer;
                            return newState;
                    }
                }
                let position = currentPlayer.position;
                onStepField();
                if (position !== currentPlayer.position) {
                    onStepField();
                }
            }
            newState.players[newState.currentPlayerIndex] = currentPlayer;
            return newState;
        }
        case 'BUY_PROPERTY': {
            //check if player already played this round
            if (!state.roundActionBool) {
                //check if field is district
                if (currentPlayerField.type === MonopolyTypes.DISTRICT) {
                    //local variables
                    const district = currentPlayerField as DistrictType;
                    //check if district is owned and player has enough money
                    if (!district.owner && currentPlayer.money >= district.price) {
                        //data change
                        currentPlayer.districts.push(district.id);
                        currentPlayer.money -= district.price;
                        (newState.gameBoard.fields[currentPlayer.position] as DistrictType).owner = currentPlayer.id;
                        (newState.gameBoard.fields[currentPlayer.position] as DistrictType).level = 1;
                        newState.roundActionBool = true;
                        //message change
                        newState.moneyMessage = `${currentPlayer.name} has paid ${district.price} 000 Kč for ${district.text}.`;
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
                        currentPlayer.tramStops.push(tramStop.id);
                        currentPlayer.money -= tramStop.price;
                        (newState.gameBoard.fields[currentPlayer.position] as TramStopType).owner = currentPlayer.id;
                        newState.roundActionBool = true;
                        //message change
                        newState.moneyMessage = `${currentPlayer.name} has paid ${tramStop.price} 000 Kč for ${tramStop.text}.`;
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
                        currentPlayer.incinerators.push(incinerator.id);
                        currentPlayer.money -= incinerator.price;
                        (newState.gameBoard.fields[currentPlayer.position] as IncineratorType).owner = currentPlayer.id;
                        newState.roundActionBool = true;
                        //message change
                        newState.moneyMessage = `${currentPlayer.name} has paid ${incinerator.price} 000 Kč for ${incinerator.text}.`;
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
                        currentPlayer.dams.push(dam.id);
                        currentPlayer.money -= dam.price;
                        (newState.gameBoard.fields[currentPlayer.position] as DamType).owner = currentPlayer.id;
                        newState.roundActionBool = true;
                        //message change
                        newState.moneyMessage = `${currentPlayer.name} has paid ${dam.price} 000 Kč for ${dam.text}.`;
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
            newState.players[newState.currentPlayerIndex] = currentPlayer;
            return newState;
        }
        case "UPGRADE": {
            //check if player already played this round
            if (!state.roundActionBool) {
                //check if field is district and is owned by the current player
                if (currentPlayerField.type === MonopolyTypes.DISTRICT && currentPlayerField.owner === currentPlayer.id) {
                    //local variables
                    const district = currentPlayerField as DistrictType;
                    //check if player has enough money and district level is lower than 4
                    if (district.level < 4 && currentPlayer.money >= district.price) {
                        //local variables
                        const upgradePrice = Math.round(district.price / 2) * district.level;
                        //data change
                        currentPlayer.money -= upgradePrice;
                        (newState.gameBoard.fields[currentPlayer.position] as DistrictType).level += 1;
                        (newState.gameBoard.fields[currentPlayer.position] as DistrictType).rent *= 2;
                        newState.roundActionBool = true;
                        //message change
                        newState.message = `${currentPlayer.name} upgraded ${district.text} to level ${district.level}.`;
                        newState.moneyMessage = `${currentPlayer.name} has paid ${upgradePrice} 000 Kč.`;
                    } else if (district.level === 4) {
                        //message change
                        newState.message = "You can't upgrade this district. It's already at max level.";
                    } else if (currentPlayer.money >= district.price) {
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
            newState.players[newState.currentPlayerIndex] = currentPlayer;
            return newState;
        }
        case "SELL": {
            //check if player already played this round
            if (!state.roundActionBool) {
                //check if the field is sellable and owned by the current player
                if ((currentPlayerField.type === MonopolyTypes.DISTRICT || currentPlayerField.type === MonopolyTypes.TRAM_STOP || currentPlayerField.type === MonopolyTypes.INCINERATOR || currentPlayerField.type === MonopolyTypes.DAM) && currentPlayerField.owner === currentPlayer.id) {
                    //local variables
                    const sellableField = currentPlayerField as DistrictType | TramStopType | IncineratorType | DamType;
                    //data change
                    currentPlayer.money += sellableField.price;
                    if (sellableField.type === MonopolyTypes.DISTRICT) {
                        (newState.gameBoard.fields[currentPlayer.position] as DistrictType).level = 0;
                    }
                    (newState.gameBoard.fields[currentPlayer.position] as DistrictType | TramStopType | IncineratorType | DamType).owner = undefined;
                    newState.roundActionBool = true;
                    //message change
                    newState.moneyMessage = `${currentPlayer.name} has received ${sellableField.price} 000 Kč for selling ${sellableField.text}.`;
                } else {
                    //message change
                    newState.message = "You can't sell this field.";
                }
            }
            newState.players[newState.currentPlayerIndex] = currentPlayer;
            return newState;
        }
        case "BUS_TRAVEL": {
            //local variables
            const player = newState.players[action.payload.playerId];
            const travelDestination = newState.gameBoard.fields.find(field => field.id === action.payload.fieldId);
            //data change
            currentPlayer.round++;
            player.position = travelDestination?.id!;
            //message change
            newState.message = `${player.name} has traveled to ${travelDestination?.text}.`;
            return newState;
        }
        case "END_TURN": {
            //check if player won
            //check if player is bankrupt
            checkWin(newState);
            if (currentPlayer.money <= 0) {
                if (currentPlayer.districts.length !== 0 || currentPlayer.tramStops.length !== 0 || currentPlayer.incinerators.length !== 0 || currentPlayer.dams.length !== 0) {
                    for (const district of currentPlayer.districts) {
                        currentPlayer.money += (newState.gameBoard.fields[district] as DistrictType).price;
                    }
                    for (const tramStop of currentPlayer.tramStops) {
                        currentPlayer.money += (newState.gameBoard.fields[tramStop] as TramStopType).price;
                    }
                    for (const incinerator of currentPlayer.incinerators) {
                        currentPlayer.money += (newState.gameBoard.fields[incinerator] as IncineratorType).price;
                    }
                    for (const dam of currentPlayer.dams) {
                        currentPlayer.money += (newState.gameBoard.fields[dam] as DamType).price;
                    }
                    newState.moneyMessage = `${currentPlayer.name} sold all their properties and received ${currentPlayer.money} 000 Kč.`;
                    bankruptFunc(false)
                } else {
                    bankruptFunc()
                }
            }
            //while loop for changing players
                //data change
            newState.currentPlayerIndex = (newState.currentPlayerIndex + 1) % newState.players.length;
            newState.roundActionBool = false;
            if (newState.currentPlayerIndex === 0) {
                newState.round += 1;
            }
            if (newState.winner) {
                newState.players[newState.currentPlayerIndex] = currentPlayer;
                return newState;
            }
            currentPlayer = newState.players[newState.currentPlayerIndex];
            while (currentPlayer.bankrupt) {
                newState.currentPlayerIndex = (newState.currentPlayerIndex + 1) % newState.players.length;
                if (newState.currentPlayerIndex === 0) {
                    newState.round += 1;
                }
                currentPlayer = newState.players[newState.currentPlayerIndex];
            }
            //message change
            newState.message = `${currentPlayer.name} started their turn.`;
            newState.players[newState.currentPlayerIndex] = currentPlayer;
            return newState;
        }
        case "RESET":
            return initialState;
        case "RESTORE":
            return action.gameState;
        default:
            return newState;
    }
}

export const GameProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [buttonClicked, setButtonClicked] = React.useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("gameState");
        if (saved) {
            const parsed: GameState = JSON.parse(saved);
            if ((parsed.round === 1 && parsed.currentPlayerIndex !== 0) || (parsed.round !== 1)) {
                dispatch({type: "RESTORE", gameState: parsed});
            }
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("gameState", JSON.stringify(state));
    }, [state])

    return (
        <GameContext.Provider value={{ state, dispatch, button: {buttonClicked, setButtonClicked}}}>
            {children}
        </GameContext.Provider>
    );
}
export default GameProvider;
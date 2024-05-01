import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {GameContext} from '../providers/MonopolyProvider.tsx';
import {InfoBox} from "../components/InfoBox.tsx";
import {ButtonBox} from "../components/ButtonBox.tsx";

const GameBoardPage: React.FC = () => {
    const { state } = useContext(GameContext);



    return (
        <div>
            <InfoBox players={state.players} money={[state.players[0].money, state.players[1].money, state.players[2].money, state.players[3].money]} currentPlayerIndex={state.currentPlayerIndex} round={state.round} />
            <pre>{JSON.stringify(state.players, null, 2)}</pre>
            <ButtonBox />
            <Link to="/">Back to Home</Link>
        </div>
    );
};

export default GameBoardPage;
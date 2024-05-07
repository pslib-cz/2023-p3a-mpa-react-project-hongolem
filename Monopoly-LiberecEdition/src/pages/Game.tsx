import React, {useContext} from 'react';
import {GameContext} from '../providers/MonopolyProvider.tsx';
import {InfoBox} from "../components/InfoBox.tsx";
import {ButtonBox} from "../components/ButtonBox.tsx";
import Field from "../components/Field.tsx";
import Styles from "./Game.module.css";

const GameBoardPage: React.FC = () => {
    const { state } = useContext(GameContext);
    
    return (
        <div className={Styles["game"]}>
            <div className={Styles["alignUp"]}>
                <InfoBox />
            </div>
            <div className={Styles["board"]}>
                {state.gameBoard.fields.map((field, index) => {
                    return (
                        <>
                            <Field key={index} index={index} field={field}/>
                        </>
                    );
                })}
                <div className={Styles["textContainer"]}>
                    <p className={Styles["moneyMessage"]}>
                        {state.moneyMessage}
                    </p>
                    <p className={Styles["message"]}>
                        {state.message}
                    </p>
                    <p className={Styles["rollMessage"]}>
                        {state.rollMessage}
                    </p>
                </div>
            </div>
            <ButtonBox/>
        </div>
    );
};

export default GameBoardPage;
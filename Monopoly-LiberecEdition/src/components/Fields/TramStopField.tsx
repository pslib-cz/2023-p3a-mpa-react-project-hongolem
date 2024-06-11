import {FieldType, MonopolyTypes, TramStopType} from "../../types/MonopolyTypes.tsx";
import {FC, useContext} from "react";
import Styles from "../Field.module.css";
import TramStopImg1 from "/img/TramStops/TramStop-LS.jpg";
import TramStopImg2 from "/img/TramStops/TramStop-HH.jpg";
import TramStopImg3 from "/img/TramStops/TramStop-SN.jpg";
import TramStopImg4 from "/img/TramStops/TramStop-PS.jpg";
import {GameContext} from "../../providers/MonopolyProvider.tsx";

interface TramStopFieldProps {
    field: FieldType;
}

export const TramStopField: FC<TramStopFieldProps> = ({field}) => {
    const tramStop = field as TramStopType;
    const {state} = useContext(GameContext);

    return (
        <>
            <div className={Styles["field__misc"]}>
                <div>
                    <p className={Styles["field__title"]}>{tramStop.text}</p>
                    <p className={Styles["field__price"]}>{tramStop.price} 000 Kč</p>
                </div>
                <div className={Styles["field__imgBox"]}>
                    {
                        (tramStop.id === state.gameBoard.fields.filter(tramStop => tramStop.type === MonopolyTypes.TRAM_STOP)[0].id) ?
                            <img className={Styles["field__img"]} src={TramStopImg1} alt={tramStop.text} />
                        :((tramStop.id === state.gameBoard.fields.filter(tramStop => tramStop.type === MonopolyTypes.TRAM_STOP)[1].id) ?
                            <img className={Styles["field__img"]} src={TramStopImg2} alt={tramStop.text} />
                        :((tramStop.id === state.gameBoard.fields.filter(tramStop => tramStop.type === MonopolyTypes.TRAM_STOP)[2].id) ?
                            <img className={Styles["field__img"]} src={TramStopImg3} alt={tramStop.text} />
                        :((tramStop.id === state.gameBoard.fields.filter(tramStop => tramStop.type === MonopolyTypes.TRAM_STOP)[3].id) ?
                            <img className={Styles["field__img"]} src={TramStopImg4} alt={tramStop.text} />
                        : null)))
                    }
                </div>
            </div>
            <div className={Styles["tooltipText"]}>
                <p>Rent: {tramStop.rent} 000 Kč</p>
            </div>
        </>
    );
};

export default TramStopField;
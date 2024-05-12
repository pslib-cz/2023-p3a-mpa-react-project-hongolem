import {TramStopType, FieldType} from "../../types/MonopolyTypes.tsx";
import {FC} from "react";
import Styles from "../Field.module.css";

interface TramStopFieldProps {
    field: FieldType;
}

export const TramStopField: FC<TramStopFieldProps> = ({field}) => {
    const tramStop = field as TramStopType;

    return (
        <>
            <div className={Styles["field__misc"]}>
                <p className={Styles["field__title"]}>{tramStop.text}</p>
                <p className={Styles["field__price"]}>{tramStop.price} 000 Kč</p>
            </div>
            {/*
            <div className={Styles["field__imgBox"]}>
                <img className={Styles["field__img"]} src={tramStop.img} alt={tramStop.text} />
            </div>
            */}
            <div className={Styles["tooltipText"]}>
                <p>Rent: {tramStop.rent} 000 Kč</p>
            </div>
        </>
    );
};

export default TramStopField;
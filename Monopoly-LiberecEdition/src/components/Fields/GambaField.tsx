import {GambaType, FieldType} from "../../types/MonopolyTypes.tsx";
import {FC} from "react";
import Styles from "../Field.module.css";
import GambaImg from "/img/Gamba.gif";

interface GambaFieldProps {
    field: FieldType;
}

export const GambaField: FC<GambaFieldProps> = ({field}) => {
    const gamba = field as GambaType;

    return (
        <>
            <div className={Styles["field__misc"]}>
                <p className={Styles["field__title"]}>{gamba.text}</p>
                <div className={Styles["field__imgBox"]}>
                    <img className={Styles["field__img"]} src={GambaImg} alt={gamba.text} />
                </div>
            </div>

        </>
    );
};

export default GambaField;
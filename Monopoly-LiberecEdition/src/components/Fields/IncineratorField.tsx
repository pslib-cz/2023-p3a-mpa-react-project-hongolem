import {IncineratorType, FieldType} from "../../types/MonopolyTypes.tsx";
import {FC} from "react";
import Styles from "../Field.module.css";
import IncineratorImg from "/img/Incinerator.jpg";

interface IncineratorFieldProps {
    field: FieldType;
}

export const IncineratorField: FC<IncineratorFieldProps> = ({field}) => {
    const incinerator = field as IncineratorType;

    return (
        <>
            <div className={Styles["field__misc"]}>
                <div>
                    <p className={Styles["field__title"]}>{incinerator.text}</p>
                    <p className={Styles["field__price"]}>{incinerator.price} 000 Kč</p>
                </div>
                <div className={Styles["field__imgBox"]}>
                    <img className={Styles["field__img"]} src={IncineratorImg} alt={incinerator.text} />
                </div>
            </div>
            <div className={Styles["tooltipText"]}>
                <p>Rent: {incinerator.rent} 000 Kč</p>
            </div>
        </>
    );
};

export default IncineratorField;
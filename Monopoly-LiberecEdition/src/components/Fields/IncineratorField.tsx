import {IncineratorType, FieldType} from "../../types/MonopolyTypes.tsx";
import {FC} from "react";
import Styles from "../Field.module.css";

interface IncineratorFieldProps {
    field: FieldType;
}

export const IncineratorField: FC<IncineratorFieldProps> = ({field}) => {
    const incinerator = field as IncineratorType;

    return (
        <>
            <div className={Styles["field__misc"]}>
                <p className={Styles["field__title"]}>{incinerator.text}</p>
                <p className={Styles["field__price"]}>{incinerator.price} Kč</p>
            </div>
            {/*
            <div className={Styles["field__imgBox"]}>
                <img className={Styles["field__img"]} src={incinerator.img} alt={incinerator.text} />
            </div>
            */}

        </>
    );
};

export default IncineratorField;
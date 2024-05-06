import {DamType, FieldType} from "../../types/MonopolyTypes.tsx";
import {FC} from "react";
import Styles from "../Field.module.css";

interface DamFieldProps {
    field: FieldType;
}

export const DamField: FC<DamFieldProps> = ({field}) => {
    const dam = field as DamType;

    return (
        <>
            <div className={Styles["field__misc"]}>
                <p className={Styles["field__title"]}>{dam.text}</p>
                <p className={Styles["field__price"]}>{dam.price} Kč</p>
            </div>
            {/*
            <div className={Styles["field__imgBox"]}>
                <img className={Styles["field__img"]} src={dam.img} alt={dam.text} />
            </div>
            */}

        </>
    );
};

export default DamField;
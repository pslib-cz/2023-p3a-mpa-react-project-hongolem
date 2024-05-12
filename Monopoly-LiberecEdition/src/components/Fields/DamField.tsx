import {DamType, FieldType} from "../../types/MonopolyTypes.tsx";
import {FC} from "react";
import Styles from "../Field.module.css";
import DamImg from "/img/Dam.jpg";

interface DamFieldProps {
    field: FieldType;
}

export const DamField: FC<DamFieldProps> = ({field}) => {
    const dam = field as DamType;

    return (
        <>
            <div className={Styles["field__misc"]}>
                <p className={Styles["field__title"]}>{dam.text}</p>
                <p className={Styles["field__price"]}>{dam.price} 000 Kč</p>
                <div className={Styles["field__imgBox"]}>
                    <img className={Styles["field__img"]} src={DamImg} alt={dam.text} />
                </div>
            </div>
            <div className={Styles["tooltipText"]}>
                <p>Rent: {dam.rent} 000 Kč</p>
            </div>
        </>
    );
};

export default DamField;
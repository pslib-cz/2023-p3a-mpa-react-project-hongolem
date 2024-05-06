import {TaxType, FieldType} from "../../types/MonopolyTypes.tsx";
import {FC} from "react";
import Styles from "../Field.module.css";

interface TaxFieldProps {
    field: FieldType;
}

export const TaxField: FC<TaxFieldProps> = ({field}) => {
    const tax = field as TaxType;

    return (
        <>
            <div className={Styles["field__misc"]}>
                <p className={Styles["field__title"]}>{tax.text}</p>
            </div>
            {/*
            <div className={Styles["field__imgBox"]}>
                <img className={Styles["field__img"]} src={tax.img} alt={tax.text} />
            </div>
            */}

        </>
    );
};

export default TaxField;
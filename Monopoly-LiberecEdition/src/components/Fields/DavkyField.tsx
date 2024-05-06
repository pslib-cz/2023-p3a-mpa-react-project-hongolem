import {DavkyType, FieldType} from "../../types/MonopolyTypes.tsx";
import {FC} from "react";
import Styles from "../Field.module.css";

interface DavkyFieldProps {
    field: FieldType;
}

export const DavkyField: FC<DavkyFieldProps> = ({field}) => {
    const davky = field as DavkyType;

    return (
        <>
            <div className={Styles["field__misc"]}>
                <p className={Styles["field__title"]}>{davky.text}</p>
            </div>
            {/*
            <div className={Styles["field__imgBox"]}>
                <img className={Styles["field__img"]} src={davky.img} alt={davky.text} />
            </div>
            */}

        </>
    );
};

export default DavkyField;
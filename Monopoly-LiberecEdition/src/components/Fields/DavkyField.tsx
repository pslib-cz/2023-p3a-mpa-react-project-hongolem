import {DavkyType, FieldType} from "../../types/MonopolyTypes.tsx";
import {FC} from "react";
import Styles from "../Field.module.css";
import DavkyImg from "/img/Davky.jpeg";

interface DavkyFieldProps {
    field: FieldType;
}

export const DavkyField: FC<DavkyFieldProps> = ({field}) => {
    const davky = field as DavkyType;

    return (
        <>
            <div className={Styles["field__misc"]}>
                <p className={Styles["field__title"]}>{davky.text}</p>
                <div className={Styles["field__imgBox"]}>
                    <img className={Styles["field__img"]} src={DavkyImg} alt={davky.text} />
                </div>
            </div>
        </>
    );
};

export default DavkyField;
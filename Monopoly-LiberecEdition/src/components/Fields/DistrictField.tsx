import {DistrictType, FieldType} from "../../types/MonopolyTypes.tsx";
import {FC} from "react";
import Styles from "../Field.module.css";


interface DistrictFieldProps {
    field: FieldType;
}

export const DistrictField: FC<DistrictFieldProps> = ({field}) => {
    const district = field as DistrictType;

    return (
        <>
            <div className={`${Styles["field__top"]} ${Styles[`field__top--mnpl${district.monopolyId}`]}`}/>
            <div className={Styles["field__bottom"]}>
                <p className={Styles["field__title"]}>{district.text}</p>
                <p className={Styles["field__price"]}>{district.price} Kč</p>
            </div>
        </>
    );
};

export default DistrictField;
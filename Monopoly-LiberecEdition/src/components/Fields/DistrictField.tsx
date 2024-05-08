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
            <div className={Styles["upgrade__container"]}>
                {
                    (district.level > 1) &&
                    <div className={Styles["district__level2"]} />
                }
                {
                    (district.level > 2) &&
                    <div className={Styles["district__level3"]} />
                }
                {
                    (district.level > 3) &&
                    <div className={Styles["district__level4"]} />
                }
            </div>
        </>
    );
};

export default DistrictField;
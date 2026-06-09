import { forwardRef } from "react";
import "./DividerThirdStyle.css"

const DividerThirdStyle = forwardRef(function DividerFirstStyle(props, thirdDividerRef) {

    return (
        <>
            <div className="ThirdDividerStyle" ref={thirdDividerRef}>
                <div className="GriffinWing left">
                    <img src="./static/GriffinWing.png"/>
                </div>

                <div className="GMWSLogo">
                    <img src="./static/GriffinLogoBlack.png"/>
                </div>

                <div className="GriffinWing right">
                    <img src="./static/GriffinWing.png"/>
                </div>
            </div>
        </>
    )
});

export default DividerThirdStyle;
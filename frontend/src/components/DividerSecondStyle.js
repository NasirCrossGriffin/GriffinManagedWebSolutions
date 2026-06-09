import { forwardRef } from "react";
import "./DividerSecondStyle.css"

const DividerSecondStyle = forwardRef(function DividerFirstStyle(props, secondDividerRef) {

    return (
        <>
            <div className="SecondDividerStyle" ref={secondDividerRef}>
                <div className="BlackGriffin">
                    <img src="./static/BlackGriffin.png"/>
                </div>

                <div className="GMWSLogo">
                    <img src="./static/GriffinLogoBlack.png"/>
                </div>
            </div>
        </>
    )
});

export default DividerSecondStyle;
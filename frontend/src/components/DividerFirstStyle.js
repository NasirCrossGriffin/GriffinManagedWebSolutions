import "./DividerFirstStyle.css"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { forwardRef } from "react";


const DividerFirstStyle = forwardRef(function DividerFirstStyle(props, firstDividerRef) {
    return (
        <>
            <div className="FirstDividerStyle" ref={firstDividerRef}>
                <div className="GMWSLogo">
                    <img src="./static/GriffinLogoBlack.png"/>
                </div>

                <div className="Slash">
                    <img src="./static/SlashAssets.png"/>
                </div>
            </div>
        </>
    )
});

export default DividerFirstStyle;
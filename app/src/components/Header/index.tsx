import "@/styles/header.css";
import Image from "next/image";
import { FC } from "react";
import HeaderProfile from "./HeaderProfile";

const LoopDiggerIconImg = () => <div id="loop-digger-icon-container">
    <Image
        id="loop-digger-icon"
        src="/images/loop-digger-icon.svg"
        fill={true}
        alt="Loop Digger Icon"
    />
</div>;

const Header: FC = () => {

    return (
        <div id="header">

            <LoopDiggerIconImg />

            <div className="search">
            </div>

            <HeaderProfile />

        </div>
    );
};

export default Header;

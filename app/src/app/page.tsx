import "@/styles/home.css";
import PlayerTest from "@/components/PlayerTest";
import Header from "@/components/Header";
import { DummyStyledInput } from "@/components/StyledInput";

const Page = () => {

    return (
        <main className={ "home" }>

            <DummyStyledInput />

            <PlayerTest />

        </main>
    );
};

export default Page;

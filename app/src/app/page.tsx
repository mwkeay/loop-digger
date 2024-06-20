import "@/styles/home.css";
import PlayerTest from "@/components/PlayerTest";
import Header from "@/components/Header";

const Page = () => {

    return (
        <main className={ "home" }>

            <Header />

            <PlayerTest />

        </main>
    );
};

export default Page;

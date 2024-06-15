"use server";

const ServerTest = async () => {

    return (
        <div>
            <pre>{ JSON.stringify({ Hello: "World!"}, null, 4) }</pre>
        </div>
    );
};

export default ServerTest;

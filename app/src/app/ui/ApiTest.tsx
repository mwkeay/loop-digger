"use server";

import apiTest from "../actions/apiTest";
import ClientTest from "./ClientTest";

const ApiTest = async () => {

    const me = await apiTest();

    return (
        <div>
            <pre>{ JSON.stringify(me, null, 4) }</pre>
        </div>
    );
};

export default ApiTest;

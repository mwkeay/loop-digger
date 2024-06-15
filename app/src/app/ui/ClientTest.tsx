"use client";

import { useState } from "react";
import ServerTest from "./ServerTest";

const ClientTest = () => {

    const [state, setState] = useState(false);

    return (
        <div>
            <button onClick={ () => setState(true) } disabled={ state }>ON</button>
            <button onClick={ () => setState(false) } disabled={ !state }>OFF</button>
            <ServerTest />
        </div>
    );
};

export default ClientTest;

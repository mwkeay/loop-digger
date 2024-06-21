"use client";

import { ChangeEvent, FC, useRef, useState } from "react";
import "@/styles/styled-input.css";

interface StyledInputProps {
    callback: (value: string) => void
    errorMessage?: string
    filter?: (value: string) => boolean
    id?: string
    label?: string
}

const StyledInput: FC<StyledInputProps> = ({ callback, errorMessage, filter, id, label }) => {

    const [value, setValue] = useState("");

    const labelRef = useRef<HTMLLabelElement>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (filter && !filter(value)) return; // Check if input fails possible filter

        setValue(value); // Set component state
        callback(value); // Pass state to parent

        if (value) {
            labelRef.current?.classList.add("styled-input-label-up"); // Raise label if input not empty
        } else {
            labelRef.current?.classList.remove("styled-input-label-up"); // Lower label if input empty
        }
    };

    return (
        <div className={ "styled-input" + (errorMessage ? " styled-input-error" : "") }>

            {
                label
                    && <label ref={ labelRef } htmlFor={ id }>{ label }</label>
            }

            <input
                id={ id }
                value={ value }
                onChange={ handleChange }
            />

            {
                errorMessage
                    && <span>{ errorMessage }</span>
            }

        </div>
    );
};

export const DummyStyledInput = () => {

    const [isError, setIsError] = useState(false);

    return (
        <StyledInput
            callback={ (value: string) => value.includes("ERROR") ? setIsError(true) : setIsError(false) }
            errorMessage={ isError ? "Error: This didn't work." : undefined }
            filter={ (value: string) => !/\d/.test(value) }
            id="dummy-styled-input"
            label="This is a really fucking long input"
        />
    );
};

export default StyledInput;

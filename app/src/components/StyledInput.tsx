"use client";

import { ChangeEvent, FC, FunctionComponent, SVGProps, useRef, useState } from "react";
import "@/styles/styled-input.css";
import Image from "next/image";

interface StyledInputProps {
    callback: (value: string) => void
    errorMessage?: string
    filter?: (value: string) => boolean
    iconPath?: string
    id?: string
    label?: string
    spellCheck?: boolean
}

const StyledInput: FC<StyledInputProps> = ({ callback, errorMessage, filter, iconPath, id, label, spellCheck = false }) => {

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
        <div className={
            "styled-input"
            + (errorMessage ? " styled-input-error" : "")
            + (iconPath ? " styled-input-icon-indent" : "")
        }>

            {
                label
                    && <label ref={ labelRef } htmlFor={ id }>{ label }</label>
            }

            {
                iconPath && <div>
                    <Image
                        src={ iconPath }
                        layout="fill"
                        alt={ iconPath }
                    />
                </div>
            }

            <input
                id={ id }
                value={ value }
                onChange={ handleChange }
                spellCheck={ spellCheck }
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
            iconPath="/images/search-icon-white.svg"
            id="dummy-styled-input"
            label="This is a really fucking long input"
        />
    );
};

export default StyledInput;

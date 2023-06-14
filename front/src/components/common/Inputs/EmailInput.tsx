import {LegacyRef} from "react";

export interface EmailInputProps {
    name: string;
    placeholder?: string;
    value?: string;
    ref?: LegacyRef<HTMLInputElement>;
}

export default function EmailInput({name, placeholder, value, ref}: EmailInputProps) {
    return (
        <input
            className="barrel"
            type="email"
            name={name}
            placeholder={placeholder}
            defaultValue={value}
            maxLength={255}
            required
            ref={ref}
        />
    );
}
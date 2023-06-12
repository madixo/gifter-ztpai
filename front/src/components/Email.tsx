import { LegacyRef } from "react";

interface Props {
    name: string;
    placeholder?: string;
    value?: string;
    ref?: LegacyRef<HTMLInputElement>;
}

export default function Email({name, placeholder, value, ref}: Props) {

    return (

        <input className="barrel" type="email" name={name} placeholder={placeholder} defaultValue={value} maxLength={255} required ref={ref} />

    );

}
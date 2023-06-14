import {ChangeEventHandler} from 'react';

export interface PasswordInputProps {
    name?: string
    placeholder?: string
    ref?: React.Ref<HTMLInputElement>;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function PasswordInput({name, placeholder, ref, onChange}: PasswordInputProps) {
    return (
        <input
            className="barrel"
            type="password"
            name={name}
            placeholder={placeholder}
            pattern="(?=.*\d)(?=.*[\W_]).{7,}"
            title="Minimum 7 znaków, przynajmniej jedna duża litera, cyfra i znak specjalny."
            ref={ref}
            onChange={onChange}
            required
        />
    );
}
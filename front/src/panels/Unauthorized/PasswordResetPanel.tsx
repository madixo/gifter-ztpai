import FormMessages from "components/FormMessages";
import Button from "components/common/Button/Button";
import PasswordInput from "components/common/Inputs/PasswordInput";
import {FormEventHandler} from 'react';
import {useSearchParams} from "react-router-dom";

export default function PasswordResetPanel() {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (event) => {

        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const response = await fetch('http://localhost:3001/api/password-reset', {
            method: 'POST',
            headers: [
                ['Content-Type', 'application/json']
            ],
            body: JSON.stringify(Object.fromEntries(formData))
        }).then(r => r.json());

        console.log(response);

    }

    return (
        <div className="modal flex flex--column flex--center">
            <div className="title">
                <span>Zresetuj hasło</span>
            </div>
            <FormMessages />
            <form className="modal-form flex flex--column" onSubmit={handleFormSubmit}>
                <div className="inputs flex flex--column">
                    <PasswordInput name="password" placeholder="Nowe hasło" />
                    <PasswordInput placeholder="Powtórz hasło" />
                    <input type="hidden" name="id" value={searchParams.get('id') || ''} required />
                </div>
                <Button primary size="lg" label="Zresetuj">
                    Zresetuj
                </Button>
            </form>
        </div>
    )
}
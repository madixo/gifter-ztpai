import {FormEvent, useEffect, useState} from "react";

import {Link, useNavigate, useSearchParams} from "react-router-dom";

import FormMessages from "components/FormMessages";
import Button from 'components/common/Button/Button';
import EmailInput from "components/common/Inputs/EmailInput";
import PasswordInput from "components/common/Inputs/PasswordInput";
import {routes} from "constants/routes";
import {RegisterResponse} from "models/ServerResponses";

export default function RegisterPanel() {

    const [query] = useSearchParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {

        setMessage(query.get('m') || '');
        setError(query.get('e') || '');

    }, [query]);

    async function handleRegister(e: FormEvent<HTMLFormElement>) {

        e.preventDefault();

        let formData = new FormData(e.target as HTMLFormElement);

        try {

            let response: RegisterResponse = await fetch("http://localhost:3001/api/register", {
                method: 'POST',
                headers: [
                    ['Content-Type', 'application/json']
                ],
                body: JSON.stringify(Object.fromEntries(formData))
            }).then(r => r.json());

            if(response.status === 'ok')
                navigate(`${routes.LOGIN}?m=${response.message}`);
            else {
                setError(response.message);
                // (e.target as HTMLFormElement).reset();
            }

        } catch(err) {

            console.log(err);

        }

    }

    return (
        <div className="modal flex flex--column flex--center">
            <div className="title">
                <span>Zarejestruj się</span>
            </div>
            <FormMessages message={message} error={error} />
            <form className="modal-form flex flex--column" onSubmit={handleRegister}>
                <div className="inputs flex flex--column">
                    <EmailInput name="email" placeholder="Email" />
                    <PasswordInput name="password" placeholder="Hasło" />
                    <PasswordInput placeholder="Powtórz hasło" />
                    <label className="checkbox flex" htmlFor="tou">
                        <input type="checkbox" name="tou" required />
                        <div>Akceptuję <Link to="/terms-of-use">regulamin</Link></div>
                    </label>
                </div>
                <Button primary size="lg" label="Zarejestruj się">Zarejestruj</Button>
            </form>
            <div className="spacer--line"></div>
            <div className="additional-options flex flex--column flex--center">
                <span>Posiadasz konto? <Link to="/login">Zaloguj się</Link></span>
            </div>
        </div>

    )

}
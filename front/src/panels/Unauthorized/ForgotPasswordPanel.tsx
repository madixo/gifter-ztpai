import {FormEventHandler, useEffect, useState} from "react";

import {useNavigate, useSearchParams} from "react-router-dom";

import BackChevron from "components/BackChevron";
import FormMessages from "components/FormMessages";
import Button from "components/common/Button/Button";
import EmailInput from "components/common/Inputs/EmailInput";

export default function ForgotPasswordPanel() {
    const navigate = useNavigate();
    const [query] = useSearchParams();
    const email = query.get("email") ?? undefined;

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleFormSubmit: FormEventHandler = async event => {

        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);

        try {

            const data = await fetch('http://localhost:3001/api/forgot-password', {
                method: 'POST',
                headers: [
                    ['Content-Type', 'application/json']
                ],
                body: JSON.stringify(Object.fromEntries(formData))
            }).then(r => r.json());

            setMessage(data['id']);

        }catch(err) {

            console.log(err);

        }

    }

    useEffect(() => {

        setMessage(query.get("m") || "");
        setError(query.get("e") || "");

    }, [query]);

    return (
        <BackChevron to="/login">
            <div className="modal flex flex--column flex--center">
                <div className="title">
                    <span>Zresetuj hasło</span>
                </div>
                <FormMessages message={message} error={error} />
                <form
                    className="modal-form flex flex--column"
                    onSubmit={handleFormSubmit}
                >
                    <div className="inputs flex flex--column">
                        <EmailInput name="email" placeholder="Email" value={email} />
                    </div>
                    <Button primary size="lg" label="Wyślij instrukcje resetowania">
                        Wyślij instrukcje resetowania
                    </Button>
                </form>
            </div>
        </BackChevron>
    );
}

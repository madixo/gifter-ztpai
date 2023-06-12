import {useEffect, useState} from "react";

import {useSearchParams} from "react-router-dom";

import Back from "components/Back";
import Email from "components/Email";
import FormMessages from "components/FormMessages";
import Button from "components/common/Button/Button";

export default function ForgotPasswordPanel() {
    const [query] = useSearchParams();
    const email = query.get("email") ?? undefined;

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {

        setMessage(query.get("m") || "");
        setError(query.get("e") || "");

    }, [query]);

    return (
        <Back to="/login">
            <div className="modal flex flex--column flex--center">
                <div className="title">
                    <span>Zresetuj hasło</span>
                </div>
                <FormMessages message={message} error={error} />
                <form
                    className="modal-form flex flex--column"
                    action="forgot-password"
                    method="POST"
                >
                    <div className="inputs flex flex--column">
                        <Email name="email" placeholder="Email" value={email} />
                    </div>
                    <Button primary size="lg" label="Wyślij instrukcje resetowania">
                        Wyślij instrukcje resetowania
                    </Button>
                </form>
            </div>
        </Back>
    );
}

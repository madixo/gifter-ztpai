import FormMessages from "components/FormMessages";
import Button from "components/common/Button/Button";
import EmailInput from "components/common/Inputs/EmailInput";
import PasswordInput from "components/common/Inputs/PasswordInput";
import {routes} from "constants/routes";
import Cookies from "js-cookie";
import {LoginResponse} from "models/ServerResponses";
import {FormEvent, useEffect, useState} from "react";
import {Link, useNavigate, useSearchParams} from "react-router-dom";

export default function LoginPanel() {
    const [query] = useSearchParams();
    const email = query.get("email") ?? undefined;
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setMessage(query.get("m") || "");
        setError(query.get("e") || "");
    }, [query]);

    async function login(event: FormEvent) {
        event.preventDefault();
        const data = new FormData(event.currentTarget as HTMLFormElement);
        const response: LoginResponse = await fetch(
            "http://localhost:3001/api/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Object.fromEntries(data)),
            },
        ).then((res) => res.json());

        if(response.status === "ok") {
            Cookies.set("token", response.token);
            navigate(routes.DASHBOARD);
        } else {
            setError(response.message);
        }
    }

    return (
        <div className="modal flex flex--column flex--center">
            <div className="title">
                <span>Zaloguj się</span>
            </div>
            <FormMessages message={message} error={error} />
            <form
                onSubmit={login}
                className="modal-form flex flex--column"
                action="login"
                method="POST"
            >
                <div className="inputs flex flex--column">
                    <EmailInput name="email" placeholder="Email" value={email} />
                    <PasswordInput name="password" placeholder="Hasło" />
                    <Link to="/forgot-password">Zapomniałeś hasło?</Link>
                </div>
                <Button primary size="lg" label="dodaj">Zaloguj</Button>
            </form>
            <div className="spacer--line"></div>
            <div className="additional-options flex flex--column flex--center">
                <span>
                    Nie masz konta? <Link to="/register">Zarejestruj się</Link>
                </span>
                <Link to="/code">Posiadasz kod?</Link>
            </div>
        </div>
    );
}

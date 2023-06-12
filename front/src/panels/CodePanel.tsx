import {useEffect, useState} from "react";

import {useSearchParams} from "react-router-dom";

import Back from "components/Back";
import Email from "components/Email";
import FormMessages from "components/FormMessages";
import Button from 'components/common/Button/Button';

export default function CodePanel() {

    const [query] = useSearchParams();

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {

        setMessage(query.get('m') || '');
        setError(query.get('e') || '');

    }, [query]);

    return (

        <Back to="/login">
            <div className="modal flex flex--column flex--center">
                <div className="title">
                    <span>Wprowadź kod</span>
                </div>
                <FormMessages message={message} error={error} />
                <form className="modal-form flex flex--column" action="code" method="POST">
                    <div className="inputs flex flex--column">
                        <input className="barrel" type="text" name="code" placeholder="Kod" maxLength={8} required />
                        <Email name="email" placeholder="Email" />
                    </div>
                    <Button primary size="lg" label="Zatwierdź kod">Zatwierdź</Button>
                </form>
            </div>
        </Back>

    );

}
import {FormEventHandler, useEffect, useState} from "react";

import {useSearchParams} from "react-router-dom";

import BackChevron from "components/BackChevron";
import FormMessages from "components/FormMessages";
import Button from 'components/common/Button/Button';
import EmailInput from "components/common/Inputs/EmailInput";

export default function CodePanel() {

    const [query] = useSearchParams();

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleFormSubmit: FormEventHandler = event => {



    }

    useEffect(() => {

        setMessage(query.get('m') || '');
        setError(query.get('e') || '');

    }, [query]);

    return (

        <BackChevron to="/login">
            <div className="modal flex flex--column flex--center">
                <div className="title">
                    <span>Wprowadź kod</span>
                </div>
                <FormMessages message={message} error={error} />
                <form className="modal-form flex flex--column" onSubmit={handleFormSubmit}>
                    <div className="inputs flex flex--column">
                        <input className="barrel" type="text" name="code" placeholder="Kod" maxLength={8} required />
                        <EmailInput name="email" placeholder="Email" />
                    </div>
                    <Button primary size="lg" label="Zatwierdź kod">Zatwierdź</Button>
                </form>
            </div>
        </BackChevron>

    );

}
import FormMessage from "./FormMessage";

export interface FormMessagesProps {
    message?: string;
    error?: string;
}

export default function FormMessages({message, error}: FormMessagesProps) {
    return(
        <div className="messages">
            {
                message &&
                <FormMessage message={message} type='info' />
            }
            {
                error &&
                <FormMessage message={error} type='error' />
            }
        </div>
    );
};
import FormMessage from "./FormMessage";

export interface MessagesProps {
    message?: string;
    error?: string;
}

export default function FormMessages({message, error}: MessagesProps) {

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
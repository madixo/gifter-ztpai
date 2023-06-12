import { FaWindowClose } from 'react-icons/fa';
import Button from "./common/Button/Button";

interface Props {
    message?: string;
    type: 'info' | 'error';
}

export default function FormMessage({message, type}: Props) {

    if(message)
        return (
            <div className={type === 'info' ? "message barrel" : "message message--error barrel"}>
                <div>{message}</div>
                <Button label="Close" icon={<FaWindowClose />} className="close-button"></Button>
            </div>
        );

    return null;

}
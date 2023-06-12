interface Props {
    name?: string
    placeholder?: string
}

export default function Password({name, placeholder}: Props) {

    return (

        <input className="barrel" type="password" name={name} placeholder={placeholder} pattern="(?=.*\d)(?=.*[\W_]).{7,}" title="Minimum 7 znaków, przynajmniej jedna duża litera, cyfra i znak specjalny." required />

    );

}
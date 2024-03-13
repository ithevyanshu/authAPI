type InputProps = {
    type: string;
    name: string;
    value: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({type, name, placeholder, value, onChange }: InputProps) => {
    return (
        <input
            className="border-2 rounded-sm px-4 py-2 mb-4 outline-none"
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};

export default Input;
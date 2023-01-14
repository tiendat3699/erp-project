function Input({ type, label, placeholder }) {
    return (
        <>
            {label && <label>{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                className="w-full h-full rounded-md border border-neutral-600/60 px-2 text-sm placeholder:text-xs focus:border-blue-600 outline-none"
            />
        </>
    );
}

export default Input;

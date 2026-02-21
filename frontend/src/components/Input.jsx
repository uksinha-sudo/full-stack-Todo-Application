

export const Input = ({type, placeholder, reference }) => {
    const defaultStyles = "border p-1 w-70 outline-none font-semibold rounded"
    return (
        <input ref={reference} type={type} placeholder={placeholder} className={defaultStyles}/>
    )
}



export const Button = ({text, buttonStyles, link, onClick}) => {
    const defaultStyles = "px-3 py-2 rounded bg-green-200"
    
    return (
        <a href={link}><button className={`${defaultStyles} ${buttonStyles} `} onClick={onClick} >{text}</button></a>
    )
}
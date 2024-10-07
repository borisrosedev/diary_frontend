
interface ButtonProps {
    type: 'reset' | 'submit' | 'button',
    styles: string
    textContent: string

}

interface ButtonMustHaveProps {
    textContent: string,
    key: number
}


export default ({type, styles, textContent, key }: Partial<ButtonProps> & ButtonMustHaveProps) => {
    return(
        <button key={key} type={type ?? 'button'} className={styles ?? 'button'}>{textContent}</button>
    )
}
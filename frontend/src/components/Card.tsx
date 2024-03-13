const Card = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="shadow-md rounded-lg p-4 my-auto max-w-md w-full">
            {children}
        </div>
    )
}

export default Card
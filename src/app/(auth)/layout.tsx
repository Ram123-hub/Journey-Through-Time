const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="flex items-center justify-center h-full py-16 mt-16 bg-richblack">
            {children}
        </div>
    )
}

export default AuthLayout
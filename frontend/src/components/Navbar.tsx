import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <div className='fixed w-full flex justify-between px-10 py-3 bg-gray-700 text-white'>
                <Link className='font-bold text-2xl' to="/">Authentication</Link>
                <div>
                    <Link className='p-2 font-semibold' to="/login">Login</Link>
                    <Link className='p-2 font-semibold' to="/signup">Signup</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
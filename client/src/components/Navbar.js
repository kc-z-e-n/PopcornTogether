import { NavLink} from 'react-router-dom';

export default function Navbar() {
    return (
        <div>
            <nav className = 'flex justify-between items-center mb-6' >
                <NavLink to = '/'>
                    <img alt='/PT_logo.jpg' className='logo' ></img>
                </NavLink>

            </nav>
        </div>
    )
}
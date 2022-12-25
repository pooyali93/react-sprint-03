import Navbar from './Navbar.js';
import Header from './Header.js';

import './Layout.scss';


function Layout(props) {
    // Properties ---------
    //  Hooks ---------
    // Contect ---------
    // Methods ---------
    // View ---------
    return (
        <div className='container'>
            <div className="grid grid-responsive ">
                <div className=" header"><Header /></div>
                <div className="aside"><Navbar /></div>
                <div className=" main"><main className='main-layout'>
                        {props.children}
                    </main>
                </div>
            </div>
        </div>
    );

}

export default Layout;
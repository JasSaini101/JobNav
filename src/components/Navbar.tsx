/* Thiscreates the navbar component that displays a navigation bar with links to different pages of the website. 
Also imports the dark mode toggle button to display it in the bar and has our websites title*/

import { Nav, NavLink, NavMenu } from "./NavbarElements";
import './Navbar.css';
import { DarkModeToggle } from "./darkMode";
 
const Navbar = () => {
    return (
        <div style={{}}>
        
            <Nav>
                <div className="site-title">
                    <p>JobNav.com</p>
                </div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <DarkModeToggle />
                    <NavMenu>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/BasicPage">Basic Quiz</NavLink>
                        <NavLink to="/DetailedPage">Detailed Quiz</NavLink>
                        <NavLink to="/ResultsPage">Results</NavLink>
                    </NavMenu>
                </div>
                
            </Nav>
        </div>
    );
};
 
export default Navbar;
import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/homePage">
                        Home
                    </NavLink>
                    <NavLink to="/detailedPage">
                        Detailed Page
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;
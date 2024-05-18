/* This file is used to style the Navbar component. It uses styled-components to style the Navbar. */

import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

let Nav = styled.nav``
let NavLink = styled(Link)``
let HomeLink = styled(Link)``
let Bars = styled(FaBars)``
let NavMenu = styled.div``


Nav = styled.nav`
    background: {darkMode ? "black" : "white"};
    height: 85px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    z-index: 12;
    align-items: center;
    position: sticky;
    top: 0px;
    border-bottom: solid 1px grey;
    `;



NavLink = styled(Link)`
    color: {darkMode ? "white" : "black"};
    display: flex;
    align-items: center;
    height: 85px;
    text-decoration: none;
    padding: 0 1rem;
    cursor: pointer;
    transition: background-color 0.75s ease;
    &:hover {
        background-color: #e8ebed;
    }
`;

HomeLink = styled(Link)`
    color: black;
    text-decoration: none;
    width: 35%;
`;

Bars = styled(FaBars)`
    display: none;
    color: #808080;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`;

NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;
    /* Second Nav */
    /* margin-right: 24px; */
    /* Third Nav */
    /* width: 100vw;
}`;




export { Nav, NavLink, HomeLink, Bars, NavMenu };
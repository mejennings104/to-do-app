import React from 'react' 
import { Nav, Navbar } from 'react-bootstrap' 
import { Link } from 'react-router-dom'

export default function Navigation() {
    return (
        <Navbar expands='md' variant='dark' bg='dark' className='p-3'>
            <Navbar.Brand href='/'>ToDoAPI</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className='justify-content-end'>
                <Nav>
                    <Link to='/bootstrap' className='nav-link'>Bootstrap</Link>
                    <Link to='/todos' className='nav-link'>ToDos</Link>
                    <Link to='/categories' className='nav-link'>Categories</Link> 
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
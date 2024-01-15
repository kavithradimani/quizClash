import React from 'react'
import logo from '../assets/logo.png';

export default function Footer ()
{
    return (
        <>
            <footer className='sticky-bottom' style={ { backgroundColor: '#F3F3F3' } }>
                <div className='d-flex justify-content-between mx-3'>
                    <div className='p-2'>
                        <p className='m-0 text-muted' style={ { fontSize: 'small' } }>Quizclash@info.com</p>
                        <p className='m-0 text-muted' style={ { fontSize: 'small' } }>+9401234567</p>
                    </div>
                    <div className='d-none d-md-block'>
                        <div className='d-flex align-items-center mt-3'>
                            <p className='m-0 text-muted'><a className="" href="/"><img src={ logo } alt='logo' height={ '18rem' } /></a> copyright©  2023</p>
                        </div>
                    </div>
                    <div className='d-flex align-items-center justify-content-center'>
                        <a href='/' className='px-2 text-muted nav-hover'><i className="bi bi-facebook"></i></a>
                        <a href='/' className='px-2 text-muted nav-hover'><i className="bi bi-linkedin"></i></a>
                        <a href='/' className='px-2 text-muted nav-hover'><i className="bi bi-github"></i></a>
                    </div>
                </div>
            </footer>
        </>
    )
}

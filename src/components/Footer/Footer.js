import React from 'react';
import { Typography } from '@material-ui/core';

import './Footer.css';

const Footer = () => {
    return (
        <div className="footer-container">
            <Typography variant="caption" display="block" align='center'>
                Created and designed by <a href="https://facebook.com/arpan.pramanik" target="_blank" rel="noopener noreferrer">Arpan Paramanik</a>
            </Typography>

        </div>
    );
}

export default Footer;
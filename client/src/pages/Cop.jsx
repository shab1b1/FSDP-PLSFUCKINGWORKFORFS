import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import http from '../http';

function Cop() {
    const [copList, setCopList] = useState([]);

    useEffect(() => {
        http.get('/codeOfPractices').then((res) => {
            console.log(res.data);
            setCopList(res.data);
        });
    }, []); 

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Code of Practices
            </Typography>
            {/* Add your content here */}
        </Box>
    );
}

export default Cop;
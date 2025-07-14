import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
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

            <Grid container spacing={2}>
                {
                    copList.map((cop, i) => {
                        return (
                            <Grid item xs={12} md={6} lg={4} key={tutorial.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ mb: 1 }}>
                                            {cop.title}
                                        </Typography>
                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            {cop.description}
                                        </Typography>
                                        <Typography variant="body2">
                                            {cop.authority}
                                        </Typography>
                                        <Typography variant="body2">
                                            {cop.url}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })
                }
            </Grid>

        </Box>
    );
}

export default Cop;
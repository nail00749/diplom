import {Box} from '@mui/material';
import React, {FC} from 'react';
import StreamItem from "./StreamItem";


const StreamContainer: FC = () => {
    return (
        <Box
            sx = {{
                border: '1px solid',
                borderRadius: 3,
                minWidth: '25vw'
            }}
            p={3}
        >
            {
                [1, 2, 3].map(stream =>
                    <StreamItem/>
                )
            }
        </Box>
    );
};

export default StreamContainer;

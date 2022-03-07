import React, {FC} from 'react';
import CourseContainer from "../components/CourseContainer";
import StreamContainer from "../components/StreamContainer";
import {Grid, useMediaQuery} from "@mui/material";

const Main: FC = () => {
    const matches = useMediaQuery('(max-width: 425px)')

    return (
        <Grid
            container
            spacing = {5}
            mt={.5}
            p={matches ? 1 : 3}
        >
            <Grid
                item
                xs = {12}
                md={4}
            >
                <CourseContainer/>
            </Grid>
            <Grid
                item
                xs = {12}
                md={4}
            >
                <StreamContainer/>
            </Grid>
        </Grid>
    );
};

export default Main;

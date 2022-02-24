import React, {FC, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import { publicRoute } from '../router/router';

const AppRouter: FC = () => {
    const [isAuth, setIsAuth] = useState<boolean>(false);

    return (
        <div>

            {
                isAuth ?
                    <Routes>

                    </Routes> :
                    <Routes>
                        {
                            publicRoute.map(route =>
                                <Route
                                    path={route.path}
                                    index={route.exact}
                                    element={route.component}
                                    key={route.path}
                                />
                            )
                        }
                    </Routes>
            }

        </div>
    );
};

export default AppRouter;

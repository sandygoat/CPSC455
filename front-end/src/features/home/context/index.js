

import React from 'react';
import { SocketProvider } from './socket';

const AppContextProviders = ({ children }) => {
    
    return (
        <SocketProvider>{children}</SocketProvider>
    )
};

export default AppContextProviders;
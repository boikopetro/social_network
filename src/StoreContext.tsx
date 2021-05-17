import React from "react";
import {AppStoreType} from "./redux/redux-store";

export type ProviderType = {
    store: AppStoreType
    children: React.ReactNode
}

const StoreContext = React.createContext({}as AppStoreType);
export const Provider = (props:any) => {
    return <StoreContext.Provider value={props.store}>
        {props.children}
    </StoreContext.Provider>
}


export default StoreContext;
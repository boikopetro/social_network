import React from "react";
import {AppStoreType} from "./redux/redux-store";


const StoreContext = React.createContext({}as AppStoreType);

export type ProviderType = {
    store: AppStoreType
    children: React.ReactNode
}

export default StoreContext;
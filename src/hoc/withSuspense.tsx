import React from "react";

export const withSuspense = (Component:any)  => {
    return  (props:any) => {
        return <React.Suspense fallback={<div>Loading...</div>}>
                <Component {...props}/>
            </React.Suspense>
        }

}
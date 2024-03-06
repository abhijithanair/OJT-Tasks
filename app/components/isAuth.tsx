import { useLayoutEffect } from "react";
import { isAuthenticated } from "../Auth"
import { redirect } from "next/navigation";

export default function isAuth(Component:any){
    return function isAuth(props:any ){
        const auth = isAuthenticated;
        useLayoutEffect(()=>{
            if(!auth){
                return redirect("/");
            }
        },[]
        );
        return <Component {...props} />;
    }
    

    
}
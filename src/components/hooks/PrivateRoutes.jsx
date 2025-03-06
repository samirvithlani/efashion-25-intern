import { useState } from "react";
import { useEffect } from "react";
import { set } from "react-hook-form";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const [auth, setauth] = useState({ isLoggedin: false, role: null });
  const [isLaoding, setisLaoding] = useState(true);
  useEffect(() => {
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");
    if (id && role) {
      setauth({ isLoggedin: true, role: role });
    }
    setisLaoding(false);
  }, []);
  return { auth, isLaoding };
};

const PrivateRoutes = ()=>{

    const {auth,isLaoding} = useAuth()
    if(isLaoding){
        return <div>loading...</div>
    }
    return auth.isLoggedin == true?<Outlet/> :<Navigate to="/login"/>
    //{auth:{isLoggdin:true|fasle,role:""||role:"admin"},isLaoding:true}

}
export default PrivateRoutes;

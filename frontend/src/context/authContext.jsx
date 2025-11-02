import {createContext,useState,useEffect} from 'react';
export const AuthContext = createContext();
import {getUser} from '../apis/auth';
import toast from 'react-hot-toast';


export const AuthProvider = ({children}) => {       
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
      const fetchUser = async () => {
        try{
            const data = await getUser();
            setUser(data);
        }catch(error){
            setUser(null);
        }finally{   
            setLoading(false);
        }
      };
      fetchUser();
    },[]);

    return (
        <AuthContext.Provider value={{user,setUser,loading}}>
            {children}
        </AuthContext.Provider>
    );
}
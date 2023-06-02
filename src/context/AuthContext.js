import auth from "@/config/auth"
import { toast } from "react-hot-toast"
const { default: url } = require("@/config/api")
const { default: axios } = require("axios")
const { useRouter } = require("next/router")
const { createContext, useState, useEffect } = require("react")


const defaultProvider = {
    user: null,
    loading: true,
    setUser: () => null,
    setLoading: () => Boolean,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    regis: () => Promise.resolve(),
}

const AuthContext = createContext(defaultProvider)


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = window.localStorage.getItem(auth.storageTokenKeyName)
            // console.log('stored token', storedToken);
            console.log('user', user);
        }
        initAuth()
    }, [])

    const handleLogin = async (input, errorCallback) => {
        await axios.post(url.apiLogin, input)
            .then((result) => {
                setUser({...result.data.data[0]})
                console.log('login auth', result.data.data[0].accessToken);
                localStorage.setItem(auth.storageTokenKeyName, result.data.data[0].accessToken)
                // console.log('token stored', window.localStorage.getItem(auth.storageTokenKeyName));
                router.push('/')
            })
            .catch((err) => {
                console.log(err);
                if (errorCallback) errorCallback("error")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleRegis = async (input, errorCallback) => {
        console.log('input', input);
        await axios.post("https://springbootgcpcr-a6bnbhk5xa-as.a.run.app/api/auth/register", input)
            .then((result) => {
                toast.success('Akun anda berhasil di registrasi!')
                router.push('/login')
            }).catch((err) => {
                console.log(err);
                if (errorCallback) errorCallback("error regis")
            })
    }

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem("userData")
        window.localStorage.removeItem(auth.storageTokenKeyName)
        router.push('/login')
    }

    const value = {
        user,
        loading,
        setUser,
        setLoading,
        login: handleLogin,
        logout: handleLogout,
        regis: handleRegis
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
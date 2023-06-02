import { useAuth } from "@/hooks/useAuth"
import Link from "next/link"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"

const index = () => {

    const authContext = useAuth()
    const { login } = authContext

    const defaultValues = {
        username: '',
        password: '',
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm(defaultValues)

    const onSubmit = useCallback(async (input) => {
        console.log(input);
        login(input, () => {
            toast.error('Login Gagal')
        })
    }, [])



    return (
        <form onSubmit={handleSubmit(onSubmit)} className="h-screen w-screen flex flex-col justify-center items-center gap-10">

            <h1 className="text-5xl">Login Page</h1>
            <div className="w-[70%]">
                <fieldset className="border-2 border-solid border-main-creme px-5 py-3">
                    <legend htmlFor="username" className="p-3 text-xl">
                        Username
                    </legend>
                    <input id="username" {...register("username", )} type="text" placeholder="silahkan isi username" className="w-full outline-none h-full p-5" />
                </fieldset>
                {errors.username && <p className="text-red-600 text-sm">{errors.username.message}</p>}
                <fieldset className="border-2 border-solid border-main-creme px-5 py-3">
                    <legend htmlFor="password" className="p-3 text-xl">
                        Password
                    </legend>
                    <input id="password" {...register("password", )} placeholder="silahkan isi password" type="password" className="w-full outline-none h-full p-5" />
                </fieldset>
                {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
            </div>
            <h4>Belum Punya akun? Silahkan Registrasi <Link href={'/register'} className="font-semibold">Disini</Link></h4>

            <button className="p-5 bg-black text-white text-xl rounded-md">
                Login
            </button>
        </form>
    )
}

export default index
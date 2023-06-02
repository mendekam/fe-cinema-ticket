import { useAuth } from "@/hooks/useAuth"
import Link from "next/link"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"

const index = () => {

    const authContext = useAuth()
    const { regis } = authContext

    const defaultValues = {
        username: '',
        password: '',
        phoneNumber: '',
        role: 'COSTUMER'
    }

    const {
        register: login,
        handleSubmit,
        formState: { errors }
    } = useForm(defaultValues)

    const onSubmit = useCallback(async (input) => {
        console.log(input);
        regis(input, () => {
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
                    <input id="username" {...login("username", )} type="text" placeholder="silahkan isi username" className="w-full outline-none h-full p-5" />
                </fieldset>
                {errors.username && <p className="text-red-600 text-sm">{errors.username.message}</p>}
                <fieldset className="border-2 border-solid border-main-creme px-5 py-3">
                    <legend htmlFor="password" className="p-3 text-xl">
                        Password
                    </legend>
                    <input id="password" {...login("password", )} placeholder="silahkan isi password" type="password" className="w-full outline-none h-full p-5" />
                </fieldset>
                {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
                <fieldset className="border-2 border-solid border-main-creme px-5 py-3">
                    <legend htmlFor="phoneNumber" className="p-3 text-xl">
                        Phone Number
                    </legend>
                    <input id="phoneNumber" {...login("phoneNumber", )} placeholder="silahkan isi password" type="text" className="w-full outline-none h-full p-5" />
                </fieldset>
                {errors.phoneNumber && <p className="text-red-600 text-sm">{errors.phoneNumber.message}</p>}
                <fieldset hidden className="border-2 border-solid border-main-creme px-5 py-3">
                    <legend htmlFor="role" className="p-3 text-xl">
                        Phone
                    </legend>
                    <input hidden id="role" {...login("role", )} type="text" className="w-full outline-none h-full p-5" />
                </fieldset>
                {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
            </div>
            <h4>Sudah Punya Akun? Login <Link href={'/login'} className="font-semibold">Disini</Link></h4>

            <button className="p-5 bg-black text-white text-xl rounded-md">
                Register
            </button>
        </form>
    )
}

export default index
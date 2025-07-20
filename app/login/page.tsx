import { login, signup } from './actions'
import Link from 'next/link'

export default function LoginPage() {
    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <form>
                    <label htmlFor="email">Email:</label>
                    <input id="email" name="email" type="email" required />
                    <label htmlFor="password">Password:</label>
                    <input id="password" name="password" type="password" required />

                    <div className="space-x-4 my-4">
                        <button formAction={login} className='mx-1'>Log in</button>
                        <button formAction={signup} className='mx-1'>Sign up</button>
                    </div>

                    {/* Forgot Password Link */}
                    <div className="mt-2 text-sm">
                        <Link href="/passwordreset" className="text-blue-500 hover:underline">
                            Forgot your password?
                        </Link>
                    </div>
                </form>
            </main>
        </div>
    )
}

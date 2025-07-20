'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const UpdatePassword = () => {
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const router = useRouter()

    useEffect(() => {
        // Step 1: Parse the hash fragment
        const hash = window.location.hash.substring(1)
        const params = new URLSearchParams(hash)
        const accessToken = params.get('access_token')
        const type = params.get('type')

        // Step 2: Validate access_token and type
        if (!accessToken || type !== 'recovery') {
            router.replace('/login') // redirect if invalid
        } else {
            // Set the session from token (important!)
            supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: '', // refresh token is not provided in recovery
            })
        }
    }, [router])

    const handleSubmit = async () => {
        const { error } = await supabase.auth.updateUser({ password })

        if (error) {
            setMessage('Error updating password: ' + error.message)
        } else {
            setMessage('Password updated successfully!')
            setTimeout(() => router.push('/login'), 2000)
        }
    }

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

            <div>
            <h2>Set a New Password</h2>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New password"
            />
            <button className='my-4' onClick={handleSubmit}>Update Password</button>
            {message && <p>{message}</p>}
        </div>
</main>
</div>
    )
}

export default UpdatePassword

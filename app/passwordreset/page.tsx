'use client'

import { useState, FormEvent } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);

const PasswordReset: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleReset = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { data, error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) {
            setMessage('Error sending password reset email: ' + error.message);
        } else {
            setMessage('Password reset email sent successfully!');
        }
    };

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

            <form onSubmit={handleReset}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
            />
            <button className='my-4' type="submit">Reset Password</button>
            {message && <p>{message}</p>}
        </form>
            </main>
        </div>
    );
};

export default PasswordReset;
import AccountForm from './account-form'
import { createClient } from '@/utils/supabase/server'
import {redirect} from 'next/navigation'
export default async function Account() {
    const supabase = await createClient()

    const {data,error} = await supabase.auth.getUser()

    if(error || !data?.user){
        redirect('/login')
    }

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-5">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <AccountForm user={data?.user} />
            </main>
        </div>
    )
}
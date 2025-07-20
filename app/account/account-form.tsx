'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import Avatar from './avatar'
import Link from "next/link";
import { useRouter } from "next/navigation"


export default function AccountForm({ user }: { user: User | null }) {
    const supabase = createClient()
    const [loading, setLoading] = useState(true)
    const [fullname, setFullname] = useState<string | null>(null)
    const [username, setUsername] = useState<string | null>(null)
    const [website, setWebsite] = useState<string | null>(null)
    const [avatar_url, setAvatarUrl] = useState<string | null>(null)

    const router = useRouter()


    const getProfile = useCallback(async () => {
        try {
            setLoading(true)

            const { data, error, status } = await supabase
                .from('profiles')
                .select(`full_name, username, website, avatar_url`)
                .eq('id', user?.id)
                .single()

            if (error && status !== 406) {
                console.log(error)
                throw error
            }

            if (data) {
                setFullname(data.full_name)
                setUsername(data.username)
                setWebsite(data.website)
                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            alert('Error loading user data!')

            router.push('/login') // ✅ Correct client-side redirect

        } finally {
            setLoading(false)
        }
    }, [user, supabase])

    useEffect(() => {
        getProfile()
    }, [user, getProfile])

    async function updateProfile({
                                     username,
                                     website,
                                     avatar_url,
                                 }: {
        username: string | null
        fullname: string | null
        website: string | null
        avatar_url: string | null
    }) {
        try {
            setLoading(true)

            const { error } = await supabase.from('profiles').upsert({
                id: user?.id as string,
                full_name: fullname,
                username,
                website,
                avatar_url,
                updated_at: new Date().toISOString(),
            })
            if (error) throw error
            alert('Profile updated!')
        } catch (error) {
            alert('Error updating the data!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - Avatar */}
            <div className="flex-shrink-0">
                <h1 className="text-xl font-semibold mb-4">Avatar</h1>
                <Avatar
                    uid={user?.id ?? null}
                    url={avatar_url}
                    size={150}
                    onUpload={(url) => {
                        setAvatarUrl(url)
                        updateProfile({ fullname, username, website, avatar_url: url })
                    }}
                />
            </div>

            {/* Right Column - Form */}
            <div className="flex-1 space-y-4">
                <div>
                    <label htmlFor="email" className="block font-medium">Email</label>
                    <input id="email" type="text" value={user?.email} disabled className="w-full border rounded p-2" />
                </div>
                <div>
                    <label htmlFor="fullName" className="block font-medium">Full Name</label>
                    <input
                        id="fullName"
                        type="text"
                        value={fullname || ''}
                        onChange={(e) => setFullname(e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label htmlFor="username" className="block font-medium">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username || ''}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label htmlFor="website" className="block font-medium">Website</label>
                    <input
                        id="website"
                        type="url"
                        value={website || ''}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>

                <div>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={() => updateProfile({ fullname, username, website, avatar_url })}
                        disabled={loading}
                    >
                        {loading ? 'Loading ...' : 'Update'}
                    </button>
                </div>

                <div className="space-x-4">
                    <form action="/auth/signout" method="post" className="inline">
                        <button className="bg-gray-300 px-4 py-2 rounded" type="submit">
                            Sign out
                        </button>
                    </form>
                    <Link href="/">
                        <button className="bg-green-500 text-white px-4 py-2 rounded">Go home</button>
                    </Link>
                </div>
            </div>
        </div>

    )
}
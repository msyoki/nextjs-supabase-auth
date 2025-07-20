import Image from "next/image";
import Link from "next/link";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export default async function Home() {
  const supabase = await createClient()

  const {data,error} = await supabase.auth.getUser()

  if(error || !data?.user){
    redirect('/login')
  }
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert bg-white p-3"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <div>
          <form action="/auth/signout" method="post">
            <button className="button block" type="submit">
              Sign out
            </button>
          </form>
          <Link href="/account">
            <button className='my-2'>Go to Profile</button>
          </Link>
        </div>
      </main>

    </div>
  );
}

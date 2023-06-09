import React, { useReducer } from 'react'
import { NextPageContext } from "next"
import { getSession,signOut} from 'next-auth/react'
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/router'

export async function getServerSideProps(context : NextPageContext){
    const session = await getSession(context);

    if (!session){
        return {
          redirect: {
            destination: '/auth',
            permanent: false,
          }
        }
      }
    
      // ถ้าไม่มีsession ให้กลับไปหน้าauth
    
      return {
        props : {}
    }
}

const profiles = () => {

    const router = useRouter()

    const { data: user } = useCurrentUser();

  return (
    <div className='flex item-center h-full justify-center min-h-screen '>
      <div className='flex flex-col justify-center'>
        <h1 className='text-3xl md:text-6xl text-white text-center'>Who is watching?</h1>
        <div className='flex items-center justify-center gap-8 mt-10'>
            <div onClick={()=> router.push('/')}>

                <div className='group flex-row w-44 mx-auto'>
                    <div 
                    className='
                    w-44
                    h-44
                    rounded-md
                    flex
                    items-center
                    justify-center
                    border-2
                    border-transparent
                    group-hover:cursor-pointer
                    overflow-hidden
                    '
                    >
                        <img src="/images/default-blue.png" alt="Profile" />
                    </div>

                    <div className='
                    mt-4
                    text-gray-400
                    text-2xl
                    text-center
                    group-hover:text-white
                    '
                    >
                        {user?.name}
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  )
}

export default profiles


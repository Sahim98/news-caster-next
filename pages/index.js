import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import SingleNews from '../components/SingleNews'
import Banner from '../components/Banner'
import { useEffect, useLayoutEffect, useState } from 'react'
import Footer from '../components/Footer'
import BannerTravel from '../components/BannerTravel'
import Test from '../components/Test'
import Loading from '../components/Loading'
import Link from 'next/link'
import BelowBannerSlider from '../components/BelowBannerSlider'
import YoutubeSection from '../components/YoutubeSection'
import handleTokenizeClick from '../components/functions/handleTokenizeClick'



export default  function Home() {
  let [load, setLoad] = useState(false)
  let [news, setNews] = useState(null)
  useLayoutEffect(() => {
    setLoad(true)
    setNews([])
    fetch(`/api/all-news`)
      .then(res => res.json())
      .then(data => {
        setNews(data.data.slice(0, 4))
        setLoad(false)
      })
  }, [])

  return (
    <>
      <Head>
        <title>Home-News Caster</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=''>

        <div className='bg-[#0E1E32] pt-10'>
          {/* banner div  */}
          <Banner />
          {/* purple div  */}
          <BelowBannerSlider />
        </div>

        {/* cards  */}
        <div className='my-10 max-w-6xl mx-auto grid lg:grid-cols-3 sm:grid-cols-2 gap-16'>
          <div className='lg:col-span-2'>
            <h1 className='text-xl font-bold p-5 bg-white mb-5'><span className='border-b-2 border-[#C31815] pb-1'>Late</span>st Stories</h1>
            
                {
                  load ? <Loading /> : <div className='grid lg:grid-cols-2 gap-5'>
                  {
                    news?.map(n => <SingleNews
                      key={n?._id}
                      n={n}
                    ></SingleNews>)
                  }
                </div>
                }

            <div className='w-fit mx-auto'>
              <Link href='/categories' className='btn btn-error btn-outline btn-lg my-10'>View More</Link>
            </div>
          </div>
          <div>
            <YoutubeSection />
          </div>
        </div>
      </main>
    </>
  )
}

// export async function getStaticProps () {

//   let res = await fetch('http://localhost:3000/api/all-news')
//   let data = await res.json()
  
//   return{
//     props: {
//       news : data.data
//     },
//     revalidate: 1,
//   }
// }
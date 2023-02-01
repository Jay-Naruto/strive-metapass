import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/landing.module.css'
import { useState } from 'react';
import Link from 'next/link'
import { motion } from 'framer-motion';


export default function Home() {

  const [searchVal, setSearchVal] = useState('');
  let events = [
    {
      image: "/usdao.jpeg",
      name: "Special Session with Surupam Chandra, USDAO.",
      date: "Feb 4 at 7pm.",
      description: "In this Session, Surupam Chandra explains about the future of Stablecoins & its Realtime use cases.",
      website: "https://ur-hackathon-2.devfolio.co/",
      redirect: "https://youtu.be/OIlH0zDAosI",
      contract: "0x7d2008d3A593Dbf80c012d39A8Cc238d3E2fECA6"
    },
    {
      image: "/quill.jpeg",
      name: "Special Session with Preetam Rao, QuillAudits.",
      date: " Feb 6 at 7pm.",
      description: "In this Session, Preetam Rao will share about his Web3 Journey, QuillAudits & more.",
      website: "https://ur-hackathon-2.devfolio.co/",
      redirect: "https://www.youtube.com/live/g-NFNuIjEF8?feature=share",
      contract: "0x0cCdC947E4dc82028467eF089537855536F31Db0"

    },
    {
      image: "/strive.jpeg",
      name: "Special Session with Kartik, Strive.",
      date: "Feb 9 at 7pm.",
      description: "In this Session, Kartik will share about his Web3 Journey, Strive & more.",
      website: "https://ur-hackathon-2.devfolio.co/",
      redirect: "https://www.youtube.com/live/YT_RvODzlpQ?feature=share",
      contract: "0xad93EB45d2daa2958AF0F1CC784ED41e565B9522"


    },
    {
      image: "/hashlips.jpeg",
      name: "Special Session with Daniel Eugene, HashLips.",
      date: "13 Feb at 5pm.",
      description: "In this Session, Daniel Eugene will share about his Web3 Journey, HashLips & more.",
      website: "https://ur-hackathon-2.devfolio.co/",
      redirect: "https://youtube.com/live/KSk7AiF5nY0?feature=share",
      contract: "0x9c4203c4c26feFd9D797A6E30ABDB3Df0Ac425dC"
    },
    {
      image: "/buidl.jpeg",
      name: "Special Session with Akshay, Buidl Up.",
      date: "13 Feb at 8pm.",
      description: "In this Session, Akshay will share about his Web3 Journey, Buidl Up & more.",
      website: "https://ur-hackathon-2.devfolio.co/",
      redirect: "https://youtube.com/live/y7Ly4B6Tlxk?feature=share",
      contract: "0xC2D4E9C8Ef1A786d7a96C306bd959e231d76f788"

    },


  ];
  const handleInput = (e) => {
    setSearchVal(e.target.value);
  }

  const handleClearBtn = () => {
    setSearchVal('');
  }

  const filteredevents = events.filter((product) => {
    return product.name.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1;
  });
  return (
    <>
      <Head>
        <title>Strive</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <div className={styles.components}>

        {/* <div className=''>
        <img className={styles.headerImage} src='./strive-logo.png' alt=''/>
   </div> */}
        <div>
          <img className={styles.bannerimage} src='/strive.png' alt='' />

        </div>
        <motion.div
          initial="hidden" animate="visible" variants={{
            hidden: {
              scale: .8,
              opacity: 0
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: .4
              }
            },
          }}
          className={styles.imageArray}>
          <img className={styles.bannerimage1} src='/ur-hackathon.png' alt='' />
          <img className={styles.bannerimage1} src='/web3all.png' alt='' />


        </motion.div>
        <div className={styles.searchbar}>
          <div className={styles.container}>
            <div className={styles.inputwrap}>
              {/* <i className={styles.fas fa-search}></i> */}
              <label
                for="product-search"
                id="input-label"
              >

              </label>
              <input
                onChange={handleInput}
                value={searchVal}
                type="text"
                name="product-search"
                id="product-search"
                className={styles.productsearch}
                placeholder="Search events"
              />
              <i
                onClick={handleClearBtn}
              //  className={styles}
              ></i>
            </div>
            {/* <div className={styles.}"results-wrap">
   <ul>
     {filteredevents.map((product) => {
       return <li key={product} className={styles.}'list-item'><a href='#'>{product}</a></li>
     })}
   </ul>
 </div> */}
          </div>
        </div>
        <em className={styles.italic}>
          Type event name
        </em>
        <p className={styles.featured}>
          Featured events 📢
        </p>
        <motion.div
          initial="hidden" animate="visible" variants={{
            hidden: {
              scale: .8,
              opacity: 0
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: .4
              }
            },
          }}
          className={styles.cardsbody}>

          <div className={styles.allCards}>
            {filteredevents.map((product) => {
              return (

                // <li key={product} className={styles.}'list-item'><a href='#'>{product}</a></li>
                <div key={product.name} className={styles.card}>
                  <div className={styles.card__image}>
                    <img src=
                      {product.image} />
                  </div>
                  <div className={styles.card__copy}>
                    <div className={styles.name}>{product.name}</div>
                    <div className={styles.row}>
                      <img className={styles.calendar}
                        src='/icons8-calendar-50.png' alt='' />&nbsp;<div className={styles.date}>{product.date}</div>

                    </div>
                    <p>

                      <div className={styles.btnBody}>
                      
                          <button className={styles.btn29}>
                            <span className={styles.textcontainer}>
                              <span className={styles.text}>
                              <Link
                          href={{
                            pathname: '/details',
                            query: product
                          }}
                          as={product.name}
                          className={styles.linktext} style={{ textDecoration: 'none' }}>
                                Get Pass
                        </Link>

                              </span>
                            </span>
                          </button>

                      </div>

                    </p>
                  </div>
                </div>
              )
            })}
          </div>



        </motion.div>

      </div>
    </>
  )
}

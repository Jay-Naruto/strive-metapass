import Router, { useRouter } from 'next/router';
import React, { useState } from 'react'
import styles from '../styles/details.module.css'
import Link from 'next/link'
import { motion } from 'framer-motion';
import { Biconomy } from '@biconomy/mexa'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useProvider,
} from 'wagmi'
import abi from "./abi.json"
import Web3 from "web3";
import { Modal } from './Modal';


// const web3 = new Web3(Web3.givenProvider);

export default function Details() {

  const [open, setOpen] = useState(false);
  const handleConfirm = result => {
    if (result) {
      console.log('some action...')
    }

    setOpen(false)
  }
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const [wallet, setWallet] = useState()
  const location = useRouter();
  const event = location.query;
  console.log(event.contract)
  const { address, connector, isConnected } = useAccount()
  const { data: ensAvatar } = useEnsAvatar({ address })
  const { data: ensName } = useEnsName({ address })

  const { disconnect } = useDisconnect()

  // if (isConnected) {
  //  setWallet(address)
  // }
  const mintNow = async (cA) => {
    // export type ExternalProvider = {
    //   isMetaMask?: boolean;
    //   isStatus?: boolean;
    //   host?: string;
    //   path?: string;
    //   sendAsync?: (request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void) => void
    //   send?: (request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void) => void
    //   request?: (request: { method: string, params?: Array<any> }) => Promise<any>
    // }
    // 5CQleDz2F.843d06da-8412-46ec-a600-e8b49aeb187f  0xE6Dd0653798652cA4Fcc9F841aAbEFFA8df9134c test
    // eGZIy07i9.3bdc9c52-f7f3-4564-a5ae-3e89deb6f186  0xe6dd0653798652ca4fcc9f841aabeffa8df9134c  mAIn
    const biconomy = new Biconomy(window.ethereum, {
      apiKey: "eGZIy07i9.3bdc9c52-f7f3-4564-a5ae-3e89deb6f186",
      debug: true,
      contractAddresses: ["0xe6dd0653798652ca4fcc9f841aabeffa8df9134c"], // list of contract address you want to enable gasless on
    });
  
  


    console.log("start")


    const res=await biconomy.init()
    console.log(res)

    const web3 = new Web3(biconomy.provider);
  
    let contract = new web3.eth.Contract(
      abi,
      cA
    );

let userAddress = address;

//Call your target method (must be registered on the dashboard).. here we are calling setQuote() method of our contract
let tx = contract.methods.mint(address, 1, 1, "0x12").send({
              from: userAddress,
              signatureType: biconomy.EIP712_SIGN,
              //optionally you can add other options like gasLimit
          });

tx.on("transactionHash", function (hash) {
              console.log(`Transaction hash is ${hash}`);
              showInfoMessage(`Transaction sent. Waiting for confirmation ..`);
          }).once("confirmation", function (confirmationNumber, receipt) {
              console.log(receipt);
              console.log(receipt.transactionHash);
              //do something with transaction hash
          }); 
alert("Check wallet for request")


  }
  return (
    <div className={styles.component}>


      <div>
        {/* <button  className={styles.walletbtn} >
          Connect Wallet
        </button> */}

      </div>


      {open && <div className={styles.modal}>
        <div className={open ? styles.confirmShow : styles.confirm}>
          {!isConnected ?

            <div>
              <div className={styles.select}>
                SELECT WALLET
              </div>
              <div className={styles.wallets}>

                {connectors.map((connector) => (
                  <div>

                    <button
                      className={styles.walletbtn}
                      disabled={!connector.ready}
                      key={connector.id}
                      onClick={() => connect({ connector })}
                    >
                      {connector.name}
                      {!connector.ready && ' (unsupported)'}
                      {isLoading &&
                        connector.id === pendingConnector?.id &&
                        ' (connecting)'}
                    </button>
                  </div>

                ))}

              </div>

            </div>

            :
            <div 
            
            className={styles.mint}>
              <button onClick={() => mintNow(event.contract)}
                className={styles.walletbtn}
              >
                MINT
              </button>
            </div>
          }

          <button className={styles.cancel} onClick={() => handleConfirm(false)}>Cancel</button>


        </div>
        <div
          className={styles.overlay}
          onClick={() => handleConfirm(false)}
        />

      </div>}


      <div>

      </div>

      <div className={styles.cardBox}>
        <div className={styles.detailCard} >
          <div

            className={styles.detailCardImg} >
            {/* {event.image} */}
            <motion.img
              initial="hidden" animate="visible" variants={{
                hidden: {
                  scale: .8,
                  opacity: 0
                },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: {
                    delay: .2
                  }
                },
              }}
              src={event.image} />
            {/* <p className='topic'>
{event.name}
</p> */}
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
                    delay: .3
                  }
                },
              }}
              className={styles.topic}>

              {event.name}

            </motion.div>
          </div>
          <div className={styles.detailCardBox} >

            <motion.button
                initial="hidden" animate="visible" variants={{
                  hidden: {
                    scale: .8,
                    opacity: 0
                  },
                  visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                      delay: .3
                    }
                  },
                }}
            
            className={styles.openBtn} onClick={() => setOpen(true)}>
              MINT
            </motion.button>
            <motion.div className={styles.descriptionBox}
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
            >

              <div

                className={styles.description}>
                Description:
              </div>

              <div style={{ marginTop: 20 }}>
                {event.description}

              </div>
            </motion.div>
            <div

              className={styles.boxRow}>


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
                className={styles.websiteBox} >
                <div className={styles.websiteLine}>
                  Website:
                </div>

                <div>

                  <a target="_blank" href={event.website}>
                    <img className={styles.svgs} src='/icons8-internet-30-w.png' alt='' />
                  </a>

                </div>
              </motion.div>
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
                className={styles.dateBox} >
                <div className={styles.dateLine}>
                  Date:
                </div>

                <div className={styles.dateData}>
                  {event.date}

                </div>
              </motion.div>
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
                className={styles.linkBox} >
                <div className={styles.redirectLine}>
                  Watch:
                </div>

                <div>
                  <a target="_blank" href={event.redirect}>
                    <img className={styles.svgs} src='/icons8-youtube-w.svg' alt='' />
                  </a>

                </div>
              </motion.div>
            </div>


          </div>
        </div>

      </div>



    </div>
  )
}

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
  // console.log(location.query)
  const { address, connector, isConnected } = useAccount()
  const { data: ensAvatar } = useEnsAvatar({ address })
  const { data: ensName } = useEnsName({ address })

  const { disconnect } = useDisconnect()

  // if (isConnected) {
  //  setWallet(address)
  // }
  const mintNow = async (contractAddress) => {
    // export type ExternalProvider = {
    //   isMetaMask?: boolean;
    //   isStatus?: boolean;
    //   host?: string;
    //   path?: string;
    //   sendAsync?: (request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void) => void
    //   send?: (request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void) => void
    //   request?: (request: { method: string, params?: Array<any> }) => Promise<any>
    // }
    const biconomy = new Biconomy(window.ethereum, {
      apiKey: "5CQleDz2F.843d06da-8412-46ec-a600-e8b49aeb187f",
      debug: true,
      contractAddresses: ["0xFb6E9728577898C27135EE9F22D3979c457De1AB"], // list of contract address you want to enable gasless on
    });
  
  


    console.log("start")


    const res=await biconomy.init()
    console.log(res)

    const web3 = new Web3(biconomy.provider);
    // console.log(web3)
    // const contract = new web3.eth.Contract(abi, contractAddress);
    // console.log(web3)




    //     const bic = await biconomy.init();
    // console.log(bic);
    // const web3 = new Web3(biconomy);
    // const contract = new web3.eth.Contract(abi, contractAddress);

    // const web3 = new Web3(biconomy.provider);
    // const contractInstance = new web3.eth.Contract(
    //   abi, contractAddress
    // );
    
    // await contractInstance.methods
    //   .mint(address, 1, 1, "0x12")
    //   .send("eth_sendTransaction", {
    //     from: address,
    //     signatureType: "PERSONAL_SIGN",
    //   });
    // // Listen to transaction updates:
    // biconomy.on("txHashGenerated",  (data= { transactionId, transactionHash }) => {
    //   console.log(data);
    //   showSuccessMessage(`tx hash ${data.hash}`);
    // })
    
    // biconomy.on("txMined", (data= {msg, id, hash, receipt}) => {
    //   console.log(data);
    // });
    
    // biconomy.on("onError", (data= {error, transactionId}) => {
    //   console.log(data);
    // });
    
    // bicnomy.on("txHashChanged", (data= {transactionId, transactionHash}) => {
    //   console.log(data);
    // });
    
    // const response = await contract.methods
    //   .mint(address, 1, 1, "0x12")
    //   .send({ from: address })
    //const tokenId = response.events.Transfer.returnValues.tokenId;

    let contract = new web3.eth.Contract(
      abi,
      contractAddress
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

    // let userAddress = "";
// let privateKey = "";


    // alert(
    //   `NFT successfully minted. Contract address - ${contractAddress}`
    // );
    // if (response)
    // {
    //   Router.push("/")
    // }
    // console.log(response)


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

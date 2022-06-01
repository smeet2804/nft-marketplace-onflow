import './App.css';

import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import {useState, useEffect} from 'react';
import {getNFTsScript} from "./cadence/scripts/get_nfts.js";


function Collection(props) {
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    console.log("In---");
    getUserNFTs();
  }, [])

  const getUserNFTs = async () => {
      const result = await fcl.send([
          fcl.script(getNFTsScript),
          fcl.args([
              fcl.arg(props.address, t.Address)
          ])
      ]).then(fcl.decode);

      console.log(result);
      setNFTs(result);
  }
 
  return (
    <div>
      <br>
      </br>
      <br>
      </br>
      <h1>My NFT Collection</h1>
      {nfts.map(nft => (
          <div key={nft.id}>
            <hr></hr>
              <h1>{nft.id}</h1>
              <img style={{width: "100px"}} src={`https://ipfs.infura.io/ipfs/${nft.ipfsHash}`} />
              <h1>{nft.metadata.name}</h1>
              <hr></hr>
          </div>
      ))}
    </div>
  );
}

export default Collection;
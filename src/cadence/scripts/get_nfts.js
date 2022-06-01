export const getNFTsScript = `
import MyNFT from 0xf8d6e0586b0a20c7
import NonFungibleToken from 0xf8d6e0586b0a20c7
import FungibleToken from 0xee82856bf20e2aa6
import FlowToken from 0x0ae53cb6e3f42a79
import NFTMarketplace from 0xf8d6e0586b0a20c7

pub fun main(account: Address): [&MyNFT.NFT] {
  let collection = getAccount(account).getCapability(/public/MyNFTCollection)
                    .borrow<&MyNFT.Collection{NonFungibleToken.CollectionPublic, MyNFT.CollectionPublic}>()
                    ?? panic("Can't get the User's collection.")

  let returnVals: [&MyNFT.NFT] = []

  let ids = collection.getIDs()
  for id in ids {
    returnVals.append(collection.borrowEntireNFT(id: id))
  }

  return returnVals
}
`
export const getSaleNFTsScript = `
import MyNFT from 0xf8d6e0586b0a20c7
import NonFungibleToken from 0xf8d6e0586b0a20c7
import FungibleToken from 0xee82856bf20e2aa6
import FlowToken from 0x0ae53cb6e3f42a79
import NFTMarketplace from 0xf8d6e0586b0a20c7

pub fun main(account: Address): {UInt64: NFTMarketplace.SaleItem} {
  let saleCollection = getAccount(account).getCapability(/public/MySaleCollection)
                        .borrow<&NFTMarketplace.SaleCollection{NFTMarketplace.SaleCollectionPublic}>()
                        ?? panic("Could not borrow the user's SaleCollection")

  let collection = getAccount(account).getCapability(/public/MyNFTCollection) 
                    .borrow<&MyNFT.Collection{NonFungibleToken.CollectionPublic, MyNFT.CollectionPublic}>()
                    ?? panic("Can't get the User's collection.")

  let saleIDs = saleCollection.getIDs()

  let returnVals: {UInt64: NFTMarketplace.SaleItem} = {}

  for saleID in saleIDs {
    let price = saleCollection.getPrice(id: saleID)
    let nftRef = collection.borrowEntireNFT(id: saleID)

    returnVals.insert(key: nftRef.id, NFTMarketplace.SaleItem(_price: price, _nftRef: nftRef))
  }

  return returnVals
}
`
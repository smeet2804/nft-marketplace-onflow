export const purchaseTx = `
import MyNFT from 0xf8d6e0586b0a20c7
import NonFungibleToken from 0xf8d6e0586b0a20c7
import FungibleToken from 0xee82856bf20e2aa6
import FlowToken from 0x0ae53cb6e3f42a79
import NFTMarketplace from 0xf8d6e0586b0a20c7

transaction(account: Address, id: UInt64) {

  prepare(acct: AuthAccount) {
    let saleCollection = getAccount(account).getCapability(/public/MySaleCollection)
                        .borrow<&NFTMarketplace.SaleCollection{NFTMarketplace.SaleCollectionPublic}>()
                        ?? panic("Could not borrow the user's SaleCollection")

    let recipientCollection = getAccount(acct.address).getCapability(/public/MyNFTCollection) 
                    .borrow<&MyNFT.Collection{NonFungibleToken.CollectionPublic}>()
                    ?? panic("Can't get the User's collection.")

    let price = saleCollection.getPrice(id: id)

    let payment <- acct.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)!.withdraw(amount: price) as! @FlowToken.Vault

    saleCollection.purchase(id: id, recipientCollection: recipientCollection, payment: <- payment)
  }

  execute {
    log("A user purchased an NFT")
  }
}

`
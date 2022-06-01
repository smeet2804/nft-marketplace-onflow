export const setupUserTx = `
import MyNFT from 0xf8d6e0586b0a20c7
import NonFungibleToken from 0xf8d6e0586b0a20c7
import FungibleToken from 0xee82856bf20e2aa6
import FlowToken from 0x0ae53cb6e3f42a79
import NFTMarketplace from 0xf8d6e0586b0a20c7

transaction {

  prepare(acct: AuthAccount) {
    acct.save(<- MyNFT.createEmptyCollection(), to: /storage/MyNFTCollection)
    acct.link<&MyNFT.Collection{MyNFT.CollectionPublic, NonFungibleToken.CollectionPublic}>(/public/MyNFTCollection, target: /storage/MyNFTCollection)
    acct.link<&MyNFT.Collection>(/private/MyNFTCollection, target: /storage/MyNFTCollection)
    
    let MyNFTCollection = acct.getCapability<&MyNFT.Collection>(/private/MyNFTCollection)
    let FlowTokenVault = acct.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)

    acct.save(<- NFTMarketplace.createSaleCollection(MyNFTCollection: MyNFTCollection, FlowTokenVault: FlowTokenVault), to: /storage/MySaleCollection)
    acct.link<&NFTMarketplace.SaleCollection{NFTMarketplace.SaleCollectionPublic}>(/public/MySaleCollection, target: /storage/MySaleCollection)
  }

  execute {
    log("A user stored a Collection and a SaleCollection inside their account")
  }
}

`
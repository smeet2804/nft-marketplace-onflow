export const listForSaleTx = `
import NFTMarketplace from 0xf8d6e0586b0a20c7
transaction(id: UInt64, price: UFix64) {

  prepare(acct: AuthAccount) {
    let saleCollection = acct.borrow<&NFTMarketplace.SaleCollection>(from: /storage/MySaleCollection)
                            ?? panic("This SaleCollection does not exist")

    saleCollection.listForSale(id: id, price: price)
  }

  execute {
    log("A user listed an NFT for Sale")
  }
}
`
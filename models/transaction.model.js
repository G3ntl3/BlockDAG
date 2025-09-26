const mongoose= require('mongoose')
const transactionSchema = mongoose.Schema({
    // userId (ref: User)
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: {type:String, required:true},
    // txHash (from BlockDAG)
    txHash:{type:String, required:true},
    // status (pending, confirmed, failed)
  trxStatus: { type: String, enum: ['success', 'failed', 'pending'], default: 'pending' },
      createdAt: { type: Date, default: Date.now },



})
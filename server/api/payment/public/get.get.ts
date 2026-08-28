import { IAuth } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    
      const bank = await DB.BankAccount.findOne({user: auth._id})
      return resp(event, { result: bank })
  } 
  catch (e:any) {
    return resp(event, { code: 500, message: e.toString() })
  }
})
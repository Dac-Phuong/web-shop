import { IAuth } from "~~/types"
import { IDBBankAccount } from "~~/types/model/payment"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth

    const {
      user: userId,
      bankName,
      accountNumber,
      accountName,
      address,
    } = await readBody(event)

    if (!userId) {
      throw 'Dữ liệu đầu vào không hợp lệ'
    }

    if (!bankName) {
      throw 'Vui lòng nhập tên ngân hàng'
    }

    if (!accountNumber) {
      throw 'Vui lòng nhập số tài khoản'
    }

    if (!accountName) {
      throw 'Vui lòng nhập tên chủ tài khoản'
    }

    // Kiểm tra user
    const user = await DB.User
      .findOne({ _id: userId })
      .select('username type')

    if (!user) {
      throw 'Người dùng không tồn tại'
    }

    // Kiểm tra quyền
    if (user.type == 3 && auth.type < 3) {
      throw 'Không thể sửa thông tin tài khoản'
    }

    if (user.type == 2 && auth.type < 2) {
      throw 'Không thể sửa thông tin tài khoản'
    }

    const bankData = {
      bankName: bankName.trim(),
      accountNumber: accountNumber.trim(),
      accountName: accountName.trim(),
      address: address?.trim() || '',
    }

    const bankAccount = await DB.BankAccount
      .findOneAndUpdate(
        { user: userId },
        {
          $set: bankData,
          $setOnInsert: {
            user: userId,
          },
        },
        {
          new: true,
          upsert: true,
        }
      ) as IDBBankAccount

    if (!bankAccount) {
      throw 'Không thể cập nhật tài khoản ngân hàng'
    }

    await logAdmin(
      event,
      `Sửa <b>tài khoản ngân hàng</b> của tài khoản <b>${user.username}</b>`
    )

    return resp(event, {
      result: {
        bankAccount: [bankAccount],
      },
      message: 'Cập nhật tài khoản ngân hàng thành công',
    })

  } catch (e: any) {
    return resp(event, {
      code: 400,
      message: e.toString(),
    })
  }
})
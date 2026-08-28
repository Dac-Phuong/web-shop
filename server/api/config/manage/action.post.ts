import { IAuth } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    await checkPermission(event, 'config.action')

    const data = await readBody(event)
    const { type } = data
    if(!type) throw 'Dữ liệu đầu vào không hợp lệ'

    if(type == 'reset-config'){
      await DB.Config.updateMany({}, {
        name: 'Web Tool Telegram',
        short_name: 'Tool Telegram',
        description: 'Tool Telegram là một nền tảng cung cấp các công cụ và dịch vụ liên quan đến Telegram, giúp người dùng tận dụng tối đa tiềm năng của ứng dụng nhắn tin này.',
        og_image: '',
        logo_image: '',
        logo_long_image: '',
        makeby: 'Chun Dev',
        about: '',
        privacy: '',
        terms: '',
        more_game: '',
        license: false,
     
      })

      await logAdmin(event, 'Thao tác <b>đặt lại cấu hình</b> web')
      !!IO && IO.emit('config-update')
    }

    return resp(event, { message: 'Thực hiện thành công' })
  } 
  catch (e:any) {
    return resp(event, { code: 400, message: e.toString() })
  }
})
import { IAuth } from "~/types/utils"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    await checkPermission(event, 'config.update')

    const data = await readBody(event)
    const { change, logo_image, game, enable } = data
    if(!change) throw 'Dữ liệu đầu vào không hợp lệ'
    
    if(change == 'enable') logAdmin(event, 'Cập nhật cài đặt <b>chức năng trang</b>')
    if(change == 'basic') logAdmin(event, 'Cập nhật thông tin <b>cơ bản</b> trang web')
    if(change == 'contact') logAdmin(event, 'Cập nhật thông tin <b>liên hệ</b> trang web')
    if(change == 'social') logAdmin(event, 'Cập nhật thông tin <b>mạng xã hội</b> trang web')
    if(change == 'game') logAdmin(event, 'Cập nhật cấu hình <b>trò chơi</b>')
    if(change == 'facebook') logAdmin(event, 'Cập nhật cấu hình <b>API Facebook</b>')
    if(change == 'google') logAdmin(event, 'Cập nhật cấu hình <b>API Google</b>')
    if(change == 'zalo') logAdmin(event, 'Cập nhật cấu hình <b>API Zalo</b>')
    if(change == 'tiktok') logAdmin(event, 'Cập nhật cấu hình <b>API Tiktok</b>')
    if(change == 'menu') logAdmin(event, 'Cập nhật cấu hình <b>Menu</b>')

   
    // Update
    delete data['_id']
    delete data['change']
    await DB.Config.updateMany({}, data)

    if(!!logo_image){
      await DB.User.updateMany({
        avatar: '/images/user/default.png'
      }, {
        avatar: logo_image
      })
    }

    !!IO && IO.emit('config-update')
    return resp(event, { message: 'Cập nhật thành công' })
  } 
  catch (e:any) {
    return resp(event, { code: 400, message: e.toString() })
  }
})
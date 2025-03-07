import { Body, Controller, Ctx, Post } from 'amala'
import { Context } from 'koa'
import { findOrCreateUser } from '@/models/User'
import { forbidden } from '@hapi/boom'
import GoogleLogin from '@/validators/GoogleLogin'
import getGoogleUser from '@/helpers/getGoogleUser'

@Controller('/auth')
export default class LoginController {
  @Post('/google')
  async google(@Body({ required: true }) { accessToken }: GoogleLogin) {
    const userData = await getGoogleUser(accessToken)
    const user = await findOrCreateUser({
      email: userData.email,
      name: userData.name,
    })
    return user.strippedAndFilled({ withExtra: true })
  }
}

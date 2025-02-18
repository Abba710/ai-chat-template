import { Controller, Post, Body, Ctx } from 'amala'
import { Context } from 'koa'
import { queryAi } from '@/services/AiServices'

@Controller('/ai')
export default class AiController {
  @Post('/')
  async handleAiRequest(@Body('text') text: string, @Ctx() ctx: Context) {
    if (!text) {
      ctx.throw(400, 'Text is required')
    }

    const aiResponse = await queryAi(text)
    if (!aiResponse) {
      ctx.throw(500, 'AI response is empty')
    }

    return { response: aiResponse }
  }
}

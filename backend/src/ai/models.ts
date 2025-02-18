import env from '@/helpers/env'
import OpenAI from 'openai'

if (!env.Zuki) {
  throw new Error(
    'API key for Zuki is missing! Please check your environment variables.'
  )
}

// test model, only for dev
export const zukiGPT4 = new OpenAI({
  baseURL: 'https://api.zukijourney.com/v1',
  apiKey: env.Zuki,
})

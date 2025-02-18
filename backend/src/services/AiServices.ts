import { zukiGPT4 } from '@/ai/models'
import { systemPrompt } from '@/ai/config/aiconfig'
import { encoding_for_model, TiktokenModel } from 'tiktoken'

type AIResponse = string | undefined

// Cache for system prompt tokens to avoid recalculating on every request
let cachedSystemPromptTokens: number | null = null

// Function to count tokens for a given text and model
const countTokens = (
  text: string,
  model: TiktokenModel = 'gpt-4o-mini' as TiktokenModel
): number => {
  const encoding = encoding_for_model(model)
  return encoding.encode(text).length
}

export async function queryAi(text: string): Promise<AIResponse> {
  try {
    // Cache system prompt tokens if not already cached
    if (cachedSystemPromptTokens === null) {
      cachedSystemPromptTokens = countTokens(
        systemPrompt.content || '',
        'gpt-4o-mini' as TiktokenModel
      )
    }

    // Count tokens for user message
    const userMessageTokens = countTokens(text, 'gpt-4o-mini' as TiktokenModel)

    console.log(`User message tokens: ${userMessageTokens}`)
    console.log(`System prompt tokens: ${cachedSystemPromptTokens}`)

    // Send request to AI with strict max_tokens limit for the response
    const response = await zukiGPT4.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [systemPrompt, { role: 'user', content: text }],
      max_tokens: 250, // Strict limit of 250 tokens for the AI response
    })

    // Extract AI response
    const reply: AIResponse = response.choices[0]?.message?.content || undefined

    // Count tokens in AI response
    if (reply) {
      const aiResponseTokens = countTokens(
        reply,
        'gpt-4o-mini' as TiktokenModel
      )
      console.log(`AI response tokens: ${aiResponseTokens}`)
      console.log(
        'Total: ',
        userMessageTokens + cachedSystemPromptTokens + aiResponseTokens
      )
    }

    console.log(reply)
    return reply
  } catch (error) {
    console.error('AI query failed:', error)
    return undefined
  }
}

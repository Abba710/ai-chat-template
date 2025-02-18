// queryAi.test.ts
import { queryAi } from '@/services/AiServices'
import { zukiGPT4 } from '@/ai/models'

// Mock zukiGPT4 to isolate tests from external API calls
jest.mock('@/ai/models', () => ({
  zukiGPT4: {
    chat: {
      completions: {
        create: jest.fn(),
      },
    },
  },
}))

describe('queryAi', () => {
  // Mock console.error to suppress error logs in tests
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  // Restore original console.error after tests
  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('should return AI response on success', async () => {
    const mockResponse = {
      choices: [{ message: { content: 'Hello, world!' } }],
    }

    // Mock successful API response
    ;(zukiGPT4.chat.completions.create as jest.Mock).mockResolvedValue(
      mockResponse
    )

    const result = await queryAi('Test message')
    expect(result).toBe('Hello, world!')
  })

  it('should handle errors and return undefined', async () => {
    // Mock API error
    ;(zukiGPT4.chat.completions.create as jest.Mock).mockRejectedValue(
      new Error('API error')
    )

    const result = await queryAi('Test message')
    expect(result).toBeUndefined()
  })
})

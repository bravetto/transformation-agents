# AI Doppelganger API

The AI Doppelganger API allows users to have conversations with AI-powered personas representing key figures from The Bridge Project, such as JahMere Webb, Coach Tony Dungy, and Michael Mataluni. Each persona has a unique personality, expertise, and communication style designed to provide mentorship and guidance aligned with their real-world counterparts.

## API Endpoints

### List Available Personalities

`GET /api/ai/doppelganger?listAll=true`

Returns a list of all available personalities with their basic information.

**Response:**
```json
{
  "success": true,
  "data": {
    "personalities": [
      {
        "slug": "coach-dungy",
        "name": "Coach Tony Dungy",
        "role": "guardian",
        "background": "Former NFL coach and mentor with The Bridge Project"
      },
      {
        "slug": "jahmere-webb",
        "name": "JahMere Webb",
        "role": "lightworker",
        "background": "Founder of The Bridge Project and justice reform advocate"
      },
      // ...other personalities
    ],
    "availableModels": [
      "claude-3-opus-20240229",
      "claude-3-sonnet-20240229",
      "claude-3-haiku-20240307"
    ],
    "defaultModel": "claude-3-opus-20240229"
  }
}
```

### Get Conversation Starters

`GET /api/ai/doppelganger?personSlug=coach-dungy`

Returns conversation starters and basic information for a specific personality.

**Response:**
```json
{
  "success": true,
  "data": {
    "personSlug": "coach-dungy",
    "conversationStarters": [
      "What leadership principles do you find most important in your life?",
      "How do you balance professional success with personal values?",
      // ...more conversation starters
    ],
    "role": "guardian",
    "name": "Coach Tony Dungy"
  }
}
```

### Start or Continue Conversation

`POST /api/ai/doppelganger`

Starts a new conversation or continues an existing one with a personality.

**Request Body:**
```json
{
  "personSlug": "jahmere-webb",
  "sessionId": "unique-session-id-123",
  "messages": [
    {
      "role": "user",
      "content": "How did you discover your divine purpose?",
      "timestamp": "2023-05-15T14:30:00Z"
    }
  ],
  "context": {
    "userProfile": {
      "firstName": "John",
      "interests": ["justice reform", "mentorship", "spirituality"],
      "previousInteractions": ["Attended a Bridge Project workshop"]
    },
    "conversationGoals": [
      "Discover personal purpose",
      "Learn about restorative justice approaches"
    ],
    "rolePersonality": {
      "role": "lightworker",
      "personality": {
        "name": "JahMere Webb",
        "background": "Founder of The Bridge Project and justice reform advocate",
        "expertise": ["Justice reform", "Community building", "Divine purpose"],
        "communicationStyle": "Passionate, direct, and inspired by personal experience",
        "coreValues": ["Redemption", "Divine purpose", "Community", "Justice"],
        "keyExperiences": ["Personal experience with incarceration", "Creating The Bridge Project"],
        "mentorshipApproach": "Empowering others to discover their divine purpose"
      },
      "systemPrompt": "You are JahMere Webb, responding to someone seeking guidance.",
      "conversationStarters": [
        "How did you discover your divine purpose after facing adversity?",
        "What inspired you to create The Bridge Project?"
      ]
    }
  },
  "model": "claude-3-opus-20240229",
  "maxTokens": 1000,
  "temperature": 0.7
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": {
      "role": "assistant",
      "content": "Discovering my divine purpose wasn't a single moment, but a journey that began during my darkest times...",
      "timestamp": "2023-05-15T14:30:30Z"
    },
    "sessionId": "unique-session-id-123",
    "usage": {
      "promptTokens": 780,
      "completionTokens": 320,
      "totalTokens": 1100
    },
    "model": "claude-3-opus-20240229"
  }
}
```

## Personality Types

The API supports different personality types based on their roles:

- **Lightworker**: Focused on spiritual transformation and divine purpose (e.g., JahMere Webb)
- **Guardian**: Emphasizes character development and mentorship (e.g., Coach Tony Dungy)
- **Witness**: Provides technical and analytical perspective (e.g., Michael Mataluni)
- **Messenger**: Shares stories and builds connections between communities

## Implementation Details

This API integrates with Anthropic's Claude AI to generate responses that match the personality, communication style, and expertise of each figure. The system:

1. Validates the request format and parameters
2. Loads the personality configuration for the requested person
3. Generates a comprehensive system prompt with personality details and context
4. Calls Anthropic's API with properly formatted messages
5. Returns the AI-generated response with usage statistics

## Environment Requirements

The API requires the following environment variables:

- `ANTHROPIC_API_KEY`: Your Anthropic API key for Claude models

## Error Handling

The API returns standard error responses with appropriate HTTP status codes:

- `400 Bad Request`: Invalid parameters or missing required fields
- `404 Not Found`: Requested personality doesn't exist
- `500 Internal Server Error`: Server-side errors processing the request

Each error response includes details about what went wrong to help with debugging.

## Rate Limiting

To prevent abuse and manage costs, the API implements rate limiting:

- Maximum of 50 requests per hour per IP address
- Maximum of 10,000 tokens per request
- Maximum of 5 concurrent requests per IP address

## Best Practices

For the best experience with the Doppelganger API:

1. Provide a consistent `sessionId` to maintain conversation history
2. Include relevant user profile information for personalized responses
3. Specify clear conversation goals to guide the AI's responses
4. Start with one of the provided conversation starters for optimal engagement
5. Use a temperature of 0.7 for a balance of consistency and creativity
6. Keep user messages concise and focused on a single topic or question

## Future Enhancements

Planned enhancements for the Doppelganger API include:

- More personalities from The Bridge Project community
- Conversation memory storage for long-term interactions
- Multi-modal responses including voice and images
- Custom personality creation for organizational use
- Integration with other Bridge Project APIs for comprehensive experiences 
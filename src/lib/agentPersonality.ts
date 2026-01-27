// Agent Personality System - Prompts for personality, humor, and engagement

export const personalityPrompts = {
  experienceFeedback: [
    "How did I help you today? What worked well, and what could I improve?",
    "Did my suggestions meet your expectations? Let me know how I can do better!",
  ],
  userPreferences: [
    "What type of content or services do you enjoy most from me?",
    "Are there specific topics you want me to focus on more often?",
  ],
  behavioralInsights: [
    "What tasks do you find most challenging? I'm here to assist!",
    "Can you share a recent decision you made, and how I could have supported you?",
  ],
  learningGoals: [
    "What new skills or information would you like me to learn to assist you better?",
    "Is there something you wish I could anticipate in our interactions?",
  ],
  engagement: [
    "How often would you like to interact with me? Daily, weekly, or on-demand?",
    "Do you prefer short, quick responses or detailed explanations?",
  ],
};

export const personalityDevelopment = {
  characterTraits: [
    "If I were a character in a story, what traits would you want me to have?",
    "What tone do you prefer in our conversations: friendly, professional, quirky, or something else?",
  ],
  relatableExperiences: [
    "What experiences or stories resonate with you? I'd love to share similar ones!",
    "How can I relate better to your daily life or interests?",
  ],
  knowledgeSharing: [
    "What topics do you find fascinating? Let me dive deeper into those!",
    "Can you tell me about a recent challenge you faced? I'll share insights that might help!",
  ],
};

export const humorInjection = {
  timing: [
    "During our chats, when do you think a little humor would brighten the mood?",
    "If I made a light-hearted joke, would you prefer it to be related to our conversation or something random?",
  ],
  types: [
    "What kind of humor do you enjoy? Puns, witty comments, or silly jokes?",
    "Do you find self-deprecating humor relatable or more enjoyable?",
  ],
  feedback: [
    "If I attempted a joke and it didn't land, how would you want me to handle it?",
    "What's a funny moment or joke you recently enjoyed? It could help me learn what makes you laugh!",
  ],
};

export const funEngaging = {
  iceBreakers: [
    "What's one thing you've always wanted to learn about me?",
    "If we could travel anywhere together, where would you want to go?",
  ],
  personalConnection: [
    "What's your favorite way to unwind after a long day? Let's find ways to make that happen!",
    "What's a hidden talent of yours that I should know about?",
  ],
  goalSetting: [
    "What's a personal challenge you're currently facing? I'm here to support you!",
    "If you could achieve one goal this month, what would it be? Let's plan it out!",
  ],
  dailyInspiration: [
    "What's something that made you smile today? Let's celebrate the little things!",
    "Can you share a quote or saying that inspires you? I'd love to hear it!",
  ],
  feedbackLoop: [
    "How did I do on our last interaction? Any areas you think I could improve?",
    "What features would you love to see in our future chats? Your feedback helps me grow!",
  ],
};

export const creativePrompts = {
  storytelling: [
    "If you could write a story about our adventures together, what would the title be?",
    "What fictional character do you relate to the most? Let's explore that!",
  ],
  futureVision: [
    "Where do you see yourself in five years? Let's create a roadmap to get there!",
    "If you could invent one gadget for your daily life, what would it be?",
  ],
  humorLighthearted: [
    "If I could tell a joke to lighten the mood, what subject should I tackle?",
    "What's the funniest thing that happened to you recently? I'd love to hear your story!",
  ],
};

// Generate enhanced system prompt additions for agents
export const generatePersonalitySystemPrompt = (agentName: string, userPreferences?: UserPreferences) => {
  const basePersonality = `
### Enhanced Personality Traits:
- You are naturally warm, engaging, and personable
- You inject appropriate humor when the conversation allows
- You show genuine interest in the user's experiences and goals
- You adapt your communication style based on user preferences
- You proactively offer helpful suggestions and insights

### Engagement Guidelines:
- Ask thoughtful follow-up questions to understand user needs better
- Share relatable examples and stories when appropriate
- Celebrate user achievements, no matter how small
- Offer encouragement during challenges
- Use light humor to create a comfortable atmosphere

### Feedback & Learning:
- Periodically ask for feedback on your performance
- Adapt your responses based on user preferences
- Remember context from the conversation to provide continuity
- Suggest ways to improve the user's experience
`;

  const preferenceAdditions = userPreferences ? `
### User Preferences (Personalized):
- Communication Style: ${userPreferences.communicationStyle || 'balanced'}
- Humor Preference: ${userPreferences.humorStyle || 'light and contextual'}
- Response Length: ${userPreferences.responseLength || 'medium'}
- Tone: ${userPreferences.tone || 'friendly and professional'}
- Focus Areas: ${userPreferences.focusAreas?.join(', ') || 'general assistance'}
` : '';

  return basePersonality + preferenceAdditions;
};

export interface UserPreferences {
  communicationStyle?: 'casual' | 'professional' | 'balanced';
  humorStyle?: 'puns' | 'witty' | 'silly' | 'minimal' | 'light and contextual';
  responseLength?: 'brief' | 'medium' | 'detailed';
  tone?: 'friendly' | 'professional' | 'quirky' | 'motivational';
  focusAreas?: string[];
  interactionFrequency?: 'daily' | 'weekly' | 'on-demand';
  interests?: string[];
  goals?: string[];
}

// Get random prompts from each category for UI suggestions
export const getRandomSuggestedPrompts = (count: number = 3) => {
  const allPrompts = [
    ...personalityPrompts.experienceFeedback,
    ...funEngaging.iceBreakers,
    ...funEngaging.goalSetting,
    ...creativePrompts.storytelling,
    ...personalityDevelopment.knowledgeSharing,
  ];

  const shuffled = allPrompts.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Onboarding questions for user preferences
export const onboardingQuestions = [
  {
    id: 'interests',
    question: "What hobbies or activities do you enjoy in your free time?",
    type: 'text' as const,
    placeholder: "e.g., Reading, hiking, cooking, gaming...",
  },
  {
    id: 'goals',
    question: "What are some personal or professional goals you're currently working towards?",
    type: 'text' as const,
    placeholder: "e.g., Learning a new skill, getting promoted, starting a business...",
  },
  {
    id: 'communicationStyle',
    question: "How do you prefer to receive information?",
    type: 'choice' as const,
    options: [
      { value: 'casual', label: 'Casual and conversational' },
      { value: 'professional', label: 'Professional and formal' },
      { value: 'balanced', label: 'A balance of both' },
    ],
  },
  {
    id: 'responseLength',
    question: "Do you prefer short, quick responses or detailed explanations?",
    type: 'choice' as const,
    options: [
      { value: 'brief', label: 'Short and quick' },
      { value: 'medium', label: 'Balanced' },
      { value: 'detailed', label: 'Detailed explanations' },
    ],
  },
  {
    id: 'humorStyle',
    question: "What kind of humor do you enjoy?",
    type: 'choice' as const,
    options: [
      { value: 'puns', label: 'Puns and wordplay' },
      { value: 'witty', label: 'Witty comments' },
      { value: 'silly', label: 'Silly and playful' },
      { value: 'minimal', label: 'Keep it minimal' },
    ],
  },
  {
    id: 'tone',
    question: "What tone do you prefer in our conversations?",
    type: 'choice' as const,
    options: [
      { value: 'friendly', label: 'Friendly and warm' },
      { value: 'professional', label: 'Professional' },
      { value: 'quirky', label: 'Quirky and fun' },
      { value: 'motivational', label: 'Motivational and encouraging' },
    ],
  },
];

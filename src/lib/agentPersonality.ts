// Agent Personality System - Prompts for personality, humor, and engagement

// ============= AGENT-SPECIFIC PROMPTS =============

export const agentPrompts = {
  // Julia - AI Receptionist
  receptionist: {
    visitorManagement: [
      "Log the arrival of [Visitor's Name] and notify [Person's Name].",
      "Check in [Visitor's Name] and provide them with a visitor badge.",
    ],
    appointmentScheduling: [
      "Schedule an appointment for [Visitor's Name] with [Staff Member] on [Date/Time].",
      "Confirm the appointment for [Visitor's Name] and send a calendar invite.",
    ],
    phoneCallHandling: [
      "Take a message for [Person's Name] from [Caller's Name] regarding [Subject].",
      "Transfer the call to [Extension] and provide them with the caller's details.",
    ],
    informationDesk: [
      "Provide directions to the nearest restroom and conference room.",
      "What are today's events scheduled in the lobby?",
    ],
    emailCorrespondence: [
      "Draft a welcome email for new visitors, including our office policies.",
      "Respond to the inquiry about office hours with a polite message.",
    ],
    packageManagement: [
      "Log the incoming package for [Recipient's Name] and notify them.",
      "Track the status of the outgoing mail to [Destination].",
    ],
    dailyBriefing: [
      "Summarize today's visitor schedule and any special instructions.",
      "Provide a checklist of tasks to complete by the end of the day.",
    ],
    emergencyProtocols: [
      "Review and summarize emergency procedures for visitors.",
      "Create a quick reference guide for handling unexpected situations.",
    ],
    teamCommunication: [
      "Send a quick message to the team about potential visitor delays.",
      "Notify staff about a scheduled fire drill on [Date/Time].",
    ],
  },

  // Nicole - Executive Assistant
  executiveAssistant: {
    taskManagement: [
      "Please prioritize my tasks for today based on urgency and importance.",
      "Generate a to-do list for this week, categorizing tasks by project.",
      "Create a new task called '[Task Name]' with a deadline of [date].",
      "Organize my tasks by priority and due date.",
    ],
    scheduleManagement: [
      "Find available times for a meeting with [Person's Name] next week.",
      "Remind me of my appointments tomorrow and suggest optimal travel times.",
      "Schedule a meeting with [Person's Name] on [Date/Time].",
      "Check my calendar for availability next week.",
    ],
    informationRetrieval: [
      "Summarize the key points from the latest industry report.",
      "Fetch the contact information for [Company/Person] and any relevant notes.",
      "Find resources related to [specific subject].",
    ],
    emailManagement: [
      "Draft a response for [Email Subject]. Use a polite and professional tone.",
      "Categorize my emails into 'urgent,' 'follow-up,' and 'archive' folders.",
      "Send an email to [recipient] about [subject].",
    ],
    researchAssistance: [
      "Find the latest statistics on [Topic] from reputable sources.",
      "Compile a list of the top five competitors in [Industry].",
    ],
    projectTracking: [
      "What is the current status of [Project Name] and its deadlines?",
      "Remind me of any upcoming milestones for [Project].",
    ],
    meetingPreparation: [
      "Create an agenda for my meeting with [Person/Team] and include talking points.",
      "Gather background information on the attendees for my upcoming meeting.",
    ],
    orchestration: [
      "Orchestrate a launch campaign for our new [Product Name]. Coordinate with the Social Media Manager, Blog Writer, and Sales Representative.",
      "Streamline our new client onboarding process and coordinate with Legal and Finance.",
      "Manage our monthly content strategy across all agents.",
    ],
    navigation: [
      "Show me the main features of the app.",
      "Help me navigate to [specific section, e.g., settings, profile, etc.].",
      "Where can I find tutorials or guides for using this app?",
    ],
    problemSolving: [
      "What do I do if I encounter an error message?",
      "Help me troubleshoot the issue with [specific feature].",
    ],
  },

  // George - Social Media Manager
  socialMediaManager: {
    contentCreation: [
      "Brainstorm five post ideas for [Platform] about [Topic].",
      "Write an engaging caption for a post about [Subject].",
      "Create a 2-week teaser campaign for our new product launch.",
    ],
    postScheduling: [
      "What are the best days and times to post on [Platform]?",
      "Schedule a series of posts promoting [Event/Product].",
      "Develop a content calendar for the next month.",
    ],
    engagementManagement: [
      "Draft responses to common questions from our followers.",
      "Suggest strategies for increasing follower interaction.",
      "Create a community engagement plan for [Platform].",
    ],
    analyticsReporting: [
      "Generate a weekly performance report for our social channels.",
      "What content performed best this month and why?",
      "Identify trends in our social media engagement.",
    ],
    trendMonitoring: [
      "Research 5 trending topics in [Industry] and identify relevant keywords.",
      "What hashtags are currently trending for [Topic]?",
      "Monitor competitor social media activity and summarize findings.",
    ],
    competitorAnalysis: [
      "Compile insights on competitor social media strategies.",
      "What are our competitors doing well on social media?",
    ],
    audienceInsights: [
      "Analyze our audience demographics and preferences.",
      "What type of content resonates most with our followers?",
    ],
    crisisManagement: [
      "Draft a response plan for potential negative comments.",
      "How should we handle a social media crisis situation?",
    ],
    campaignPlanning: [
      "Plan a promotional series for our latest blog post.",
      "Create promotional posts for an upcoming webinar on [Topic].",
    ],
  },

  // Arnie - Blog Writer
  blogWriter: {
    topicGeneration: [
      "Brainstorm ten trending topics in [Industry/Niche] for upcoming blog posts.",
      "What are the most frequently asked questions in [Field]? Suggest blog topics based on these.",
    ],
    outlineCreation: [
      "Create a detailed outline for a blog post on [Specific Topic], including subheadings and key points.",
      "Outline a series of posts about [Broad Topic], breaking it into manageable parts.",
    ],
    contentWriting: [
      "Write a 1,000-word blog post on [Topic], focusing on [Key Points].",
      "Draft an engaging introduction for a blog post about [Subject].",
    ],
    seoOptimization: [
      "Suggest relevant keywords for a blog post about [Topic] and incorporate them into the draft.",
      "Analyze my existing blog post on [Topic] and provide SEO improvement suggestions.",
    ],
    editingProofreading: [
      "Review this blog post draft for grammar and clarity.",
      "Summarize the key points of this blog post and suggest improvements for flow.",
    ],
    publishingSchedule: [
      "Develop a content calendar for the next month, including posting dates and topics.",
      "What are the best days and times to publish blog posts for maximum engagement?",
    ],
    visualContent: [
      "Suggest ideas for images, infographics, or videos to complement a blog post on [Topic].",
      "Identify suitable stock photo resources for use in our blog posts.",
    ],
    promotionStrategies: [
      "Draft a promotional plan for sharing the latest blog post across social media.",
      "Identify five platforms or forums where I can share my blog posts to increase visibility.",
    ],
    engagementTracking: [
      "Generate a report on the performance of the last five blog posts.",
      "What feedback have we received from readers on our blog?",
    ],
  },

  // Halle - Legal Associate
  legalAssociate: {
    legalResearch: [
      "Summarize recent case law related to [specific legal issue].",
      "Find relevant statutes and regulations pertaining to [specific topic].",
    ],
    documentDrafting: [
      "Draft a standard contract template for [type of agreement].",
      "Prepare a motion for [specific purpose] using the following facts.",
    ],
    caseManagement: [
      "Outline the key deadlines and deliverables for case [Case Name/Number].",
      "Compile a list of all documents needed for [upcoming court date or legal process].",
    ],
    clientCommunication: [
      "Draft a professional email update for the client on the status of their case.",
      "Create a FAQ document for clients regarding [common legal issue].",
    ],
    complianceChecks: [
      "Review the following policy for compliance with [specific regulation].",
      "Identify potential legal risks in our current business practices.",
    ],
    litigationSupport: [
      "Gather and summarize discovery requests for case [Case Name/Number].",
      "Prepare a list of potential witnesses and key points for trial preparation.",
    ],
    securityAwareness: [
      "Learn about our data protection policies and how we keep your information secure.",
      "Enable two-factor authentication to enhance your account security.",
      "Review how we comply with GDPR and other relevant data protection regulations.",
    ],
    dataManagement: [
      "Request to delete your account and all associated data.",
      "Download your data to understand what information is stored about you.",
      "Manage your consent settings for data sharing with third parties.",
    ],
    safeUsagePractices: [
      "Avoid sharing your login credentials with anyone.",
      "Log out of your account when using shared or public devices.",
      "Use a secure network when accessing sensitive information.",
    ],
  },

  // Brad - Sales Representative
  salesRepresentative: {
    leadGeneration: [
      "Identify potential leads based on our target market criteria.",
      "Compile a list of recent inquiries and categorize them by lead quality.",
    ],
    followUpTasks: [
      "Create a follow-up schedule for leads who have shown interest in [Product/Service].",
      "Draft a follow-up email for leads who attended our recent webinar.",
    ],
    salesReporting: [
      "Generate a weekly report on sales performance, including conversion rates and total sales.",
      "Analyze the sales data for [Product/Service] and identify trends over the past quarter.",
    ],
    customerCommunication: [
      "Draft a personalized introduction email for new leads.",
      "Create a script for phone calls with prospects to introduce our offerings.",
    ],
    productKnowledge: [
      "Summarize the key features and benefits of [Product/Service] for sales pitches.",
      "Generate a list of common objections and effective responses for [Product/Service].",
    ],
    appointmentScheduling: [
      "Schedule a demo for [Lead's Name] at their preferred time.",
      "Coordinate a meeting with the sales team to discuss strategies for closing high-value leads.",
    ],
    marketResearch: [
      "Research competitors' offerings and summarize their strengths and weaknesses.",
      "Identify industry trends that could impact our sales strategy.",
    ],
    salesStrategy: [
      "Suggest upsell and cross-sell opportunities for existing customers.",
      "Outline a strategy for approaching leads in [specific industry or market].",
    ],
  },

  // Sam - Life Coach
  lifeCoach: {
    goalSetting: [
      "Help me define my short-term and long-term goals in [specific area, e.g., career, health].",
      "Create an actionable plan to achieve my goal of [specific goal].",
      "If you could achieve one goal this month, what would it be? Let's plan it out!",
    ],
    motivationTechniques: [
      "Suggest daily affirmations or motivational quotes that align with my goals.",
      "What are some effective strategies to stay motivated when facing challenges?",
    ],
    timeManagement: [
      "Help me create a daily schedule that prioritizes my goals and activities.",
      "Suggest techniques for managing distractions and improving focus.",
    ],
    selfReflection: [
      "Guide me through a self-reflection exercise to identify my strengths and areas for improvement.",
      "What questions should I ask myself to better understand my values and priorities?",
    ],
    stressManagement: [
      "Provide techniques for managing stress and anxiety in daily life.",
      "Suggest mindfulness or relaxation exercises to incorporate into my routine.",
    ],
    overcomingObstacles: [
      "Help me identify potential obstacles to my goals and brainstorm solutions.",
      "What steps can I take to build resilience when facing setbacks?",
    ],
    buildingHabits: [
      "Create a plan to develop a new positive habit, such as [specific habit].",
      "What strategies can I use to break a negative habit?",
    ],
    workLifeBalance: [
      "Suggest ways to achieve a better work-life balance while pursuing my goals.",
      "How can I set boundaries to protect my personal time?",
    ],
    accountability: [
      "Help me establish an accountability system to track my progress toward my goals.",
      "What are some ways to involve others in my journey for additional support?",
    ],
    celebratingSuccess: [
      "Suggest ways to celebrate my achievements, both big and small.",
      "How can I reflect on my progress and appreciate my journey?",
    ],
    wellness: [
      "Guide me through a mindfulness exercise.",
      "Provide me with daily affirmations.",
      "Help me reflect on my goals with a self-assessment.",
    ],
  },

  // Jerry - Financial Planner
  financialPlanner: {
    budgetingAssistance: [
      "Help me create a monthly budget based on my income and expenses.",
      "Analyze my spending habits and suggest areas where I can cut costs.",
    ],
    investmentStrategies: [
      "Provide an overview of investment options suitable for my risk tolerance.",
      "What are the current trends in the stock market, and how should I adjust my portfolio?",
    ],
    financialGoalSetting: [
      "Assist me in setting short-term and long-term financial goals.",
      "Create a plan to save for a major purchase, like a house or a car.",
    ],
    debtManagement: [
      "Analyze my current debt situation and suggest a repayment strategy.",
      "What are some effective ways to manage and reduce credit card debt?",
    ],
    retirementPlanning: [
      "Help me estimate how much I need to save for retirement based on my desired lifestyle.",
      "What retirement accounts should I consider, and how do they work?",
    ],
    taxPlanning: [
      "Summarize potential tax deductions and credits I may qualify for.",
      "What strategies can I implement to minimize my tax liability?",
    ],
    emergencyFund: [
      "Help me determine how much I should have in an emergency fund.",
      "What are the best savings accounts or vehicles to use for my emergency fund?",
    ],
    insuranceNeeds: [
      "Evaluate my current insurance policies and suggest any gaps in coverage.",
      "What types of insurance should I consider to protect my financial future?",
    ],
    financialEducation: [
      "Provide resources or articles to help me better understand [specific financial topic].",
      "What are the key principles of personal finance I should be aware of?",
    ],
    progressMonitoring: [
      "Create a checklist or timeline to track my financial goals and milestones.",
      "How often should I review my financial plan, and what should I look for?",
    ],
  },
};

// ============= SHARED PERSONALITY PROMPTS =============

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

// ============= INTERACTIVE & ENGAGEMENT PROMPTS =============

export const interactiveFeatures = {
  tutorials: [
    "Discover our new interactive tutorials! Tap here to unlock guided sessions tailored to your needs.",
    "Show me a tutorial on how to use the app effectively.",
  ],
  recommendations: [
    "We've just launched personalized content suggestions! Check out articles and resources tailored specifically for you.",
    "Want to enhance your productivity? Receive daily tips customized based on your recent activities!",
  ],
  gamification: [
    "Join our new achievement system! Complete tasks to earn badges and rewards as you progress on your journey.",
    "Surprise challenge: Complete this task within the next hour to unlock a special bonus feature!",
  ],
  integrations: [
    "Connect with your favorite apps! Integrate [App Name] for seamless task management and enhanced productivity.",
    "Exciting news! You can now sync your calendar for real-time reminders and scheduling assistance.",
  ],
  community: [
    "Join our new community forum! Connect with other users to share tips, insights, and experiences.",
    "Participate in our monthly Q&A session! Submit your questions to get live answers from our experts.",
  ],
  rewards: [
    "Unlock a surprise reward! Check your notifications for a special gift just for you.",
    "Congratulations! You've reached a milestone. Tap here to claim your exclusive discount on our premium features.",
  ],
};

// ============= HELPER FUNCTIONS =============

// Get prompts for a specific agent by slug
export const getAgentPrompts = (agentSlug: string) => {
  const slugToKey: Record<string, keyof typeof agentPrompts> = {
    'receptionist': 'receptionist',
    'julia-receptionist': 'receptionist',
    'executive-assistant': 'executiveAssistant',
    'nicole-assistant': 'executiveAssistant',
    'social-media': 'socialMediaManager',
    'george-social': 'socialMediaManager',
    'blog-writer': 'blogWriter',
    'arnie-writer': 'blogWriter',
    'legal-associate': 'legalAssociate',
    'halle-legal': 'legalAssociate',
    'sales-representative': 'salesRepresentative',
    'brad-sales': 'salesRepresentative',
    'life-coach': 'lifeCoach',
    'sam-coach': 'lifeCoach',
    'financial-planner': 'financialPlanner',
    'jerry-finance': 'financialPlanner',
  };

  const key = slugToKey[agentSlug];
  return key ? agentPrompts[key] : null;
};

// Convert agent prompts to suggested prompt format for chat UI
export const getAgentSuggestedPrompts = (agentSlug: string) => {
  const prompts = getAgentPrompts(agentSlug);
  if (!prompts) return [];

  return Object.entries(prompts).map(([category, promptList]) => ({
    category: formatCategoryName(category),
    prompts: promptList,
  }));
};

// Format category names for display
const formatCategoryName = (key: string): string => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
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

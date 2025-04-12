
export interface ActivityEntry {
  id: string;
  application: string;
  title: string;
  category: string;
  startTime: string;
  endTime: string;
  duration: number; // in seconds
  tags: string[];
}

export interface DailySummary {
  date: string;
  totalTime: number; // in seconds
  productiveTime: number; // in seconds
  distractingTime: number; // in seconds
  topApplications: Array<{name: string, time: number}>;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export const mockActivities: ActivityEntry[] = [
  {
    id: "1",
    application: "VS Code",
    title: "activity-seer-optimise-now - src/App.tsx",
    category: "Programming",
    startTime: "2025-04-12T08:30:00Z",
    endTime: "2025-04-12T09:45:00Z",
    duration: 4500,
    tags: ["development", "react", "typescript"]
  },
  {
    id: "2",
    application: "Chrome",
    title: "React Documentation - React",
    category: "Research",
    startTime: "2025-04-12T09:50:00Z",
    endTime: "2025-04-12T10:15:00Z",
    duration: 1500,
    tags: ["research", "documentation", "learning"]
  },
  {
    id: "3",
    application: "Slack",
    title: "Team Discussion - #general",
    category: "Communication",
    startTime: "2025-04-12T10:20:00Z",
    endTime: "2025-04-12T10:35:00Z",
    duration: 900,
    tags: ["communication", "team", "collaboration"]
  },
  {
    id: "4",
    application: "Spotify",
    title: "Focus Playlist",
    category: "Entertainment",
    startTime: "2025-04-12T08:30:00Z",
    endTime: "2025-04-12T11:45:00Z",
    duration: 11700,
    tags: ["music", "background", "entertainment"]
  },
  {
    id: "5",
    application: "Chrome",
    title: "YouTube - How to Improve Productivity",
    category: "Learning",
    startTime: "2025-04-12T12:00:00Z",
    endTime: "2025-04-12T12:25:00Z",
    duration: 1500,
    tags: ["video", "learning", "productivity"]
  },
  {
    id: "6",
    application: "Excel",
    title: "Budget Spreadsheet - Q2 Planning",
    category: "Finance",
    startTime: "2025-04-12T13:30:00Z",
    endTime: "2025-04-12T14:45:00Z",
    duration: 4500,
    tags: ["spreadsheet", "planning", "finance"]
  },
  {
    id: "7",
    application: "Chrome",
    title: "Twitter - Home",
    category: "Social Media",
    startTime: "2025-04-12T14:50:00Z",
    endTime: "2025-04-12T15:05:00Z",
    duration: 900,
    tags: ["social media", "distraction", "browsing"]
  },
  {
    id: "8",
    application: "VS Code",
    title: "activity-seer-optimise-now - src/components/Dashboard.tsx",
    category: "Programming",
    startTime: "2025-04-12T15:10:00Z",
    endTime: "2025-04-12T16:40:00Z",
    duration: 5400,
    tags: ["development", "react", "typescript"]
  },
  {
    id: "9",
    application: "Zoom",
    title: "Weekly Team Meeting",
    category: "Meetings",
    startTime: "2025-04-12T17:00:00Z",
    endTime: "2025-04-12T18:00:00Z",
    duration: 3600,
    tags: ["meeting", "team", "planning"]
  },
  {
    id: "10",
    application: "Chrome",
    title: "Reddit - r/programming",
    category: "Social Media",
    startTime: "2025-04-12T18:05:00Z",
    endTime: "2025-04-12T18:20:00Z",
    duration: 900,
    tags: ["social media", "browsing", "programming"]
  }
];

export const mockDailySummary: DailySummary = {
  date: "2025-04-12",
  totalTime: 35400, // 9 hours, 50 mins
  productiveTime: 25200, // 7 hours
  distractingTime: 1800, // 30 mins
  topApplications: [
    { name: "VS Code", time: 9900 },
    { name: "Chrome", time: 4800 },
    { name: "Zoom", time: 3600 },
    { name: "Excel", time: 4500 },
    { name: "Slack", time: 900 }
  ]
};

export const mockCategoryData: CategoryData[] = [
  { name: "Programming", value: 9900, color: "#3B82F6" },
  { name: "Research", value: 1500, color: "#10B981" },
  { name: "Communication", value: 900, color: "#F59E0B" },
  { name: "Entertainment", value: 11700, color: "#EC4899" },
  { name: "Learning", value: 1500, color: "#8B5CF6" },
  { name: "Finance", value: 4500, color: "#6366F1" },
  { name: "Social Media", value: 1800, color: "#EF4444" },
  { name: "Meetings", value: 3600, color: "#14B8A6" }
];

export const mockRecommendations = [
  "Consider setting time limits for social media applications to reduce distractions.",
  "Your most productive hours appear to be between 8:30 AM and 11:00 AM. Try scheduling important tasks during this time.",
  "You spend 30% of your programming time switching between different files. Try organizing related tasks to reduce context switching.",
  "Taking a short 5-minute break every 50 minutes of deep work could improve your overall productivity and focus.",
  "Consider using the Pomodoro technique to structure your work sessions, especially when programming.",
  "Your background music selection influences your productivity. Classical or ambient music showed better focus metrics than lyrical songs."
];

export const mockTimelineData = [
  { time: "08:00", value: 10 },
  { time: "09:00", value: 85 },
  { time: "10:00", value: 75 },
  { time: "11:00", value: 80 },
  { time: "12:00", value: 45 },
  { time: "13:00", value: 20 },
  { time: "14:00", value: 70 },
  { time: "15:00", value: 65 },
  { time: "16:00", value: 75 },
  { time: "17:00", value: 60 },
  { time: "18:00", value: 50 },
  { time: "19:00", value: 30 }
];

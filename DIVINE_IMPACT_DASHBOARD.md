# Divine Impact Dashboard

## Overview

The Divine Impact Dashboard is a real-time visualization component showing The Bridge Project's growing influence and community support. It displays key metrics with beautiful animations, role-based styling, and interactive filtering capabilities to showcase the project's reach and effectiveness.

## Key Features

### 1. Real-Time Metrics Visualization
- Animated counters with smooth number transitions
- Real-time updates with refresh controls
- Pulse indicators showing live data
- Trend indicators with directional arrows and percentage changes
- Progress bars showing goals vs. current achievements

### 2. Role-Based Design
- Visual themes based on The Bridge Project's divine roles:
  - **Lightworker**: Amber/gold color scheme for enlightenment metrics
  - **Messenger**: Blue/indigo theme for communication metrics
  - **Witness**: Emerald/teal for observation and testimony metrics
  - **Guardian**: Purple/pink for protection and strength metrics

### 3. Metric Categories
- **Letters Submitted**: Character reference letters for JAHmere
- **Volunteers Registered**: Active supporters of The Bridge Project
- **Page Views**: Visitors engaging with JAHmere's story
- **Geographic Reach**: States/countries where support comes from
- **Social Shares**: Amplification across social platforms
- **Reading Time**: Engagement depth with content
- **Letter Quality**: Impact scoring of submitted letters
- **Story Engagement**: Interactive content participation

### 4. Interactive Features
- Role-based filtering to focus on specific aspects
- Manual refresh button for on-demand updates
- Configurable auto-refresh intervals
- Smooth animations on data changes
- Divine particles background effects

## Implementation Details

The component is built with:
- **Framer Motion**: For smooth animations and transitions
- **Divine Particles**: For role-specific background effects
- **Error Boundaries**: For resilient operation
- **Responsive Design**: Works on all device sizes

## Usage

```tsx
import DivineImpactDashboard from '@/components/divine-impact-dashboard'

export default function ImpactPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Project Impact</h1>
      
      <DivineImpactDashboard 
        defaultRole="messenger"
        refreshInterval={30000}
        autoRefresh={true}
      />
    </div>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | string | '' | Additional CSS classes |
| `refreshInterval` | number | 30000 | Auto-refresh interval in milliseconds |
| `autoRefresh` | boolean | true | Whether to enable auto-refresh |
| `defaultRole` | DivineRole | 'messenger' | Default role filter |
| `metrics` | Partial<MetricCard>[] | [] | Custom metrics to override defaults |

## Metric Card Structure

Each metric is represented by a card with the following structure:

```typescript
interface MetricCard {
  id: string              // Unique identifier
  title: string           // Display title
  value: number           // Current metric value
  suffix?: string         // Optional suffix (%, min, etc.)
  icon: LucideIcon        // Visual icon
  gradient: string        // Card background gradient
  description: string     // Explanatory text
  trend?: {               // Optional trend data
    value: number         // Percentage change
    direction: 'up' | 'down' | 'stable'  // Direction
    timeframe: string     // Period of change
  }
  goal?: number           // Optional target value
  role: DivineRole        // Associated divine role
}
```

## Demo

A test page is available at `/impact-dashboard-test` to demonstrate the dashboard's functionality with interactive controls for role filtering and refresh intervals.

## Technical Notes

- For production use, connect the dashboard to real data sources instead of the mock data generator
- Use server actions or API endpoints to fetch real-time metrics
- Consider implementing server-sent events or WebSockets for true real-time updates
- Add authentication and access controls for sensitive metrics 
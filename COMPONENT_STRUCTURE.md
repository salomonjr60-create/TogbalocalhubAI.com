# Togba Local Hub AI - Component Structure Guide

## Component Tree

```
App.tsx (Main Container)
│
├── Sidebar
│   ├── Logo Section
│   │   ├── Logo Icon (🤖)
│   │   ├── Logo Text ("Togba Hub")
│   │   └── Toggle Button (‹ ›)
│   │
│   ├── Navigation Menu
│   │   ├── Dashboard (📊)
│   │   ├── AI Content Studio (✍️)
│   │   ├── Social Media Marketing (📱)
│   │   ├── Google Ads Assistant (🔍)
│   │   ├── Meta Ads Assistant (👥)
│   │   ├── SEO Assistant (🚀)
│   │   ├── Email Marketing (✉️)
│   │   ├── Marketing Strategy (🎯)
│   │   ├── AI Image Studio (🎨)
│   │   ├── Campaign Planner (📅)
│   │   ├── Analytics & Reports (📈)
│   │   └── Settings (⚙️)
│   │
│   └── Footer
│       └── Tagline Text
│
├── App Container
│   │
│   ├── Header
│   │   ├── Left Section
│   │   │   ├── Page Title ("Dashboard")
│   │   │   └── Page Subtitle
│   │   │
│   │   └── Right Section
│   │       ├── Quick Actions
│   │       │   ├── Notifications Button (🔔)
│   │       │   │   └── Badge (3)
│   │       │   └── Messages Button (💬)
│   │       │
│   │       └── User Profile
│   │           ├── Avatar
│   │           ├── Name ("Sarah Anderson")
│   │           └── Role ("Marketing Manager")
│   │
│   └── Main Content
│       │
│       ├── Overview Cards Section
│       │   ├── Card 1: Active Campaigns (12 ↑15%)
│       │   ├── Card 2: Content Generated (248 ↑32%)
│       │   ├── Card 3: Leads Generated (1,842 ↑8%)
│       │   └── Card 4: Campaign Performance (87% ↓5%)
│       │
│       ├── Recent Projects Section
│       │   ├── Section Header
│       │   │   ├── Title ("Recent Projects")
│       │   │   └── View All Link
│       │   │
│       │   └── Projects List
│       │       ├── Project 1
│       │       │   ├── Type Icon
│       │       │   ├── Name & Type
│       │       │   ├── Progress Bar (65%)
│       │       │   ├── Status Badge (Active)
│       │       │   └── Date
│       │       ├── Project 2 (85% Complete)
│       │       ├── Project 3 (100% Complete)
│       │       └── Project 4 (20% Pending)
│       │
│       └── Quick Access Tools Section
│           ├── Section Header ("Quick Access Tools")
│           │
│           └── Tools Grid
│               ├── Tool 1: Content Wizard (✍️)
│               │   ├── Icon
│               │   ├── Name
│               │   ├── Description
│               │   └── Launch Action
│               ├── Tool 2: Social Scheduler (📱)
│               ├── Tool 3: Ad Campaign Builder (🎯)
│               ├── Tool 4: Analytics Dashboard (📊)
│               ├── Tool 5: SEO Optimizer (🚀)
│               └── Tool 6: Email Template Studio (✉️)
```

## State Management

```javascript
App Component State:
├── activeSection: string (tracks selected navigation item)
│   └── Values: 'dashboard', 'ai-content', 'social-media', etc.
│
└── Sample Data:
    ├── overviewCards: Array of card data
    │   └── Props: title, value, change, icon, trend
    │
    ├── recentProjects: Array of project data
    │   └── Props: id, name, type, status, date, progress
    │
    └── quickAccessTools: Array of tool data
        └── Props: id, name, description, icon, color
```

## Props Flow

```
App
├─► Sidebar
│   ├─ activeSection: string
│   └─ onNavigate: (section: string) => void
│
├─► Header
│   ├─ userName: string (optional)
│   └─ userRole: string (optional)
│
├─► OverviewCards
│   └─ cards: CardData[]
│       └─ CardData: { title, value, change, icon, trend }
│
├─► RecentProjects
│   └─ projects: Project[]
│       └─ Project: { id, name, type, status, date, progress }
│
└─► QuickAccessTools
    └─ tools: Tool[]
        └─ Tool: { id, name, description, icon, color }
```

## Styling Architecture

### CSS Variables (Global)
```css
:root {
  --primary-dark: #0f172a;      /* Main background */
  --primary-darker: #0a0f1f;    /* Darker variant */
  --secondary-gold: #d4a574;    /* Brand accent */
  --text-white: #ffffff;         /* Primary text */
  --text-light: #e2e8f0;         /* Secondary text */
  --text-muted: #94a3b8;         /* Muted text */
  --bg-dark: #1e293b;            /* Card backgrounds */
  --bg-darker: #0f172a;          /* Darker cards */
  --border-light: #334155;       /* Borders */
  --success: #10b981;            /* Green for up trends */
  --warning: #f59e0b;            /* Amber for warnings */
  --danger: #ef4444;             /* Red for down trends */
  --info: #3b82f6;               /* Blue for info */
  --shadow: /* elevation 1 */
  --shadow-lg: /* elevation 2 */
}
```

### Responsive Classes
```css
/* Desktop (1024px+) */
Default styles

/* Tablet (768px-1023px) */
@media (max-width: 1024px) { ... }

/* Mobile (480px-767px) */
@media (max-width: 768px) { ... }

/* Small Mobile (< 480px) */
@media (max-width: 480px) { ... }
```

## Layout Dimensions

### Sidebar
- **Open**: 280px
- **Collapsed**: 80px
- **Transition**: 0.3s ease
- **Mobile**: 100vw width, slides in from left

### Grid Layouts
```css
/* Overview Cards */
Desktop:  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
Tablet:   grid-template-columns: repeat(2, 1fr);
Mobile:   grid-template-columns: 1fr;

/* Recent Projects */
Desktop:  grid-template-columns: 1fr 200px 180px;
Tablet:   grid-template-columns: 1fr;
Mobile:   grid-template-columns: 1fr;

/* Quick Tools */
Desktop:  grid-template-columns: repeat(3, 1fr);
Tablet:   grid-template-columns: repeat(2, 1fr);
Mobile:   grid-template-columns: 1fr;
```

## Color Coding by Feature

### Trend Indicators
```css
.trend-up      { color: #10b981 (Green) }  /* Positive */
.trend-down    { color: #ef4444 (Red) }    /* Negative */
.trend-neutral { color: #94a3b8 (Gray) }   /* No change */
```

### Status Badges
```css
.status-active     { color: #10b981 (Green) }  /* Active campaigns */
.status-completed  { color: #3b82f6 (Blue) }   /* Finished projects */
.status-pending    { color: #f59e0b (Amber) }  /* Waiting to start */
```

### Tool Card Colors
```css
Tool 1: #3b82f6 (Blue)   - Content Wizard
Tool 2: #8b5cf6 (Purple) - Social Scheduler
Tool 3: #ec4899 (Pink)   - Ad Campaign Builder
Tool 4: #f59e0b (Amber)  - Analytics
Tool 5: #10b981 (Green)  - SEO Optimizer
Tool 6: #06b6d4 (Cyan)   - Email Studio
```

## Animation Specifications

### Standard Transitions
```css
transition: all 0.3s ease;      /* General animations */
transition: all 0.2s ease;      /* Quick interactions */
transform: translateY(-4px);    /* Hover lift */
transform: translateX(4px);     /* Subtle shift */
transform: translateY(-2px);    /* Small lift */
```

### Hover Effects
```
Cards:        Lift + Gold border + Shadow
Buttons:      Background change + Color shift
Links:        Color transition to lighter gold
Nav Items:    Background fill + Text color change
Tool Cards:   Elevation + Glow + Border highlight
```

## Accessibility Features

```
✓ Semantic HTML
  - <header>, <nav>, <aside>, <main>
  - <button>, <a> for interactive elements

✓ ARIA Labels
  - Toggle button: aria-label="Toggle sidebar"
  - Icons with descriptions

✓ Contrast Ratios
  - Text on background: WCAG AA compliant
  - Color not sole indicator (trends use text + color)

✓ Focus States
  - Keyboard navigation support
  - Visible focus indicators

✓ Responsive Text
  - Font sizes scale with viewport
  - Line heights optimized for readability
```

## Performance Optimizations

```css
/* Use CSS for animations instead of JS */
transition: property duration ease-function;

/* Use CSS Grid/Flexbox for layout */
No unnecessary DOM elements

/* Minimal repaints/reflows */
CSS transform for hover effects (translateY, etc.)

/* Efficient selectors */
Specific class names over nested selectors

/* Minimal CSS files */
Organized by component, not monolithic
```

## Browser Support

```
Chrome:  90+  ✓
Firefox: 88+  ✓
Safari:  14+  ✓
Edge:    90+  ✓
Mobile:  iOS Safari 14+, Chrome Android 90+  ✓
```

---

**Component Structure Maintained for Easy Extension and Modification**

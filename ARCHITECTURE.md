# Dashboard Architecture

## Component Hierarchy

```
App (State Management)
├── Header
│   ├── Mobile Menu Toggle Button
│   ├── Page Title & Tagline
│   ├── Quick Actions (Notifications, Messages)
│   └── User Profile
├── Sidebar
│   ├── Logo & Brand
│   ├── Navigation Items (12 routes)
│   ├── Sidebar Overlay (Mobile)
│   └── Footer Text
└── Main Content
    ├── OverviewCards
    │   └── 4 Dashboard Overview Cards
    ├── QuickAccessTools
    │   └── 6 AI Tool Cards (Grid)
    ├── RecentProjects
    │   └── 3 Project Items (Table-like)
    └── RecentActivity
        └── 4 Activity Items (Feed)
```

## State Management

**App.tsx** manages:
- `activeSection`: Current navigation section
- `isMobileMenuOpen`: Mobile menu visibility state

## Data Flow

```
App.tsx
├── overviewCards → OverviewCards.tsx → Render Cards
├── quickAccessTools → QuickAccessTools.tsx → Render Tool Grid
├── recentProjects → RecentProjects.tsx → Render Project List
├── recentActivity → RecentActivity.tsx → Render Activity Feed
└── State Props
    ├── activeSection → Sidebar.tsx
    ├── isMobileMenuOpen → Sidebar.tsx + Header.tsx
    └── Callbacks → onNavigate, onMobileMenuToggle
```

## CSS Architecture

### Hierarchy:
```
src/styles/
├── index.css (Global variables & reset)
├── App.css (Layout container)
├── Header.css (Header component)
├── Sidebar.css (Sidebar component)
├── OverviewCards.css (Overview section)
├── QuickAccessTools.css (Tools grid)
├── RecentProjects.css (Projects list)
└── RecentActivity.css (Activity feed)
```

### CSS Variables (src/index.css):
- Color palette (navy, gold, grays)
- Typography scales
- Spacing units
- Shadow definitions
- Responsive breakpoints

## Navigation Routes

The sidebar includes 12 navigation items:
1. 📊 Dashboard
2. ✍️ AI Content Studio
3. 📱 Social Media Marketing
4. 🔍 Google Ads Assistant
5. 👥 Meta Ads Assistant
6. 🚀 SEO Assistant
7. ✉️ Email Marketing
8. 🎯 Marketing Strategy
9. 🎨 AI Image Studio
10. 📅 Campaign Planner
11. 📈 Analytics & Reports
12. ⚙️ Settings

Currently all routes set `activeSection` state (ready for routing library).

## Responsive Behavior

### Desktop (1024px+)
- Sidebar: Full width (280px)
- Main content: Margin-left: 280px
- All sections visible
- Multi-column layouts

### Tablet (768px - 1023px)
- Sidebar: Collapsed to icons (80px)
- Main content: Margin-left: 80px
- Section headers adjusted
- 2-column grids

### Mobile (<768px)
- Sidebar: Hidden, slides from left
- Overlay backdrop visible
- Hamburger menu in header
- Single column layout
- Full-width content

## Component Props & Interfaces

### App.tsx
```typescript
// State
activeSection: string
isMobileMenuOpen: boolean

// Data structures
overviewCards: { title, value, change, icon, trend, isDemoData }[]
recentProjects: { id, name, type, status, date, progress, isDemoData }[]
quickAccessTools: { id, name, description, icon, color }[]
recentActivity: { id, action, description, time, icon, isDemoData }[]
```

### Header.tsx
```typescript
interface HeaderProps {
  userName?: string
  userRole?: string
  onMobileMenuToggle?: () => void
}
```

### Sidebar.tsx
```typescript
interface SidebarProps {
  activeSection: string
  onNavigate: (section: string) => void
  isMobileMenuOpen?: boolean
  onMobileMenuToggle?: (open: boolean) => void
}
```

### OverviewCards.tsx
```typescript
interface CardData {
  title: string
  value: string | number
  change: number
  icon: string
  trend: 'up' | 'down' | 'neutral'
  isDemoData?: boolean
}
```

### RecentProjects.tsx
```typescript
interface Project {
  id: string
  name: string
  type: string
  status: 'active' | 'completed' | 'pending'
  date: string
  progress: number
  isDemoData?: boolean
}
```

### QuickAccessTools.tsx
```typescript
interface Tool {
  id: string
  name: string
  description: string
  icon: string
  color: string
}
```

### RecentActivity.tsx
```typescript
interface Activity {
  id: string
  action: string
  description: string
  time: string
  icon: string
  isDemoData?: boolean
}
```

## Key CSS Classes

### Layout
- `.app-layout` - Main flex container
- `.app-container` - App wrapper with margin
- `.main-content` - Scrollable content area

### Header
- `.header` - Header container
- `.header-top` - Branding area
- `.mobile-menu-toggle` - Hamburger button
- `.page-title` - Main title
- `.page-tagline` - Subtitle
- `.user-profile` - User info section

### Sidebar
- `.sidebar` - Sidebar container
- `.sidebar-overlay` - Mobile backdrop
- `.logo-container` - Brand area
- `.sidebar-nav` - Navigation list
- `.nav-item` - Individual nav items
- `.nav-item.active` - Active state

### Content Sections
- `.overview-section` - Overview cards wrapper
- `.overview-cards` - Cards grid
- `.card` - Individual card
- `.demo-badge` - Data identifier badge
- `.section-header` - Section title area

### Interactive Elements
- `.tool-card` - Tool button/card
- `.project-item` - Project row
- `.activity-item` - Activity entry
- `.trend-badge` - Trend indicator
- `.status-badge` - Project status
- `.progress-bar` - Progress visualization

## Hover & Animation Effects

### Cards
```css
.card:hover {
  /* Border animation with ::before */
  /* Translate up: translateY(-6px) */
  /* Enhanced shadow */
  /* Border color change to gold */
}
```

### Tools
```css
.tool-card:hover {
  /* Top border animation with ::before */
  /* Gradient overlay fade with ::after */
  /* Icon scale up */
  /* Enhanced shadow */
  /* Arrow animation on action text */
}
```

### Navigation
```css
.nav-item:hover {
  /* Background color change */
  /* Border indicator animation */
  /* Text color to gold */
}
```

## Transitions & Timing

- Standard: `0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- Fast: `0.2s ease`
- Hover effects: `0.3s ease`
- Animations: `0.3s cubic-bezier` for smooth motion

## Browser Compatibility

**Supported Features:**
- CSS Grid & Flexbox
- CSS Variables
- Pseudo-elements (::before, ::after)
- CSS Transitions & Transforms
- Media Queries
- Gradient backgrounds
- Backdrop filter

**Browser Support:**
- Chrome 88+
- Firefox 87+
- Safari 14+
- Edge 88+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

1. **CSS**
   - Minimal repaints with transforms
   - Efficient selectors
   - Grouped media queries

2. **JavaScript**
   - Minimal state updates
   - Event delegation ready
   - No unnecessary renders

3. **Assets**
   - Modular CSS files
   - Clean HTML structure
   - Optimized images (emojis as text)

## Future Enhancements

1. **Routing**
   - Add React Router for navigation
   - Update sidebar to use Link components
   - Implement route-based views

2. **API Integration**
   - Replace demo data with API calls
   - Add loading states
   - Add error handling
   - Add caching

3. **Features**
   - User profile dropdown
   - Settings modal
   - Notifications drawer
   - Activity filtering
   - Dark/light mode toggle
   - Internationalization

4. **Performance**
   - Code splitting by route
   - Lazy loading components
   - Image optimization
   - Service worker caching

---

**Last Updated**: 2024
**Version**: 1.0.0
**Status**: Production Ready

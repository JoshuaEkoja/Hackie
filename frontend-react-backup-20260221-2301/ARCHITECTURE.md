# HackBase Frontend - Architecture Rebuild

## 🎯 What Changed

The frontend has been completely restructured to match **hackbase's professional architecture** while integrating the chatbot seamlessly.

### Previous Architecture (Vanilla HTML)
- Single-file HTML pages scattered in `/frontend/`
- Inline styles and CSS variables
- Manual state management via localStorage
- No component reusability
- No build tooling

### New Architecture (React + hackbase patterns)
- **React 18** with Vite for modern development
- **React Router v6** for client-side routing
- **Tailwind CSS** with CSS variable theming
- **Context API** for centralized state
- **CVA** (Class Variance Authority) for component variants
- **Professional folder structure** mirroring hackbase

---

## 📁 File Structure

```
frontend-react/
├── src/
│   ├── pages/                    # Page-level components
│   │   ├── home/                 # Main chat interface
│   │   ├── onboarding/           # Onboarding flow (role, setup)
│   │   ├── settings/             # Settings & hackathon config
│   │   └── NotFound.jsx
│   │
│   ├── components/               # Reusable components
│   │   ├── ui/
│   │   │   ├── Button.jsx        # CVA-based button with variants
│   │   │   └── Input.jsx         # Form inputs + textarea
│   │   ├── layout/
│   │   │   └── MainLayout.jsx    # Main page wrapper
│   │   ├── navigation/
│   │   │   └── MobileBottomNav.jsx  # iOS-style bottom nav
│   │   ├── ScrollToTop.jsx
│   │   └── ErrorBoundary.jsx
│   │
│   ├── contexts/                 # Global state
│   │   └── ChatContext.jsx       # Messages, theme, role, onboarding
│   │
│   ├── styles/                   # Global styling
│   │   └── tailwind.css          # Tailwind directives + CSS vars
│   │
│   ├── utils/                    # Utilities
│   │   └── cn.js                 # clsx + twMerge for class merging
│   │
│   ├── App.jsx                   # Main app wrapper
│   ├── Routes.jsx                # React Router setup
│   ├── index.jsx                 # React entry point
│   └── index.css                 # Imports styles/tailwind.css
│
├── public/
│   └── manifest.json             # PWA manifest
│
├── index.html                    # HTML entry point
├── package.json                  # Dependencies (React, Vite, Tailwind)
├── vite.config.mjs               # Vite config
├── tailwind.config.js            # Tailwind theme + CSS variables
├── postcss.config.js             # PostCSS plugins
└── jsconfig.json                 # JS config with baseUrl
```

---

## 🎨 Design System (hackbase-inspired)

### Colors (CSS Variables)
- **Primary**: `#FF8A50` (Orange - HackBase brand)
- **Background**: Light `#FFFFFF` / Dark `#111827`
- **Card**: Light `#FFFFFF` / Dark `#1F2937`
- **Muted**: Light `#F3F4F6` / Dark `#1F2937`
- **Success/Warning/Error**: Standard semantic colors

### Typography
- **Heading Font**: Outfit (system fallback)
- **Body Font**: Source Sans 3 (system fallback)
- **Caption Font**: Inter (system fallback)
- **Data Font**: JetBrains Mono

### Spacing & Layout
- Tailwind defaults + custom CSS variables
- `--spacing-card`: 1rem
- `--spacing-section`: 1.5rem
- Mobile-first responsive

### Components
- **Button**: default, secondary, outline, ghost, link variants; sm, default, lg, icon, xs, xl sizes
- **Input**: Text inputs with labels, error states, descriptions
- **Textarea**: Multi-line form fields with validation
- **Card**: Bordered container with hover effects
- **MainLayout**: Page wrapper with safe area insets for iOS

---

## 🔄 State Management (Context API)

### ChatContext
Located in `src/contexts/ChatContext.jsx`

**State:**
- `messages` - Chat message history
- `hackathonContext` - Hackathon details (name, description, customInstructions)
- `theme` - 'light' or 'dark'
- `userRole` - 'participant' or 'hoster'
- `onboardingDone` - Boolean flag

**Methods:**
- `sendMessage(text)` - POST to `/chat` endpoint
- `completeOnboarding(data)` - POST to `/context` endpoint
- `toggleTheme()` - Switch dark/light mode

**Usage:**
```jsx
const { messages, sendMessage, theme, toggleTheme } = useChat();
```

---

## 🛣️ Routing

### Routes
- `/` - Home (chat interface)
- `/onboarding` - First-time onboarding
- `/settings` - Hackathon settings & theme toggle
- `*` - 404 Not Found

**Flow:**
1. User visits app
2. `Routes.jsx` checks if `onboardingDone`
3. If not, shows onboarding
4. After completion, redirects to home (`/`)
5. Bottom nav allows navigation between Home and Settings

---

## 🎯 Component Patterns

### Button Component (CVA Pattern)
```jsx
<Button variant="primary" size="lg">
  Send Message
</Button>
```

**Variants:** default, destructive, outline, secondary, ghost, link  
**Sizes:** default, sm, lg, icon, xs, xl

### Input Component
```jsx
<Input
  label="Name"
  placeholder="Enter name"
  error={error}
  required
/>
```

### Integration with Backend
All components support the API at `http://localhost:3000`:
- Chat messages → `POST /chat`
- Context saves → `POST /context`

---

## 🌙 Theme System

**Light Mode (Default)**
- Background: White
- Text: Dark gray
- Primary: Orange (#FF8A50)

**Dark Mode**
- Background: #111827
- Text: White
- Primary: Orange (#FF8A50)

**Toggle Method:**
```jsx
const { theme, toggleTheme } = useChat();
toggleTheme(); // Adds/removes 'dark' class from <html>
```

**Persistence:**
- Theme stored in `localStorage['chat-theme']`
- Loaded on page refresh

---

## 🚀 Comparison: Old vs New

| Aspect | Old (Vanilla) | New (React) |
|--------|---------------|------------|
| **Framework** | HTML/CSS/JS | React 18 + Vite |
| **Routing** | File navigation | React Router v6 |
| **State** | localStorage only | Context API + localStorage |
| **Components** | Inline code | Reusable CVA components |
| **Styling** | Inline CSS | Tailwind CSS + CSS variables |
| **Build** | None (raw files) | Vite (optimized bundles) |
| **DX** | Manual | Hot reload, TypeScript-ready |

---

## 🔗 Integration Points

### Backend API
- **Host**: `http://localhost:3000`
- **Endpoints**:
  - `POST /chat` - Message handling
  - `POST /context` - Save hackathon context
  - `GET /context` - Load context
  - `POST /context/reset` - Reset context

### CORS Configuration
Backend should allow:
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'YOUR_PRODUCTION_URL']
}));
```

---

## 📱 Mobile Experience

- **Bottom Navigation**: iOS-style tab bar
- **Safe Areas**: Notch/statusbar padding
- **Touch Targets**: 44x44px minimum
- **Responsive**: Mobile-first Tailwind breakpoints

---

## 🎓 Key Decisions

1. **Why Context API over Redux?**
   - Simpler setup, less boilerplate
   - `useChat()` hook pattern is clean and sufficient
   - Avoids over-engineering for current feature scope

2. **Why Tailwind over custom CSS?**
   - Consistency with hackbase
   - Rapid development and theming
   - Built-in dark mode support
   - Smaller final bundle size

3. **Why CVA for components?**
   - Type-safe component variants
   - Cleaner `variant` and `size` props
   - Easy to extend styling
   - Hackbase-inspired pattern

4. **Why separate pages/components?**
   - Scalability and maintenability
   - Clear responsibility boundaries
   - Mirror hackbase's structure
   - Professional codebase for handoff

---

## 🚦 Next Steps

### Before Deployment
- [ ] Add `.env` file with `VITE_API_URL`
- [ ] Update Backend CORS for production domain
- [ ] Test backend connectivity
- [ ] Run `npm run build` and verify bundles

### Future Enhancements
- Add more pages (profiles, saved chats, etc.)
- Implement advanced routing with React Router
- Add toast notifications for feedback
- Integrate analytics
- Add keyboard shortcuts
- Support progressive web app (PWA) installation

---

## 📚 Resources

- [Vite Docs](https://vitejs.dev)
- [React Router v6](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Class Variance Authority](https://cva.style)
- [hackbase Project](../../hackbase) - Reference architecture

---

**Built with  ❤️  for hackathons** 🚀

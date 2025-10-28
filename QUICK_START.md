# 🚀 Quick Start - Chakra UI Version

## Chạy ngay trong 3 bước:

### 1️⃣ Cài đặt dependencies (nếu chưa có)
```bash
npm install
```

### 2️⃣ Chạy development server
```bash
npm run dev
```

### 3️⃣ Mở trình duyệt
```
http://localhost:5173
```

---

## 🎨 Những gì bạn sẽ thấy:

### ✨ Login Page
- Background với particle effects
- Glassmorphism login card
- Gradient logo & title
- Icon inputs (Email, Password)
- Password visibility toggle
- Smooth animations

### 📊 Dashboard
- **6 Stat Cards:**
  - Total Users: 1,247
  - Total Tests: 3,845
  - Pending Tests: 234
  - Completed Tests: 3,611
  - Active Projects: 18
  - Today's Revenue: $45,678

- **Performance Chart** - Weekly data visualization
- **Recent Activity** - Live activity feed
- **Quick Actions** - Fast navigation buttons

### 🎯 Sidebar
- Collapsible menu
- Active page highlighting
- User profile display
- Logout button

---

## 🎮 Interactive Features

### Try These:
1. ✅ **Toggle Sidebar** - Click menu icon (☰/✕)
2. ✅ **Hover Cards** - Hover over stat cards to see lift effect
3. ✅ **Password Toggle** - Click eye icon to show/hide password
4. ✅ **Quick Actions** - Click action buttons to navigate
5. ✅ **Submenu** - Click "Báo cáo" or "Cài đặt" to expand

---

## 🎨 Customization

### Change Colors:
Edit `src/theme/chakraTheme.ts`:
```ts
colors: {
  brand: {
    500: "#YOUR_COLOR", // Change brand color
  }
}
```

### Change Animations:
Edit any component with `MotionBox`:
```tsx
<MotionBox
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
```

---

## 📁 File Structure

```
src/
├── theme/
│   └── chakraTheme.ts          # 🎨 Theme config
├── features/
│   ├── auth/
│   │   └── pages/
│   │       └── LoginPageChakra.tsx     # 🔐 Login
│   └── dashboard/
│       ├── pages/
│       │   └── DashboardChakra.tsx     # 📊 Dashboard
│       └── components/
│           ├── StatCardChakra.tsx
│           ├── PerformanceChartChakra.tsx
│           ├── RecentActivityChakra.tsx
│           └── QuickActionsChakra.tsx
└── layouts/
    ├── SidebarChakra.tsx       # 🎯 Sidebar
    └── DashboardLayoutChakra.tsx
```

---

## 🔧 Troubleshooting

### Port already in use?
```bash
# Kill process on port 5173
npx kill-port 5173
npm run dev
```

### Dependencies error?
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Chakra UI not working?
Check `src/App.tsx` has:
```tsx
<ChakraProvider value={theme}>
  <App />
</ChakraProvider>
```

---

## 📚 Learn More

- **Full Documentation:** `CHAKRA_UI_DEMO.md`
- **Migration Guide:** `CHAKRA_UI_MIGRATION.md`
- **Implementation Summary:** `IMPLEMENTATION_SUMMARY.md`

---

## 🎯 Next Steps

1. ✅ Explore the UI
2. ✅ Try customizing colors
3. ✅ Add your own components
4. ✅ Deploy to production!

---

**Enjoy your beautiful Chakra UI interface! 🎉**

Need help? Check the docs above or:
- [Chakra UI Docs](https://chakra-ui.com)
- [Framer Motion Docs](https://www.framer.com/motion)


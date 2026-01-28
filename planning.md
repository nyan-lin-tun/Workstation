# Workstation Diagram - Feature Requirements & Planning

## Project Overview

An interactive node-based diagram visualization for documenting and displaying workstation hardware setups. Inspired by [akexorcist/workstation-diagram](https://github.com/akexorcist/workstation-diagram).

**Goal:** Create a visual representation of hardware connections with drag-and-drop interactivity, zoom/pan controls, and theme switching.

---

## Core Features

### 1. Interactive Diagram Canvas
- [ ] Node-based graph with draggable devices
- [ ] Connection lines between devices with labels (USB-A, HDMI, DisplayPort, etc.)
- [ ] Zoom in/out with slider control
- [ ] Pan canvas (drag to move around)
- [ ] Grid background toggle
- [ ] Auto-layout or manual positioning

### 2. Device Categories & Colors
- [ ] **Teal/Cyan nodes** - Infrastructure devices:
  - USB Hub
  - Switcher
  - Power Adapter
  - DAC
  - Monitors
- [ ] **Orange/Yellow nodes** - Peripheral devices:
  - Input devices (Camera, Microphone)
  - Output devices (Speaker, Headset)
  - Storage (SSD)
  - Accessories (Stream Deck, LED lights, Dongles)

### 3. Left Sidebar
- [ ] Header with title and date
- [ ] Instruction dropdown/collapsible section
- [ ] Scrollable device list with color indicators
- [ ] Click device in list → highlight in diagram
- [ ] Expandable/collapsible sidebar

### 4. Top-Right Control Panel
- [ ] Zoom slider (0.5x to 3x range)
- [ ] Refresh/reset view button
- [ ] Grid toggle button
- [ ] Dark/light mode toggle button

### 5. Theme Support
- [ ] Dark mode (default)
- [ ] Light mode
- [ ] Smooth theme transitions
- [ ] Persist theme preference (localStorage)

---

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Framework | React 19.2 |
| Build Tool | Vite |
| Runtime | Bun |
| Language | TypeScript |
| Diagram Library | React Flow |
| Styling | TailwindCSS |
| Deployment | GitHub Pages |

---

## Data Structure

```typescript
interface Device {
  id: string;
  name: string;
  category: 'infrastructure' | 'peripheral';
  type: string; // e.g., 'monitor', 'usb-hub', 'camera', etc.
  connections: Connection[];
  position: { x: number; y: number };
}

interface Connection {
  targetId: string;
  type: string; // 'USB-A', 'HDMI', 'DisplayPort', 'USB-C', etc.
}

interface DiagramData {
  title: string;
  date: string;
  devices: Device[];
}
```

---

## UI Layout

```
┌─────────────────────────────────────────────────────────┐
│  [Header: Title + Date]                                 │
├──────────┬──────────────────────────────────────────────┤
│          │                                      ┌──────┐│
│  Left    │                                      │ Zoom ││
│  Sidebar │         Diagram Canvas               │ Grid ││
│          │       (Draggable Nodes)              │Theme ││
│ Device   │                                      │      ││
│ List     │                                      └──────┘│
│          │                                              │
└──────────┴──────────────────────────────────────────────┘
```

---

## Device Types to Support

### Infrastructure (Teal)
- USB Hub
- USB Switcher
- Power Adapter
- USB DAC
- Monitors

### Peripherals (Orange)
- Input: Camera, Microphone, Capture Card
- Output: Speaker, Headset
- Storage: External SSD
- Control: Stream Deck
- Misc: LED Light, Wireless Charger, Dongles, Android Device

---

## Implementation Phases

### Phase 1: Project Setup
- [ ] Initialize Vite + React + TypeScript project
- [ ] Configure Bun
- [ ] Install dependencies (React Flow, TailwindCSS)
- [ ] Set up GitHub Pages deployment
- [ ] Create base layout structure

### Phase 2: Core Diagram
- [ ] Set up React Flow canvas
- [ ] Create device node component
- [ ] Implement connection rendering
- [ ] Add drag & drop functionality
- [ ] Add zoom & pan controls

### Phase 3: UI Components
- [ ] Build left sidebar with device list
- [ ] Build top-right control panel
- [ ] Implement zoom slider
- [ ] Add grid toggle
- [ ] Add theme switcher

### Phase 4: Theme System
- [ ] Set up Tailwind dark mode
- [ ] Create color scheme for both themes
- [ ] Add theme persistence
- [ ] Test color contrast in both themes

### Phase 5: Data & Configuration
- [ ] Create sample device data
- [ ] Implement JSON config loading
- [ ] Add device list sync with diagram
- [ ] Add click-to-highlight functionality

### Phase 6: Polish & Deploy
- [ ] Smooth animations
- [ ] Responsive adjustments
- [ ] Accessibility improvements
- [ ] Performance optimization
- [ ] Deploy to GitHub Pages

---

## Reference

- **Inspiration:** [akexorcist/workstation-diagram](https://github.com/akexorcist/workstation-diagram)
- **Live Demo:** https://workstation.akexorcist.dev
- **Screenshot:** See attached image in project root

---

## Notes

- Focus on clean, minimal UI similar to reference project
- Ensure smooth performance with many nodes
- Make data easily configurable for different workstation setups
- Keep bundle size small for fast GitHub Pages loading

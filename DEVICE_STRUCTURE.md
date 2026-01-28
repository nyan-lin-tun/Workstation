# Device Structure & Layout Guidelines

## Overview

This document defines the hierarchical structure and layout rules for the workstation diagram devices.

---

## Device Hierarchy

### Parent-Child Relationships

Some devices act as **parents** to other devices. Child devices should be visually grouped under their parent with no intermediate devices or connections.

#### Samsung ViewFinity S65UC (Parent)

**Child Devices:**
- Ergodox EZ (keyboard)
- Yeti X WOW Edition (microphone)

**Layout Rules:**
- ✅ Samsung Monitor should be positioned ABOVE both child devices
- ✅ Child devices should be directly below the Samsung Monitor
- ❌ No other devices should be placed between Samsung Monitor and its children
- ❌ No connection lines should cross between Samsung Monitor and its children

**Visual Layout:**
```
┌─────────────────────┐
│  Samsung Monitor    │
└──────────┬──────────┘
           │
    ┌──────┴──────┐
    │             │
┌───▼────┐   ┌───▼─────┐
│ Ergodox│   │  Yeti   │
│   EZ   │   │   Mic   │
└────────┘   └─────────┘
```

---

## Column-Based Layout

The diagram uses a **3-column structure** for organization:

### Column 1 (LEFT) - x: 50
Primary computing and input devices:
1. DOIO 16 keys (top)
2. Baseus Lite Series Hub (middle-top)
3. Personal Laptop (middle)
4. Magic Trackpad 2 (bottom)

### Column 2 (CENTER) - x: 400
Main display and creative tools:
1. Logitech Brio (top)
2. **Samsung ViewFinity S65UC** (center) - **Parent device**
3. Ergodox EZ (bottom) - **Child of Samsung**
4. Yeti X WOW Edition (bottom) - **Child of Samsung**

### Column 3 (RIGHT) - x: 750
Secondary display and entertainment:
1. AOC Q27E3UMF 27" (top)
2. Nintendo Switch (middle-top)
3. Google Chromecast 4K (middle)
4. UGREEN HDMI Switcher 3-1 (bottom)

---

## Device Categories & Colors

### Infrastructure (Teal - #2d7a7a)
- USB hubs, docks, switchers
- Monitors
- Power adapters
- DACs

### Peripherals (Gold - #d4a574)
- Input devices (keyboards, mice, trackpads)
- Output devices (speakers, headsets)
- Accessories (cameras, mics, storage)
- Controllers, media players

### Computing (Blue - #3a539b)
- Laptops, desktops, PCs
- Main computing devices

---

## Connection Rules

1. **Child devices connect to their parent first**
   - Ergodox EZ → Samsung Monitor
   - Yeti Mic → Samsung Monitor

2. **No crossing connections in parent-child groups**
   - Keep Samsung Monitor and its children visually grouped
   - No intermediate devices between parent and children

3. **Smart routing**
   - Connections automatically choose best handle (top, bottom, left, right)
   - Based on relative device positions

4. **Connection types**
   - USB-A, USB-C, USB 3.0
   - HDMI, DisplayPort
   - Thunderbolt
   - Bluetooth
   - Ethernet
   - Audio, Power

---

## Adding New Devices

When adding a new device:

1. **Choose the appropriate column** based on device type
2. **Check if it should be a child** of an existing device
3. **Update the Y position** to avoid conflicts
4. **Add connections** to the parent or related devices
5. **Choose the correct color** based on category

### Example: Adding a new USB device to Samsung Monitor

```typescript
{
  id: 'new-device',
  name: 'Device Name',
  category: 'peripheral',
  type: 'storage',
  connections: [
    { targetId: 'samsung-monitor', type: 'USB' }
  ]
}

// Position: Add to Column 2, below Samsung Monitor
'new-device': { x: 400, y: 500 }
```

---

## Position Reference

| Device | X Position | Y Position | Column | Notes |
|--------|-----------|-----------|--------|-------|
| DOIO 16 keys | 50 | 50 | 1 (Left) | Top |
| Baseus Hub | 50 | 180 | 1 (Left) | Middle-top |
| Personal Laptop | 50 | 310 | 1 (Left) | Main device |
| Magic Trackpad | 50 | 440 | 1 (Left) | Bottom |
| Logitech Brio | 400 | 50 | 2 (Center) | Top |
| Samsung Monitor | 400 | 180 | 2 (Center) | **Parent** |
| Ergodox EZ | 400 | 310 | 2 (Center) | Child of Samsung |
| Yeti Mic | 400 | 440 | 2 (Center) | Child of Samsung |
| AOC Monitor | 750 | 50 | 3 (Right) | Top |
| Nintendo Switch | 750 | 180 | 3 (Right) | Middle-top |
| Chromecast | 750 | 310 | 3 (Right) | Middle |
| UGREEN Switcher | 750 | 440 | 3 (Right) | Bottom |

---

## Notes

- All Y positions use 130px spacing between devices
- Columns are spaced 350px apart
- Parent-child relationships should be visually clear
- Refresh resets all positions to these defaults

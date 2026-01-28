import { DiagramData } from '../types';

// Your actual workstation devices from the screenshot
export const diagramData: DiagramData = {
  title: 'My Workstation',
  date: new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }),
  devices: [
    // Infrastructure devices (Teal - #2d7a7a)
    {
      id: 'baseus-hub',
      name: 'Baseus Lite Series Hub',
      category: 'infrastructure',
      type: 'usb-hub',
      connections: [
        { targetId: 'logitech-brio', type: 'USB 3.0' },
        { targetId: 'doio-16-keys', type: 'USB 3.0' },
      ]
    },
    {
      id: 'ugreen-switcher',
      name: 'UGREEN HDMI Switcher 3-1',
      category: 'infrastructure',
      type: 'switcher',
      connections: [
        { targetId: 'aoc-monitor', type: 'HDMI' },
        { targetId: 'chromecast', type: 'HDMI' },
        { targetId: 'nintendo-switch', type: 'HDMI' },
      ]
    },
    {
      id: 'samsung-monitor',
      name: 'Samsung ViewFinity S65UC',
      category: 'infrastructure',
      type: 'monitor',
      connections: [
        { targetId: 'ergodox-ez', type: 'USB' },
        { targetId: 'yeti-mic', type: 'USB' },
      ]
    },

    // Computing devices (Blue - #3a539b)
    {
      id: 'personal-laptop',
      name: 'Personal Laptop',
      category: 'infrastructure', // Using infrastructure color for main device
      type: 'laptop',
      connections: [
        { targetId: 'baseus-hub', type: 'USB-C' },
        { targetId: 'samsung-monitor', type: 'DisplayPort' },
        { targetId: 'magic-trackpad', type: 'Bluetooth' },
        { targetId: 'ugreen-switcher', type: 'HDMI' },
      ]
    },

    // Peripheral devices (Gold - #d4a574)
    {
      id: 'logitech-brio',
      name: 'Logitech Brio',
      category: 'peripheral',
      type: 'webcam',
      connections: []
    },
    {
      id: 'doio-16-keys',
      name: 'DOIO 16 keys',
      category: 'peripheral',
      type: 'numeric-keypad',
      connections: []
    },
    {
      id: 'aoc-monitor',
      name: 'AOC Q27E3UMF 27"',
      category: 'peripheral',
      type: 'monitor',
      connections: []
    },
    {
      id: 'chromecast',
      name: 'Google Chromecast 4K',
      category: 'peripheral',
      type: 'chromecast',
      connections: []
    },
    {
      id: 'nintendo-switch',
      name: 'Nintendo Switch',
      category: 'peripheral',
      type: 'controller',
      connections: []
    },
    {
      id: 'magic-trackpad',
      name: 'Magic Trackpad 2',
      category: 'peripheral',
      type: 'mouse',
      connections: []
    },
    {
      id: 'ergodox-ez',
      name: 'Ergodox EZ',
      category: 'peripheral',
      type: 'keyboard',
      connections: []
    },
    {
      id: 'yeti-mic',
      name: 'Yeti X WOW Edition',
      category: 'peripheral',
      type: 'microphone',
      connections: []
    },
  ]
};

// Color mapping for categories
export const getCategoryColor = (category: string) => {
  return category === 'infrastructure'
    ? 'bg-teal-500 dark:bg-teal-600'
    : 'bg-orange-400 dark:bg-orange-500';
};

export const getCategoryBorderColor = (category: string) => {
  return category === 'infrastructure'
    ? 'border-te-600 dark:border-teal-700'
    : 'border-orange-500 dark:border-orange-600';
};

export type DeviceCategory = 'infrastructure' | 'peripheral';

export type ConnectionType = 'USB-A' | 'USB-C' | 'USB 3.0' | 'HDMI' | 'DisplayPort' | 'Thunderbolt' | 'Ethernet' | 'Audio' | 'Power' | 'Bluetooth' | 'USB';

export interface Device {
  id: string;
  name: string;
  category: DeviceCategory;
  type: string;
  connections: Connection[];
}

export interface Connection {
  targetId: string;
  type: ConnectionType;
}

export interface DiagramData {
  title: string;
  date: string;
  devices: Device[];
}

'use strict';

export function getRandomColor(): string {
  return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
}

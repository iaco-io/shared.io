import { Antenna, BedDouble, Bird, Carrot, FaceSlightlyFrowning, MicSignal, Timer, Turtle, Tv, Wind } from '@lucide/svelte'
import Muscle from './Muscle.svelte'

export const icons = {
  antenna: Antenna,
  beddouble: BedDouble,
  bird: Bird,
  carrot: Carrot,
  micsignal: MicSignal,
  muscle: Muscle,
  sad: FaceSlightlyFrowning,
  timer: Timer,
  turtle: Turtle,
  tv: Tv,
  wind: Wind,
} as const

export type IconName = keyof typeof icons

export function getIcon(name: unknown) {
  if (typeof name !== 'string') return Timer
  else return icons[name as IconName] ?? Timer
}
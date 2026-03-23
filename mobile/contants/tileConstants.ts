import { Dimensions } from 'react-native'

const {width} = Dimensions.get('window')

export const WIDTH = width * 0.8
export const GAP = 15
export const GRID_PADDING = 20
export const TILE_WIDTH = (width - GRID_PADDING * 2 - GAP) / 2
export const TILE_HEIGHT = TILE_WIDTH
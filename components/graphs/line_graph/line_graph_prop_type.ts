

export interface LineGraphData {
    date: Date,
    audioVolume: number,
    audioAlert: number,
    videoVolume: number,
    videoAlert: number
}

export interface LineGraphPropType {
    height: number | string
    width: number | string
    data: Array<LineGraphData>
}
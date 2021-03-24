

export interface BarData {
    date: any,
    total: number,
    reported: number,
    escalated: number
}

export interface BarGraphPropTypes {
    width: number
    height: number
    data: Array<BarData>
} 
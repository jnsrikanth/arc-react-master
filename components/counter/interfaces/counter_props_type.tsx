

export enum COUNTMODE {
    "text-primary",
    "text-secondary",
    "text-warning",
    "text-danger",
    "text-success"
}
export interface CounterPropType {
    num: number
    title: string
    suffix: string
    mode: COUNTMODE
}
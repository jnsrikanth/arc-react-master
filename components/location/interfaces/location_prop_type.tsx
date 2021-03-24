


export interface Region {
    text: string
    color: string
}

export interface LocationPropType {
    title: string
    regionList: Array<Region>
    onSelectFx(location: string, fxCode: string)
}
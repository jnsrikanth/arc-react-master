import { DateEvents } from "../../time_stat_table/interface/time_stat_table_prop_type";


export interface Trader {
    id?: string
    region: string
    fxCode: string
    loginTime: string
    lastLoginTime: string
    name: string
    imageSrc: string
    dateEvents?: Array<DateEvents>,
    isMeeting?: boolean,
    participants?: string[]
}

export interface TradersListPropType {
    searchText: string
    traders: Array<Trader>
    dispatch: any
    authData?: any
}
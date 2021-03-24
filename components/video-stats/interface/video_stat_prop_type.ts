import { Trader } from "../../traders_list/interfaces/traders_list_props_type";
import { Events, DateEvents } from "../../time_stat_table/interface/time_stat_table_prop_type";



export interface VideoStatPropType {
    selectedTrader?: Trader,
    authData: any,
    selectedDates: any,
    selectedEvent: Events,
    dispatch: any
    selectedUserEvents: Array<DateEvents>
}
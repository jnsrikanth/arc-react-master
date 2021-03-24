import { Trader } from "../../traders_list/interfaces/traders_list_props_type";

export interface TraderPropType {
    trader: Trader
    dispatch: any
    selectedTrader?: Trader,
    isMeeting: boolean,
    participants: string[]
} 
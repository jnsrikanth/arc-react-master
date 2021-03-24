import { Trader } from "../../../components/traders_list/interfaces/traders_list_props_type";
import { EVENT_MODE } from "../../../components/time_stat_table/interface/time_stat_table_prop_type";


export const traders: Array<Trader> = [

    {
        region: "London",
        fxCode: "FX3",
        loginTime: "07:05",
        lastLoginTime: "12:08",
        name: 'Mack Hall',
        imageSrc: 'assets/media/image/user/man_avatar1.jpg',
        dateEvents: [
            {
                date: "13 Jun 2020",
                events: [{
                    eventName: "Unknown",
                    eventTime: "10:15,1m20s",
                    eventMode: EVENT_MODE.alert
                },
                {
                    eventName: "Mobile",
                    eventTime: "11:10,2m04s",
                    eventMode: EVENT_MODE.primary
                },
                {
                    eventName: "X-Location",
                    eventTime: "11:15,7h20m10s",
                    eventMode: EVENT_MODE.alert
                },
                {
                    eventName: "Gestures",
                    eventTime: "13:42,06s",
                    eventMode: EVENT_MODE.secondary
                },
                {
                    eventName: "Keywords",
                    eventTime: "14:12,6m14s",
                    eventMode: EVENT_MODE.warning
                },
                {
                    eventName: "Unidentified Voice",
                    eventTime: "14:30,30m02s",
                    eventMode: EVENT_MODE.alert
                },
                {
                    eventName: "Gestures",
                    eventTime: "16:42,06s",
                    eventMode: EVENT_MODE.alert
                },
                {
                    eventName: "Unattended Calls",
                    eventTime: "15:00,00s",
                    eventMode: EVENT_MODE.alert
                },
                {
                    eventName: "Unidentified Voice",
                    eventTime: "17:00,30m2s",
                    eventMode: EVENT_MODE.alert
                },
                {
                    eventName: "Mobile",
                    eventTime: "18:00,1m20s",
                    eventMode: EVENT_MODE.alert
                },
                {
                    eventName: "Mobile",
                    eventTime: "18:10,11m15s",
                    eventMode: EVENT_MODE.alert
                }
                ]
            },

            {
                date: "10 Jun 2020",
                events: [{
                    eventName: "Mobile",
                    eventTime: "08:10,1m03s",
                    eventMode: EVENT_MODE.alert
                },
                {
                    eventName: "Unidentified Voice",
                    eventTime: "10:30,15m0s",
                    eventMode: EVENT_MODE.primary
                },
                {
                    eventName: "Mobile",
                    eventTime: "15:00,1m10s",
                    eventMode: EVENT_MODE.alert
                },
                {
                    eventName: "Gestures",
                    eventTime: "13:12,04s",
                    eventMode: EVENT_MODE.secondary
                }
                ]
            },

            {
                date: "09 Jun 2020",
                events: [{
                    eventName: "Mobile",
                    eventTime: "11:30,00s",
                    eventMode: EVENT_MODE.alert
                },
                {
                    eventName: "Mobile",
                    eventTime: "14:10,5m15s",
                    eventMode: EVENT_MODE.primary
                }
                ]
            },

            {
                date: "07 Jun 2020",
                events: [{
                    eventName: "Unidentified Voice",
                    eventTime: "14:30,30m02s",
                    eventMode: EVENT_MODE.alert
                },
                {
                    eventName: "Keywords",
                    eventTime: "14:12,6m14s",
                    eventMode: EVENT_MODE.primary
                }
                ]
            },

            {
                date: "06 Jun 2020",
                events: [{
                    eventName: "Unattended Calls",
                    eventTime: "15:00,00s",
                    eventMode: EVENT_MODE.alert
                }
                ]
            },


            {
                date: "02 Jun 2020",
                events: [{
                    eventName: "Unattended Calls",
                    eventTime: "14:00,00s",
                    eventMode: EVENT_MODE.alert
                }
                ]
            },

            {
                date: "01 Jun 2020",
                events: [{
                    eventName: "Unattended Calls",
                    eventTime: "12:00,00s",
                    eventMode: EVENT_MODE.alert
                }
                ]
            },

        ]
    },

    {
        region: "New York",
        fxCode: "FX2",
        loginTime: "07:04",
        lastLoginTime: "12:35",
        name: 'Matt Parsons',
        imageSrc: 'assets/media/image/user/man_avatar1.jpg',
        dateEvents: [
            {
                date: "13 Jun 2020",
                events: [{
                    eventName: "Mobile",
                    eventTime: "07:24,1m20s",
                    eventMode: EVENT_MODE.alert
                },
                {
                    eventName: "Mobile",
                    eventTime: "09:08,2m04s",
                    eventMode: EVENT_MODE.primary
                },
                {
                    eventName: "Gestures",
                    eventTime: "09:09,06s",
                    eventMode: EVENT_MODE.secondary
                },
                {
                    eventName: "Gestures",
                    eventTime: "09:56,10s",
                    eventMode: EVENT_MODE.warning
                },
                {
                    eventName: "Unattended Calls",
                    eventTime: "10:13,00s",
                    eventMode: EVENT_MODE.alert
                }
                ]
            },

            {
                date: "12 Jun 2020",
                events: [{
                    eventName: "Mobile",
                    eventTime: "08:15,2m05s",
                    eventMode: EVENT_MODE.alert
                },
                {
                    eventName: "X-Location",
                    eventTime: "09:30,3h15m0s",
                    eventMode: EVENT_MODE.primary
                },
                {
                    eventName: "Mobile",
                    eventTime: "11:19,1m15s",
                    eventMode: EVENT_MODE.alert
                },
                {
                    eventName: "Gestures",
                    eventTime: "11:39,04s",
                    eventMode: EVENT_MODE.secondary
                }
                ]
            },

            {
                date: "10 Jun 2020",
                events: [{
                    eventName: "Mobile",
                    eventTime: "09:30,10s",
                    eventMode: EVENT_MODE.alert
                },
                {
                    eventName: "Mobile",
                    eventTime: "14:10,3m23s",
                    eventMode: EVENT_MODE.primary
                }
                ]
            },

            {
                date: "08 Jun 2020",
                events: [{
                    eventName: "Unidentified Voice",
                    eventTime: "12:30,30m02s",
                    eventMode: EVENT_MODE.alert
                },
                {
                    eventName: "Keywords",
                    eventTime: "14:12,6m14s",
                    eventMode: EVENT_MODE.primary
                }
                ]
            },

            {
                date: "06 Jun 2020",
                events: [{
                    eventName: "Unattended Calls",
                    eventTime: "15:00,00s",
                    eventMode: EVENT_MODE.alert
                }
                ]
            },


            {
                date: "02 Jun 2020",
                events: [{
                    eventName: "Unattended Calls",
                    eventTime: "14:00,00s",
                    eventMode: EVENT_MODE.alert
                }
                ]
            },

            {
                date: "06 Jun 2020",
                events: [{
                    eventName: "Unattended Calls",
                    eventTime: "12:00,00s",
                    eventMode: EVENT_MODE.alert
                }
                ]
            },

        ]
    },

    {
        region: "London",
        fxCode: "FX1",
        loginTime: "06:59",
        lastLoginTime: "10:56",
        name: "Ava Russell",
        imageSrc: 'assets/media/image/user/man_avatar3.jpg',
        dateEvents: [
            {
                date: "12 Jun 2020",
                events: [{
                    eventName: "Mobile",
                    eventTime: "08:14,1m20s",
                    eventMode: EVENT_MODE.alert
                },
                {
                    eventName: "Mobile",
                    eventTime: "09:08,2m04s",
                    eventMode: EVENT_MODE.primary
                },
                {
                    eventName: "Gestures",
                    eventTime: "09:44,06s",
                    eventMode: EVENT_MODE.secondary
                },
                {
                    eventName: "Gestures",
                    eventTime: "09:56,10s",
                    eventMode: EVENT_MODE.warning
                },
                {
                    eventName: "Unattended Calls",
                    eventTime: "10:13,00s",
                    eventMode: EVENT_MODE.alert
                }
                ]
            },

            {
                date: "11 Jun 2020",
                events: [{
                    eventName: "Mobile",
                    eventTime: "08:15,2m05s",
                    eventMode: EVENT_MODE.alert
                },
                {
                    eventName: "X-Location",
                    eventTime: "09:30,3h15m0s",
                    eventMode: EVENT_MODE.primary
                },
                {
                    eventName: "Mobile",
                    eventTime: "11:19,1m15s",
                    eventMode: EVENT_MODE.alert
                },
                {
                    eventName: "Gestures",
                    eventTime: "11:39,04s",
                    eventMode: EVENT_MODE.secondary
                }
                ]
            },

            {
                date: "10 Jun 2020",
                events: [{
                    eventName: "Mobile",
                    eventTime: "09:30,10s",
                    eventMode: EVENT_MODE.alert
                },
                {
                    eventName: "Mobile",
                    eventTime: "14:10,3m23s",
                    eventMode: EVENT_MODE.primary
                }
                ]
            },

            {
                date: "08 Jun 2020",
                events: [{
                    eventName: "Unidentified Voice",
                    eventTime: "12:30,30m02s",
                    eventMode: EVENT_MODE.alert
                },
                {
                    eventName: "Keywords",
                    eventTime: "14:12,6m14s",
                    eventMode: EVENT_MODE.primary
                }
                ]
            },

            {
                date: "06 Jun 2020",
                events: [{
                    eventName: "Unattended Calls",
                    eventTime: "15:00,00s",
                    eventMode: EVENT_MODE.alert
                }
                ]
            },


            {
                date: "02 Jun 2020",
                events: [{
                    eventName: "Unattended Calls",
                    eventTime: "14:00,00s",
                    eventMode: EVENT_MODE.alert
                }
                ]
            },

            {
                date: "06 Jun 2020",
                events: [{
                    eventName: "Unattended Calls",
                    eventTime: "12:00,00s",
                    eventMode: EVENT_MODE.alert
                }
                ]
            },

        ]
    },

    {

        region: "London",
        fxCode: "FX3",
        loginTime: "06:54",
        lastLoginTime: "14:00",
        name: 'Zoe Langdon',
        imageSrc: 'assets/media/image/user/man_avatar4.jpg',
        dateEvents: undefined
    },
    {

        region: "Singapore",
        fxCode: "FX1",
        loginTime: "06:58",
        lastLoginTime: "13:56",
        name: 'Alex Norton',
        imageSrc: 'assets/media/image/user/man_avatar5.jpg',
        dateEvents: [
            {
                date: "12 Jun 2020",
                events: [{
                    eventName: "Unknown",
                    eventTime: "11:15,2m04s",
                    eventMode: EVENT_MODE.alert
                },
                {
                    eventName: "Mobile",
                    eventTime: "10:52,2m40s",
                    eventMode: EVENT_MODE.primary
                },

                {
                    eventName: "Gestures",
                    eventTime: "10:53,04s",
                    eventMode: EVENT_MODE.warning
                },
                {
                    eventName: "Unknown",
                    eventTime: "10:15,1m20s",
                    eventMode: EVENT_MODE.alert
                },
                {
                    eventName: "Unknown",
                    eventTime: "10:15,1m20s",
                    eventMode: EVENT_MODE.alert
                }
                ]
            }
        ]
    }
]
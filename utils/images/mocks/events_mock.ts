import { DateEvents, EVENT_MODE } from "../../../components/time_stat_table/interface/time_stat_table_prop_type"
import activity_mock from "./activity_mock"
import moment from "moment";

const events_mock = [
    {
        "personId": 1,
        "videoId": "john",
        "activityId": "Unk101",
        "activityDuration": "17 secs",
        "startTime": "10:01:36",
        "endTime": "10:01:53",
        "activityDate": "7/16/2020"
    },
    {
        "personId": 1,
        "videoId": "john",
        "activityId": "Mob101",
        "activityDuration": "8 secs",
        "startTime": "10:01:53",
        "endTime": "10:02:01",
        "activityDate": "7/16/2020"
    },
    {
        "personId": 1,
        "videoId": "john",
        "activityId": "Ges101",
        "activityDuration": "5 secs",
        "startTime": "10:02:59",
        "endTime": "10:03:04",
        "activityDate": "7/16/2020"
    },
    {
        "personId": 1,
        "videoId": "john",
        "activityId": "Mob101",
        "activityDuration": "14 secs",
        "startTime": "10:03:05",
        "endTime": "10:03:19",
        "activityDate": "7/16/2020"
    },
    {
        "personId": 1,
        "videoId": "john",
        "activityId": "Ges101",
        "activityDuration": "1 sec",
        "startTime": "10:03:18",
        "endTime": "10:03:19",
        "activityDate": "7/16/2020"
    },
    {
        "personId": 1,
        "videoId": "john",
        "activityId": "StiN101",
        "activityDuration": "6 secs",
        "startTime": "10:03:36",
        "endTime": "10:03:42",
        "activityDate": "7/16/2020"
    },
    {
        "personId": 1,
        "videoId": "john",
        "activityId": "Ges101",
        "activityDuration": "2 secs",
        "startTime": "10:03:44",
        "endTime": "10:03:45",
        "activityDate": "7/16/2020"
    },
    {
        "personId": 1,
        "videoId": "john",
        "activityId": "Ges101",
        "activityDuration": "2 secs",
        "startTime": "10:03:46",
        "endTime": "10:03:47",
        "activityDate": "7/16/2020"
    },
    {
        "personId": 1,
        "videoId": "john",
        "activityId": "Mob101",
        "activityDuration": "4 secs",
        "startTime": "10:04:24",
        "endTime": "10:04:28",
        "activityDate": "7/16/2020"
    },
    {
        "personId": 2,
        "videoId": "john",
        "activityId": "Ges101",
        "activityDuration": "3 secs",
        "startTime": "12:08:03",
        "endTime": "12:08:06",
        "activityDate": "7/16/2020"
    },
    {
        "personId": 2,
        "videoId": "john",
        "activityId": "Mob101",
        "activityDuration": "25 secs",
        "startTime": "12:08:10",
        "endTime": "12:08:35",
        "activityDate": "7/16/2020"
    },
    {
        "personId": 2,
        "videoId": "john",
        "activityId": "Ges101",
        "activityDuration": "5 secs",
        "startTime": "12:08:12",
        "endTime": "12:08:17",
        "activityDate": "7/16/2020"
    },
    {
        "personId": 2,
        "videoId": "john",
        "activityId": "UnV101",
        "activityDuration": "8 secs",
        "startTime": "12:08:18",
        "endTime": "12:08:26",
        "activityDate": "7/16/2020"
    },
    {
        "personId": 2,
        "videoId": "john",
        "activityId": "StiN101",
        "activityDuration": "4 secs",
        "startTime": "12:09:07",
        "endTime": "12:09:11",
        "activityDate": "7/16/2020"
    },
    {
        "personId": 2,
        "videoId": "john",
        "activityId": "Ges101",
        "activityDuration": "3 secs",
        "startTime": "12:09:55",
        "endTime": "12:09:58",
        "activityDate": "7/16/2020"
    },
    {
        "personId": 1,
        "videoId": "john",
        "activityId": "Unk101",
        "activityDuration": "10 secs",
        "startTime": "11:24:12",
        "endTime": "11:24:22",
        "activityDate": "7/17/2020"
    },
    {
        "personId": 1,
        "videoId": "john",
        "activityId": "Mob101",
        "activityDuration": "25 secs",
        "startTime": "11:30:04",
        "endTime": "11:30:29",
        "activityDate": "7/17/2020"
    },
    {
        "personId": 1,
        "videoId": "john",
        "activityId": "Ges101",
        "activityDuration": "4 secs",
        "startTime": "11:30:30",
        "endTime": "11:30:34",
        "activityDate": "7/17/2020"
    },
    {
        "personId": 1,
        "videoId": "john",
        "activityId": "Mob101",
        "activityDuration": "45 secs",
        "startTime": "11:42:05",
        "endTime": "11:42:50",
        "activityDate": "7/17/2020"
    },
    {
        "personId": 1,
        "videoId": "john",
        "activityId": "StiN101",
        "activityDuration": "5 secs",
        "startTime": "11:42:13",
        "endTime": "11:42:18",
        "activityDate": "7/17/2020"
    },
    {
        "personId": 1,
        "videoId": "john",
        "activityId": "StiN101",
        "activityDuration": "4 secs",
        "startTime": "11:42:20",
        "endTime": "11:42:24",
        "activityDate": "7/17/2020"
    },
    {
        "personId": 1,
        "videoId": "john",
        "activityId": "Ges101",
        "activityDuration": "3 secs",
        "startTime": "11:42:30",
        "endTime": "11:42:33",
        "activityDate": "7/17/2020"
    },
    {
        "personId": 1,
        "videoId": "john",
        "activityId": "Ges101",
        "activityDuration": "5 secs",
        "startTime": "11:42:34",
        "endTime": "11:42:39",
        "activityDate": "7/17/2020"
    },
    {
        "personId": 1,
        "videoId": "john",
        "activityId": "StiN101",
        "activityDuration": "6 secs",
        "startTime": "11:59:05",
        "endTime": "11:59:11",
        "activityDate": "7/17/2020"
    },
    {
        "personId": 5,
        "videoId": "john",
        "activityId": "UnV101",
        "activityDuration": "10 secs",
        "startTime": "16:10:10",
        "endTime": "16:10:20",
        "activityDate": "7/17/2020"
    },
    {
        "personId": 5,
        "videoId": "john",
        "activityId": "Mob101",
        "activityDuration": "13 secs",
        "startTime": "16:13:05",
        "endTime": "16:13:18",
        "activityDate": "7/17/2020"
    },
    {
        "personId": 5,
        "videoId": "john",
        "activityId": "Unk101",
        "activityDuration": "12 secs",
        "startTime": "16:17:19",
        "endTime": "16:17:31",
        "activityDate": "7/17/2020"
    },
    {
        "personId": 5,
        "videoId": "john",
        "activityId": "Ges101",
        "activityDuration": "4 secs",
        "startTime": "16:19:05",
        "endTime": "16:19:09",
        "activityDate": "7/17/2020"
    },
    {
        "personId": 5,
        "videoId": "john",
        "activityId": "Ges101",
        "activityDuration": "6 secs",
        "startTime": "16:19:10",
        "endTime": "16:19:16",
        "activityDate": "7/17/2020"
    },
    {
        "personId": 5,
        "videoId": "john",
        "activityId": "Unk101",
        "activityDuration": "12 secs",
        "startTime": "16:24:08",
        "endTime": "16:24:20",
        "activityDate": "7/17/2020"
    },
    {
        "personId": 5,
        "videoId": "john",
        "activityId": "StiN101",
        "activityDuration": "4 secs",
        "startTime": "16:29:25",
        "endTime": "16:29:29",
        "activityDate": "7/17/2020"
    },
    {
        "personId": 5,
        "videoId": "john",
        "activityId": "Ges101",
        "activityDuration": "4 secs",
        "startTime": "16:29:31",
        "endTime": "16:29:35",
        "activityDate": "7/17/2020"
    },
    {
        "personId": 2,
        "videoId": "john",
        "activityId": "Ges101",
        "activityDuration": "5 secs",
        "startTime": "13:21:07",
        "endTime": "13:21:12",
        "activityDate": "7/18/2020"
    },
    {
        "personId": 2,
        "videoId": "john",
        "activityId": "Ges101",
        "activityDuration": "5 secs",
        "startTime": "13:21:13",
        "endTime": "13:21:18",
        "activityDate": "7/18/2020"
    },
    {
        "personId": 2,
        "videoId": "john",
        "activityId": "StiN101",
        "activityDuration": "4 secs",
        "startTime": "13:21:19",
        "endTime": "13:21:23",
        "activityDate": "7/18/2020"
    },
    {
        "personId": 2,
        "videoId": "john",
        "activityId": "Mob101",
        "activityDuration": "60 secs",
        "startTime": "13:27:21",
        "endTime": "13:28:21",
        "activityDate": "7/18/2020"
    },
    {
        "personId": 2,
        "videoId": "john",
        "activityId": "Ges101",
        "activityDuration": "3 secs",
        "startTime": "13:27:31",
        "endTime": "13:27:34",
        "activityDate": "7/18/2020"
    },
    {
        "personId": 2,
        "videoId": "john",
        "activityId": "UnV101",
        "activityDuration": "7 secs",
        "startTime": "13:27:40",
        "endTime": "13:27:47",
        "activityDate": "7/18/2020"
    },
    {
        "personId": 2,
        "videoId": "john",
        "activityId": "StiN101",
        "activityDuration": "4 secs",
        "startTime": "13:27:48",
        "endTime": "13:27:52",
        "activityDate": "7/18/2020"
    },
    {
        "personId": 2,
        "videoId": "john",
        "activityId": "StiN101",
        "activityDuration": "5 secs",
        "startTime": "13:44:30",
        "endTime": "13:44:35",
        "activityDate": "7/18/2020"
    },
    {
        "personId": 2,
        "videoId": "john",
        "activityId": "Ges101",
        "activityDuration": "3 secs",
        "startTime": "13:44:37",
        "endTime": "13:44:40",
        "activityDate": "7/18/2020"
    },
    {
        "personId": 4,
        "videoId": "john",
        "activityId": "StiN101",
        "activityDuration": "8 secs",
        "startTime": "14:05:11",
        "endTime": "14:05:19",
        "activityDate": "7/19/2020"
    },
    {
        "personId": 4,
        "videoId": "john",
        "activityId": "Ges101",
        "activityDuration": "4 secs",
        "startTime": "14:05:20",
        "endTime": "14:05:24",
        "activityDate": "7/19/2020"
    },
    {
        "personId": 4,
        "videoId": "john",
        "activityId": "Ges101",
        "activityDuration": "5 secs",
        "startTime": "14:05:25",
        "endTime": "14:05:30",
        "activityDate": "7/19/2020"
    },
    {
        "personId": 4,
        "videoId": "john",
        "activityId": "Mob101",
        "activityDuration": "15 secs",
        "startTime": "14:07:21",
        "endTime": "14:07:36",
        "activityDate": "7/19/2020"
    },
    {
        "personId": 4,
        "videoId": "john",
        "activityId": "StiN101",
        "activityDuration": "5 secs",
        "startTime": "14:07:23",
        "endTime": "14:07:28",
        "activityDate": "7/19/2020"
    },
    {
        "personId": 4,
        "videoId": "john",
        "activityId": "Ges101",
        "activityDuration": "3 secs",
        "startTime": "14:07:29",
        "endTime": "14:07:32",
        "activityDate": "7/19/2020"
    },
    {
        "personId": 4,
        "videoId": "john",
        "activityId": "Unk101",
        "activityDuration": "20 secs",
        "startTime": "14:11:15",
        "endTime": "14:11:35",
        "activityDate": "7/19/2020"
    },
    {
        "personId": 4,
        "videoId": "john",
        "activityId": "Ges101",
        "activityDuration": "3 secs",
        "startTime": "14:14:22",
        "endTime": "14:14:25",
        "activityDate": "7/19/2020"
    },
    {
        "personId": 7,
        "videoId": 263,
        "activityId": "Mob101",
        "activityDuration": "14 secs",
        "startTime": "16:32:17",
        "endTime": "16:32:31",
        "activityDate": "7/19/2020"
    },
    {
        "personId": 7,
        "videoId": 263,
        "activityId": "Ges101",
        "activityDuration": "4 secs",
        "startTime": "16:32:21",
        "endTime": "16:32:25",
        "activityDate": "7/19/2020"
    },
    {
        "personId": 7,
        "videoId": 263,
        "activityId": "Ges101",
        "activityDuration": "4 secs",
        "startTime": "16:32:26",
        "endTime": "16:32:40",
        "activityDate": "7/19/2020"
    },
    {
        "personId": 7,
        "videoId": 263,
        "activityId": "StiN101",
        "activityDuration": "8 secs",
        "startTime": "16:40:07",
        "endTime": "16:40:15",
        "activityDate": "7/19/2020"
    },
    {
        "personId": 7,
        "videoId": 263,
        "activityId": "Ges101",
        "activityDuration": "3 secs",
        "startTime": "16:40:16",
        "endTime": "16:40:19",
        "activityDate": "7/19/2020"
    },
    {
        "personId": 7,
        "videoId": 263,
        "activityId": "Mob101",
        "activityDuration": "15 secs",
        "startTime": "16:45:23",
        "endTime": "16:45:38",
        "activityDate": "7/19/2020"
    },
    {
        "personId": 7,
        "videoId": 263,
        "activityId": "StiN101",
        "activityDuration": "5 secs",
        "startTime": "16:45:27",
        "endTime": "16:45:32",
        "activityDate": "7/19/2020"
    },
    {
        "personId": 7,
        "videoId": 263,
        "activityId": "Unk101",
        "activityDuration": "30 secs",
        "startTime": "16:47:25",
        "endTime": "16:47:55",
        "activityDate": "7/19/2020"
    },
    {
        "personId": 1,
        "videoId": 1027,
        "activityId": "Unk101",
        "activityDuration": "20 secs",
        "startTime": "10:32:20",
        "endTime": "10:32:40",
        "activityDate": "7/20/2020"
    },
    {
        "personId": 1,
        "videoId": 1027,
        "activityId": "Mob101",
        "activityDuration": "15 secs",
        "startTime": "10:47:12",
        "endTime": "10:47:27",
        "activityDate": "7/20/2020"
    },
    {
        "personId": 1,
        "videoId": 1027,
        "activityId": "Ges101",
        "activityDuration": "7 secs",
        "startTime": "10:48:07",
        "endTime": "10:48:14",
        "activityDate": "7/20/2020"
    },
    {
        "personId": 1,
        "videoId": 1027,
        "activityId": "Mob101",
        "activityDuration": "17 secs",
        "startTime": "11:00:05",
        "endTime": "11:00:22",
        "activityDate": "7/20/2020"
    },
    {
        "personId": 1,
        "videoId": 1027,
        "activityId": "StiN101",
        "activityDuration": "6 secs",
        "startTime": "11:00:07",
        "endTime": "11:00:13",
        "activityDate": "7/20/2020"
    },
    {
        "personId": 1,
        "videoId": 1027,
        "activityId": "Ges101",
        "activityDuration": "4 secs",
        "startTime": "11:00:15",
        "endTime": "11:00:19",
        "activityDate": "7/20/2020"
    },
    {
        "personId": 1,
        "videoId": 1027,
        "activityId": "Ges101",
        "activityDuration": "3 secs",
        "startTime": "11:07:02",
        "endTime": "11:07:05",
        "activityDate": "7/20/2020"
    },
    {
        "personId": 1,
        "videoId": 1027,
        "activityId": "UnV101",
        "activityDuration": "17 secs",
        "startTime": "11:12:16",
        "endTime": "11:12:33",
        "activityDate": "7/20/2020"
    },
    {
        "personId": 1,
        "videoId": 1027,
        "activityId": "StiN101",
        "activityDuration": "7 secs",
        "startTime": "11:29:03",
        "endTime": "11:29:10",
        "activityDate": "7/20/2020"
    },
    {
        "personId": 1,
        "videoId": 1027,
        "activityId": "Ges101",
        "activityDuration": "3 secs",
        "startTime": "11:29:11",
        "endTime": "11:29:14",
        "activityDate": "7/20/2020"
    },
    {
        "personId": 5,
        "videoId": 1128,
        "activityId": "StiN101",
        "activityDuration": "6 secs",
        "startTime": "13:19:13",
        "endTime": "13:19:19",
        "activityDate": "7/20/2020"
    },
    {
        "personId": 5,
        "videoId": 1128,
        "activityId": "Ges101",
        "activityDuration": "4 secs",
        "startTime": "13:20:07",
        "endTime": "13:20:11",
        "activityDate": "7/20/2020"
    },
    {
        "personId": 5,
        "videoId": 1128,
        "activityId": "Unk101",
        "activityDuration": "17 secs",
        "startTime": "13:21:20",
        "endTime": "13:21:37",
        "activityDate": "7/20/2020"
    },
    {
        "personId": 5,
        "videoId": 1128,
        "activityId": "Ges101",
        "activityDuration": "5 secs",
        "startTime": "13:21:41",
        "endTime": "13:21:46",
        "activityDate": "7/20/2020"
    },
    {
        "personId": 5,
        "videoId": 1128,
        "activityId": "Mob101",
        "activityDuration": "27 secs",
        "startTime": "13:22:00",
        "endTime": "13:22:27",
        "activityDate": "7/20/2020"
    },
    {
        "personId": 5,
        "videoId": 1128,
        "activityId": "Ges101",
        "activityDuration": "3 secs",
        "startTime": "13:22:05",
        "endTime": "13:22:08",
        "activityDate": "7/20/2020"
    },
    {
        "personId": 5,
        "videoId": 1128,
        "activityId": "StiN101",
        "activityDuration": "5 secs",
        "startTime": "13:22:09",
        "endTime": "13:22:14",
        "activityDate": "7/20/2020"
    },
    {
        "personId": 5,
        "videoId": 1128,
        "activityId": "Ges101",
        "activityDuration": "4 secs",
        "startTime": "13:22:15",
        "endTime": "13:22:19",
        "activityDate": "7/20/2020"
    },
    {
        "personId": 5,
        "videoId": 1128,
        "activityId": "Ges101",
        "activityDuration": "6 secs",
        "startTime": "13:22:21",
        "endTime": "13:22:27",
        "activityDate": "7/20/2020"
    },
    {
        "personId": 5,
        "videoId": 1128,
        "activityId": "UnV101",
        "activityDuration": "10 secs",
        "startTime": "13:28:13",
        "endTime": "13:28:23",
        "activityDate": "7/20/2020"
    },
    {
        "personId": 2,
        "videoId": 1412,
        "activityId": "Mob101",
        "activityDuration": "12 secs",
        "startTime": "16:05:08",
        "endTime": "16:05:20",
        "activityDate": "7/21/2020"
    },
    {
        "personId": 2,
        "videoId": 1412,
        "activityId": "Unk101",
        "activityDuration": "10 secs",
        "startTime": "16:07:12",
        "endTime": "16:07:22",
        "activityDate": "7/21/2020"
    },
    {
        "personId": 2,
        "videoId": 1412,
        "activityId": "StiN101",
        "activityDuration": "4 secs",
        "startTime": "16:13:25",
        "endTime": "16:13:29",
        "activityDate": "7/21/2020"
    },
    {
        "personId": 2,
        "videoId": 1412,
        "activityId": "StiN101",
        "activityDuration": "4 secs",
        "startTime": "16:13:31",
        "endTime": "16:13:35",
        "activityDate": "7/21/2020"
    },
    {
        "personId": 2,
        "videoId": 1412,
        "activityId": "UnV101",
        "activityDuration": "8 secs",
        "startTime": "16:16:26",
        "endTime": "16:16:34",
        "activityDate": "7/21/2020"
    },
    {
        "personId": 2,
        "videoId": 1412,
        "activityId": "Ges101",
        "activityDuration": "4 secs",
        "startTime": "16:30:21",
        "endTime": "16:30:25",
        "activityDate": "7/21/2020"
    },
    {
        "personId": 2,
        "videoId": 1412,
        "activityId": "Mob101",
        "activityDuration": "25 secs",
        "startTime": "16:30:27",
        "endTime": "16:30:52",
        "activityDate": "7/21/2020"
    },
    {
        "personId": 2,
        "videoId": 1412,
        "activityId": "Ges101",
        "activityDuration": "2 secs",
        "startTime": "16:30:32",
        "endTime": "16:30:34",
        "activityDate": "7/21/2020"
    },
    {
        "personId": 2,
        "videoId": 1412,
        "activityId": "StiN101",
        "activityDuration": "5 secs",
        "startTime": "16:30:37",
        "endTime": "16:30:42",
        "activityDate": "7/21/2020"
    },
    {
        "personId": 2,
        "videoId": 1412,
        "activityId": "Ges101",
        "activityDuration": "8 secs",
        "startTime": "16:30:47",
        "endTime": "16:30:54",
        "activityDate": "7/21/2020"
    },
    {
        "personId": 2,
        "videoId": 1412,
        "activityId": "Unk101",
        "activityDuration": "10 secs",
        "startTime": "16:42:21",
        "endTime": "16:42:31",
        "activityDate": "7/21/2020"
    },
    {
        "personId": 2,
        "videoId": 1412,
        "activityId": "Ges101",
        "activityDuration": "4 secs",
        "startTime": "16:44:17",
        "endTime": "16:44:21",
        "activityDate": "7/21/2020"
    },
    {
        "personId": 2,
        "videoId": 1412,
        "activityId": "Ges101",
        "activityDuration": "5 secs",
        "startTime": "16:44:23",
        "endTime": "16:44:28",
        "activityDate": "7/21/2020"
    }
]

export const getMockEvents = (startDate, endDate): Array<DateEvents> => {
    var events = events_mock.filter(e => moment(e.activityDate,'YYYY-MMM-DD HH:mm A') >= startDate && moment(e.activityDate,'YYYY-MMM-DD HH:mm A') <= endDate)
    var events2 = events.map(d => {
        return {
            date: d.activityDate,
            events: events_mock.filter(cd => cd.activityDate == d.activityDate).map(e => ({
                eventName: activity_mock.filter(ae => ae.activityId == e.activityId)[0].activityType,
                eventMode: EVENT_MODE.alert,
                eventTime: e.startTime,
                personId: e.personId + "",
                videoId: e.videoId + "",
                activityId: e.activityId + "",
                startTime: new Date(e.activityDate + " " + e.startTime).getTime(),
                endTime: new Date(e.activityDate + " " + e.startTime).getTime(),
                activityDate: new Date(e.activityDate)
            }))
        }
    })

    var dataEvents: Array<DateEvents> = []
    var dateCaptured = {}
    for (var i = 0; i < events2.length; i++) {
        if (!dateCaptured[events2[i].date]) {
            dateCaptured[events2[i].date] = true
            dataEvents.push(events2[i])
        }
    }
    return dataEvents;
}


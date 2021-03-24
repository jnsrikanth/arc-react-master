export const MEDIA_ERROR = "Error while recording media, media recording API not available, try to use desktop chrome browser. And please check the recording device and permissions are available."

export const firstToUpperCase = (value) => {
    if (value.length > 0)
        value = value.charAt(0).toUpperCase() + value.slice(1);
    return value;
}

export function isSafariOrChrome() {
    var is_safari = navigator.userAgent.toLowerCase().indexOf('safari/') > -1;
    return is_safari;
}

export function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

export function detectIsSaffari() {
    var ua = navigator.userAgent.toLowerCase();
    var isSaffari = false
    if (ua.indexOf('safari') != -1) {
        if (ua.indexOf('chrome') > -1) {
            isSaffari = false
        } else {
            isSaffari = true
        }
    }
    return isSaffari;
}

export enum USER_TYPE {
    TRADER = 'trader',
    COMPLIANCE_ANALYST = 'complianceAnalyst',
    COMPLIANCE_MANAGER = 'complianceManager',
    SUPER_ADMIN = 'superAdmin'
}

export const USER_TYPES = [{
    value: USER_TYPE.SUPER_ADMIN,
    title: 'Super Admin'
}, {
    value: USER_TYPE.COMPLIANCE_MANAGER,
    title: 'Compliance Manager'
}, {
    value: USER_TYPE.COMPLIANCE_ANALYST,
    title: 'Compliance Analyst'
}]

export const USER_TYPE_MAP = USER_TYPES.reduce((acc, userType) => ({
    ...acc,
    [userType.value]: userType
}), {})


export enum ORGANIZATION_STATUS {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}
export enum USER_STATUS {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

export enum MEETING_TYPE {
    INDIVIDUAL = 'individual',
    GROUP = 'group'
}
export enum MeetingSourceType {
  MicrosoftTeams = 'microsoftTeams',
  ZoomMeeting = 'zoomMeeting',
}

export enum ESCALATION_TYPE {
    INITIAL = 'initial',
    COMPLIANCE_ANALYST_IGNORE = 'complianceAnalystIgnore',
    COMPLIANCE_ANALYST_REPORT = 'complianceAnalystReport',
    COMPLIANCE_MANAGER_IGNORE = 'complianceManagerIgnore',
    COMPLIANCE_MANAGER_REPORT = 'complianceManagerReport',
}


export enum ACTIVITY_IMPORTANCE {
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low'
}
/*

- Events:
- Dark Blue - high importance
    - Mobile
    - Sticky Notes
- Medium Blue - medium importance
    - Gesture - Thumbs Up
    - Gesture - Thumbs Down
    - Gesture - Call
    - Gesture - Cash
    - Gesture - Silence
- Grey - low importance
    - Pen
- Alerts:
    - Purple
- Issues:
    - Orange


*/
export const ACTIVITY_IGNORE_COLOR = '#008000' // green
export const ACTIVITY_ALERT_COLOR = '#800080' // purple
export const ACTIVITY_ISSUE_COLOR = '#f9a825' // orange

export const IMPORTANCE_COLOR_MAP = {
    [ACTIVITY_IMPORTANCE.HIGH]: '#00008b', // dark blue
    [ACTIVITY_IMPORTANCE.MEDIUM]: '#2196F3', // medium blue
    [ACTIVITY_IMPORTANCE.LOW]: '#808080' // gray
}

export const IMPORTANCE_PRIORITY_MAP = {
    [ACTIVITY_IMPORTANCE.HIGH]: 1,
    [ACTIVITY_IMPORTANCE.MEDIUM]: 2,
    [ACTIVITY_IMPORTANCE.LOW]: 3
}

export const ACTIVITY_IMPORTANCE_MAP = {
    Mobile: ACTIVITY_IMPORTANCE.HIGH,
    Book: ACTIVITY_IMPORTANCE.MEDIUM,
    Call: ACTIVITY_IMPORTANCE.MEDIUM,
    Note: ACTIVITY_IMPORTANCE.HIGH,
    Pen: ACTIVITY_IMPORTANCE.LOW,
    Unknown: ACTIVITY_IMPORTANCE.HIGH,
    Thumbsdown: ACTIVITY_IMPORTANCE.MEDIUM,
    Thumbsup: ACTIVITY_IMPORTANCE.MEDIUM,
    Cash: ACTIVITY_IMPORTANCE.MEDIUM,
    Silence: ACTIVITY_IMPORTANCE.MEDIUM
}

export const AVAILABLE_DEMOS = [{
  id: 'gabor',
  name: 'Gabor',
  hasImage: true,
  hasTranscription: false,
  transcriptionUrl: '',
}, {
  id: 'example1',
  name: 'Example 1',
  hasImage: false,
  hasTranscription: true,
  transcriptionUrl: '/assets/media/webvtts/dan.vtt',
}, {
  id: 'example2',
  name: 'Example 2',
  hasImage: false,
  hasTranscription: true,
  transcriptionUrl: '/assets/media/webvtts/example2.vtt',
}, {
  id: 'example3',
  name: 'Example 3',
  hasImage: false,
  hasTranscription: true,
  transcriptionUrl: '/assets/media/webvtts/example3.vtt',
}, {
  id: 'example4',
  name: 'Example 4',
  hasImage: false,
  hasTranscription: true,
  transcriptionUrl: '/assets/media/webvtts/example4.vtt',
}, {
  id: 'example5',
  name: 'Example 5',
  hasImage: false,
  hasTranscription: true,
  transcriptionUrl: '/assets/media/webvtts/example5.vtt',
}, {
  id: 'example6',
  name: 'Example 6',
  hasImage: false,
  hasTranscription: true,
  transcriptionUrl: '/assets/media/webvtts/example6.vtt',
}]

export const ARC_DATE_TIME_FORMAT = 'MMM DD, YYYY hh:mm A'
export const ARC_DATE_FORMAT = 'MMM DD, YYYY'
export const getMeetingSourceIconUrl = (meetingSourceType: string) => {
  console.log('meetingSourceType', meetingSourceType)
  switch(meetingSourceType) {
    case MeetingSourceType.MicrosoftTeams:
      return '/assets/media/image/meeting-icon.png'
    case MeetingSourceType.ZoomMeeting:
    default:
      return '/assets/media/image/zoom.png'
  }
}
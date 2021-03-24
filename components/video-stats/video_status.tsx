import React, { useEffect, useRef, useState } from "react";
import { TimeStatTable } from "../time_stat_table/time_stat_table";
import { connect } from "react-redux";
import ReactPlayer from 'react-player'
// import video_mock from "../../utils/images/mocks/video_mock";
import Avatar, { ConfigProvider } from "react-avatar";
import { postMeetingActivityEscaltion, postMeetingComment, setSelectedActivity } from "../../redux/actions/MeetingsActions";
import { ARC_DATE_TIME_FORMAT, AVAILABLE_DEMOS, ESCALATION_TYPE, USER_TYPE } from "../../utils/app_const";
import moment from "moment";
import { createAlert } from "../../redux/actions/PendingConfirmationActions";

export const RenderTraderSingle = (props) => {
    const { meeting } = props
    const { id: demoId, hasImage } = AVAILABLE_DEMOS.find(demo => demo.id === meeting.name) || {}
    return <div className="chat-sidebar-header">
        <div className="d-flex mb-1">
            <div className="pr-2">
                <div className="avatar avatar-md  r-rd">
                    {
                        demoId && hasImage
                        ? <img src={`/assets/media/image/${demoId}.png`} className="rounded-circle" alt="image" />
                        : <ConfigProvider initials={(name, _) => name.slice(0,1)}>
                            <Avatar name={meeting.host.name} size="41" color='#f9a825' round />
                        </ConfigProvider>
                    }
                    
                </div>
            </div>
            <div style={{ marginTop: 5 }}>

                <h6 className="mb-1 text-left">Host: {meeting.host.name}</h6>
                <div className="m-0 small text-muted text-left">{moment(meeting.videoStartTime).format(ARC_DATE_TIME_FORMAT)}</div>
            </div>

        </div>

    </div>
}

const VideoStats = (props) => {
    const [reportText, setReportText] = useState("")
    const [commentText , setCommentText] = useState('')
    const { selectedMeeting, selectedActivity, authData, dispatch } = props
    const [alertsOnly, setAlertsOnly] = useState(false)
    const videoRef = useRef<any>()
    const [toggleReactPlayer, setToggleReactPlayer] = useState<boolean>(true)
    const hasReports = selectedMeeting ? selectedMeeting.activities.some((activity: any) => activity.lastEscalationType === ESCALATION_TYPE.COMPLIANCE_ANALYST_REPORT) : false
    const hasIssues = selectedMeeting ? selectedMeeting.activities.some((activity: any) => activity.lastEscalationType === ESCALATION_TYPE.COMPLIANCE_MANAGER_REPORT) : false
    const { id: demoId, hasTranscription, transcriptionUrl } = AVAILABLE_DEMOS.find(demo => demo.id === selectedMeeting?.name) || {}
    useEffect(() => {
        try {
            if(selectedMeeting) {
                dispatch(setSelectedActivity(undefined))
            }
        } catch (err) {
            console.log(err)
        }
        if(toggleReactPlayer) {
          setToggleReactPlayer(false)
          setTimeout(() => {
            setToggleReactPlayer(true)
          })
        }
        setAlertsOnly([USER_TYPE.COMPLIANCE_MANAGER, USER_TYPE.SUPER_ADMIN].includes(authData.userType))
    }, [selectedMeeting])

    useEffect(() => {
        if(selectedActivity) {
            videoRef.current.seekTo(selectedActivity.seekinTime, 'seconds')
        }
    }, [selectedMeeting, selectedActivity])
    const [selectedTranscription, setSelectedTranscription] = useState<any[]>([])
    const onVideoTrackChange = () => {
      if(!videoRef.current) return
      const videoElement = videoRef.current.getInternalPlayer()
      const selectedTextTrack = [...videoElement.textTracks].find(track => track.mode === 'showing')
      if(!selectedTextTrack) return
      setTimeout(() => {
        const allTextCues = [...selectedTextTrack.cues]
        setSelectedTranscription(allTextCues.map(cue => ({
          text: cue.text,
          startTime: cue.startTime,
          endTime: cue.endTime
        })))
      })
    }
    useEffect(() => {
      if(videoRef.current) {
        const videoElement = videoRef.current.getInternalPlayer()
        if(videoElement) {
          onVideoTrackChange()
          videoElement.textTracks.addEventListener('change', onVideoTrackChange)
          return () => {
            videoElement.textTracks.removeEventListener('change', onVideoTrackChange)
          }
        }
      }
      return () => {}
    }, [selectedMeeting])
    const onComplaintAnalystReport = () => {
        dispatch(postMeetingActivityEscaltion(selectedActivity.id, ESCALATION_TYPE.COMPLIANCE_ANALYST_REPORT, reportText))
        setReportText('')
    }
    const onComplaintAnalystIgnore = () => {
        dispatch(postMeetingActivityEscaltion(selectedActivity.id, ESCALATION_TYPE.COMPLIANCE_ANALYST_IGNORE, reportText))
        setReportText('')
    }
    const onComplaintManagerReport = () => {
        dispatch(postMeetingActivityEscaltion(selectedActivity.id, ESCALATION_TYPE.COMPLIANCE_MANAGER_REPORT, reportText))
        setReportText('')
    }
    const onComplaintManagerIgnore = () => {
        dispatch(postMeetingActivityEscaltion(selectedActivity.id, ESCALATION_TYPE.COMPLIANCE_MANAGER_IGNORE, reportText))
        setReportText('')
    }
    const onAddGeneralComment = () => {
        dispatch(postMeetingComment(selectedMeeting.id, commentText))
        setCommentText('')
    }
    
    return <>{selectedMeeting ? <div className="d-flex flex-column">
      <div className="light-tabl p-3" style={{marginTop: '0px'}}>
        <div className="row align-items-center">
          <div className="col-3 pr-0 text-center"><RenderTraderSingle meeting={selectedMeeting} /></div>
          <div className="col-7">
            <h6 className='row align-items-center'>
              {
                [USER_TYPE.COMPLIANCE_MANAGER, USER_TYPE.SUPER_ADMIN].includes(authData.userType) ? <span className={`px-2 ${!alertsOnly ? 'text-muted' : ''}`} onClick={() => setAlertsOnly(true)}>Alerts</span> : null
              }
              <span className={`px-2 ${alertsOnly ? 'text-muted' : ''}`} onClick={() => setAlertsOnly(false)}>Events</span>
            </h6>
          </div>
          <div className="col-2">
            <h6 className='float-right'>
              {
                [USER_TYPE.COMPLIANCE_MANAGER, USER_TYPE.SUPER_ADMIN].includes(authData.userType) && hasIssues && !hasReports ? <button type="button" data-toggle="modal" className={`px-3 btn btn-warning btn-rounded mr-0`} data-target="#exampleModalCenter" onClick={() => {
                  dispatch(createAlert(<><p>
                    You have exported the potential issues for this reported meeting for further investigation.
                </p>
                <p>The reported meeting is now available within your investigation system.</p></>))
                }}>Export</button> : null
              } 
            </h6>
          </div>
        </div>
        <TimeStatTable alertsOnly={alertsOnly} />
      </div>
      <div className="light-tabl p-3">
        {
          selectedActivity ?
          <form className="frm" style={{borderBottom:'0px', paddingBottom:'0px'}}>
              <div className="row">
                  <div className="col-9">
                      <div className="clearfix"></div>
                      <div className="form-group" style={{marginBottom:'0px'}}>
                          <textarea value={reportText} onChange={(e) => setReportText(e.target.value)} className="form-control" placeholder="Comments" style={{ minHeight:'34px', borderRadius: '4px' }} ></textarea>
                      </div>
                      <div className="clearfix"></div>
                  </div>
                  <div className="col-3 p-0">
                      <div className="button-group ">
                          {
                              [USER_TYPE.COMPLIANCE_ANALYST].includes(authData.userType) ? <>
                                  <button type='button' disabled={!selectedActivity || ![ESCALATION_TYPE.INITIAL].includes(selectedActivity.lastEscalationType)} onClick={onComplaintAnalystReport} className="btn btn-warning btn-rounded float-right mr-3" style={{ color: '#fff' }}>Report</button>
                                  <button type='button' disabled={!selectedActivity || ![ESCALATION_TYPE.INITIAL].includes(selectedActivity.lastEscalationType)} onClick={onComplaintAnalystIgnore} className="btn btn-text float-right" style={{ color: '#fff' }}>Ignore</button>
                              </> : null
                          }
                          {
                              ![USER_TYPE.COMPLIANCE_ANALYST].includes(authData.userType) ? <>
                                  <button type='button' disabled={!selectedActivity || [ESCALATION_TYPE.COMPLIANCE_MANAGER_REPORT, ESCALATION_TYPE.COMPLIANCE_MANAGER_IGNORE].includes(selectedActivity.lastEscalationType)} onClick={onComplaintManagerReport} className="btn btn-warning btn-rounded float-right mr-3" style={{ color: '#fff' }}>Issue</button>
                                  <button type='button' disabled={!selectedActivity || [ESCALATION_TYPE.COMPLIANCE_MANAGER_REPORT, ESCALATION_TYPE.COMPLIANCE_MANAGER_IGNORE].includes(selectedActivity.lastEscalationType)} onClick={onComplaintManagerIgnore} className="btn btn-text float-right" style={{ color: '#fff' }}>Ignore</button>
                              </> : null
                          }
                          <div className="clearfix"></div>
                  </div>
                  <div className="clearfix"></div>
                  </div>
              </div>
          </form>
          : <form className="frm" style={{borderBottom:'0px', paddingBottom:'0px'}}>
            <div className="row">
                <div className="col-10">
                    <div className="clearfix"></div>
                    <div className="form-group" style={{marginBottom:'0px'}}>
                        <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} className="form-control" placeholder="General comments" style={{ minHeight:'34px', borderRadius: '4px' }} ></textarea>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div className="col-2 p-0">
                    <div className="button-group ">
                        <button type='button' onClick={onAddGeneralComment} className="btn btn-warning btn-rounded float-right mr-3" style={{ color: '#fff' }}> Comment</button>
                </div>
                <div className="clearfix"></div>
                </div>
            </div>
        </form>
        }
      </div>
      <div className="light-tabl mb-1s p-3">
          <h6>Play and Act </h6>
          <div className="row">
              <div className="col-12">
                {
                  toggleReactPlayer
                  ? <ReactPlayer
                    ref={videoRef}
                    controls
                    className="video"
                    url={selectedMeeting.videoUrl}
                    onProgress={() => onVideoTrackChange()}
                    config={{ file: {
                      attributes: {
                        crossorigin: 'anonymous',
                        controlsList: 'nodownload'
                      },
                      tracks: hasTranscription && transcriptionUrl ? [
                        {kind: 'subtitles', src: transcriptionUrl, label: 'English', srcLang: 'en', default: true}
                      ]: []
                    }}}
                  />
                  : null
                }
              </div>
          </div>
      </div>
      <div className="light-tabl mb-1s detais p-3"  >
      
          <div className="" style={{ height: '22vh', overflowY:'scroll', overflowX:'hidden' }} id="style-3">
              <div className="row mb-1">
              {
                  demoId === 'gabor'
                  ? <div className="col-12 trance">
                      <p><span><i className="demo-icon icon-group-61"></i>00:00</span>Unknown voice - And we are in. I will just mute that. </p>
                      <p><span><i className="demo-icon icon-group-61"></i>00:03 </span>Unknown voice - Okay, action.</p>
                      <p><span><i className="demo-icon icon-group-61"></i>00:04</span>Gabor - Action.</p>
                      <p><span><i className="demo-icon icon-group-61"></i>00:07</span>Gabor - Iwan, what are we gonna do with the money.</p>
                      <p><span><i className="demo-icon icon-group-61"></i>00:13</span>Gabor - Oh, you're mute man.</p>
                      <p><span><i className="demo-icon icon-group-61"></i>00:16</span>Iwan - We are going to transfer it to an off-shore account....</p>
                      <p><span><i className="demo-icon icon-group-61"></i>00:20</span>Iwan - In.....</p>
                      <p><span><i className="demo-icon icon-group-61"></i>00:22</span>Iwan - In the virgin islands.</p>
                      <p><span><i className="demo-icon icon-group-61"></i>00:25</span>Marinho - How much, how much money you want?</p>
                      <p><span><i className="demo-icon icon-group-61"></i>00:27</span>Iwan - we are talking about.</p>
                      <p><span><i className="demo-icon icon-group-61"></i>00:31</span>Iwan - One.... one and a half million dollars.</p>
                      <p><span><i className="demo-icon icon-group-61"></i>00:35</span>Iwan - Maybe... maybe two.</p>
                      <p><span><i className="demo-icon icon-group-61"></i>00:40</span>Iwan - Or two and a half, it it all depends on what you want to do. </p>
                      <p><span><i className="demo-icon icon-group-61"></i>00:46</span>Iwan - The administration cost will be around five hundred thousand.</p>
                      <p><span><i className="demo-icon icon-group-61"></i>00:53</span>Iwan - But it will be well worth it. </p>
                      <p><span><i className="demo-icon icon-group-61"></i>00:57</span>Gabor - So, are we gonna keep this a secret or going to invite more people. </p>
                      <p><span><i className="demo-icon icon-group-61"></i>01:04</span>Marinho - Secret.</p>
                      <p><span><i className="demo-icon icon-group-61"></i>01:05</span>Gabor - Secret.</p>
                      <p><span><i className="demo-icon icon-group-61"></i>01:06</span>Iwan - Yes ofcource but I think we can trust that guy that just left the ING.</p>
                      <p><span><i className="demo-icon icon-group-61"></i>01:13</span>Gabor - Yeah.</p>
                      <p><span><i className="demo-icon icon-group-61"></i>01:14</span>Iwan - Yeah.</p>
                      <p><span><i className="demo-icon icon-group-61"></i>01:15</span>Iwan - I think he is trustable. </p>
                      <p><span><i className="demo-icon icon-group-61"></i>01:19</span>Gabor - One that went to the country where my family is from.</p>
                      <p><span><i className="demo-icon icon-group-61"></i>01:24</span>Iwan - Yeah.</p>
                      <p><span><i className="demo-icon icon-group-61"></i>01:49</span>Gabor - Okay, call you back later.</p>
                      <p><span><i className="demo-icon icon-group-61"></i>02:01</span>Gabor - Where is the money.</p>
                      <p><span><i className="demo-icon icon-group-61"></i>02:08</span>Gabor - Okay, anybody else who wants to say something or try.</p>
                      <p><span><i className="demo-icon icon-group-61"></i>02:18</span>Gabor - The Bahamas. </p>
                      <p><span><i className="demo-icon icon-group-61"></i>02:20</span>Marinho - Sunny. </p>
                      <p><span><i className="demo-icon icon-group-61"></i>02:25</span>Gabor -  And don't tell anybody else.</p>
                      <p><span><i className="demo-icon icon-group-61"></i>02:26</span>Marinho - Because I think the clouds are coming. </p>
                      <p><span><i className="demo-icon icon-group-61"></i>02:29</span>Gabor - Then we better get moving.  </p>
                      <p><span><i className="demo-icon icon-group-61"></i>02:31</span>Marinho - We better make it quick. </p>
                      <p><span><i className="demo-icon icon-group-61"></i>02:33</span>Gabor -  Exactly. </p>
                      <p><span><i className="demo-icon icon-group-61"></i>02:34</span>Gabor - Gonna pack my bags now.  </p>
                  </div>
                  : null }
                  {
                    hasTranscription
                    ?
                      <div className="col-12 trance">
                        {
                          selectedTranscription.map(transcription =>
                            <p className='d-flex'>
                              <span><i className="demo-icon icon-group-61"></i>{moment.utc(transcription.startTime * 1000).format('HH:mm:ss')}</span>
                              <span className='col p-0'>{transcription.text}</span>
                            </p>
                          )
                        }
                      </div>
                    : null
                  }
                  {
                    demoId === 'mark'
                      ? <div className="col-12 trance">
                          {
                            [
                              {
                                  time: '08:00:15',
                                  text: 'we are talking about'
                              },
                              {
                                  time: '08:00:42',
                                  text: 'One....one and a half million dollars'
                              },
                              {
                                  time: '08:01:17',
                                  text: 'Maybe...maybe two'
                              },
                              {
                                  time: '08:01:32',
                                  text: 'Or two and a half, it it all depends on what you want to do'
                              },
                              {
                                  time: '08:01:53',
                                  text: 'The administration cost will be around five hundred thousand'
                              },
                              {
                                  time: '08:02:09',
                                  text: 'But it will be well worth it'
                              }
                            ]
                            .map(timeline => <p><span><i className="demo-icon icon-group-61"></i>{timeline.time}</span>Mark - {timeline.text}</p>)
                          }
                      </div>
                      : null
                  }
              </div>
              <div className="row mb-1">
                          {/*} <div className="col-6">
                              <img src="assets/media/image/Group82.png" className="img-fluid" alt="" />
      </div>*/}
              </div>
          </div>
      </div>
    </div> : null}
    </>
};


export default connect(state => ({
    authData: state.auth.authData,
    selectedMeeting: state.meetings.selectedMeeting,
    selectedActivity: state.meetings.selectedActivity
}))(VideoStats)
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { connect } from "react-redux";
import { uploadUserVideo } from "../../redux/actions/AuthActions";
import { VIDEO_PROGRESS } from "../../utils/route_const";
import Webcam from "react-webcam";
import { detectIsSaffari, MEDIA_ERROR } from "../../utils/app_const";

const VideoRec = (props) => {
    const videoText = "sample"
    const { dispatch } = props
    const webcamRef = React.useRef<any>(null);
    const mediaRecorderRef = React.useRef<any>(null);
    const recLimit = 45
    const router = useRouter()
    const [secondRemaing, setSecondRemaing] = useState({ secondRemaing: recLimit, experinceState: "" })
    const [videoData, setVideoData] = useState<any>()
    const [errMediaRec, setErrorMediaRec] = useState("");
    const [isSaffari, setSaffari] = useState(false);

    const handleDataAvailable = ({ data }) => {
        if (data.size) {
            const blob = new Blob([data], {
                type: "video/webm"
            });
            setVideoData(blob)
        }
    }

    const waitFor = (time) => new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve()
        }, time)
    })



    const onFinishVideo = () => {
        try {
            if (!props.loading && secondRemaing.secondRemaing <= 0) {
                dispatch(uploadUserVideo(videoData));
                router.push(VIDEO_PROGRESS)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleStartCaptureClick = async () => {
        try {
            mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
                mimeType: "video/webm"
            });
            mediaRecorderRef.current.addEventListener(
                "dataavailable",
                handleDataAvailable
            );
            mediaRecorderRef.current.start();
            for (var i = 1; i <= recLimit; i++) {
                setSecondRemaing({ secondRemaing: secondRemaing.secondRemaing - i, experinceState: secondRemaing.experinceState })
                await waitFor(1000)
            }
            mediaRecorderRef.current.stop();
        } catch (err) {
            setErrorMediaRec(MEDIA_ERROR)
        }
    }


    useEffect(() => {
        setSaffari(detectIsSaffari())
    }, [])

    const onClickStart = () => {
        handleStartCaptureClick()
    }



    const onClickRedo = () => {
        secondRemaing.secondRemaing = recLimit
        secondRemaing.experinceState = "disabled"
        onClickStart()
    }


    return <>
        <div className="dark w-100">
            <div style={{ position: 'absolute', top: 0, left: 0, height: "100vh", width: "100%", overflow: "hidden" }}>
                {errMediaRec ?
                    <>
                        {isSaffari ?
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <p style={{ textAlign: 'start', fontSize: 22, marginTop: '10%' }}>
                                    Make sure media-recorder api is activated.<br />
                            To activate follow these steps:<br />
                            1. Go to Safari → Preferences → Advanced.<br />
                            2. Enable the option to “Show Develop menu in menu bar” at the bottom.<br />
                            3. Go to Develop → Experimental Features.<br />
                            4. Enable MediaRecorder.<br />
                            5. Refresh Browser.<br />
                                </p>
                            </div>
                            :
                            <p style={{ textAlign: 'center', fontSize: 22, marginTop: '10%' }}>{errMediaRec}</p>}
                    </>
                    :
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        width={"100%"}
                        videoConstraints={{
                            frameRate: 30,
                        }}
                        onError={(e) => setErrorMediaRec(MEDIA_ERROR)}
                    />}
            </div>
            <div className="" style={{ width: "80%", margin: "auto", }}>
                <div className="row">
                    {videoText ?
                        <div className="col-md-12" style={{ padding: 20, background: "rgba(0,0,0,0.6)", color: "#fff" }}>
                            <h5 className="text-left " >To experience activity.
                            <small style={{ fontSize: 13 }}> (make sure there is only one person in the video frame)</small>.
			            </h5>
                            <ul className="text-left ml-0 pl-3 " style={{ listStyle: "circle" }}>
                                <li className="mb-2" style={{ listStyle: "circle" }}>Perform the activities for {recLimit} seconds - Talk on a Mobile, Show a Note / Book, Gestures - Cash, Thumbs Up, Thumbs Down, Call, Silence.</li>
                                <li className="mb-2" style={{ listStyle: "circle" }}>Click "Start Activity" when you are ready to perform the above activities.</li>

                            </ul>
                        </div> : null}
                </div>
            </div>
            <div style={{ position: "fixed", bottom: 20, right: "10%" }}>
                <div className="col-md-12" >
                    <div style={{ position: "fixed", bottom: 20, right: "10%" }}>
                        {secondRemaing.secondRemaing == 0 || secondRemaing.experinceState == "disabled" ? <a onClick={onFinishVideo} className={`btn btn-warning float-right mt-2 btn-rounded ${secondRemaing.experinceState == "disabled" && secondRemaing.secondRemaing != 0 ? "btn-disabled" : ""}`}>Go To Dashboard</a> : null}
                        {secondRemaing.secondRemaing == 0 ? <a onClick={onClickRedo} className="btn btn-warning float-right mt-2 btn-rounded mr-2">Redo</a> : null}
                        {secondRemaing.secondRemaing < recLimit && secondRemaing.secondRemaing != 0 ? <a href="#" className="btn btn-warning mt-2 float-right btn-rounded mr-2" style={{ color: "#fff" }}>00:{secondRemaing.secondRemaing > 9 ? "" + secondRemaing.secondRemaing : "0" + secondRemaing.secondRemaing}s</a> : null}
                        {secondRemaing.secondRemaing == recLimit ? <button onClick={onClickStart} className="btn btn-warning float-right mt-2 btn-rounded mr-2">Start Activity</button> : null}
                    </div>
                </div>
            </div>
        </div>

    </>
}


export default connect(state => ({
    authToken: state.auth.token,
    authData: state.auth.authData,
    loading: state.global.loading
}))(VideoRec)
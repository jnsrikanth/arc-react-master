import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import { registerUserImages, setPickelAvailable } from "../../redux/actions/AuthActions";
import { connect } from "react-redux";
import { useRouter } from 'next/router'
import { VIDEO_REC_ROUTE } from "../../utils/route_const";


var recording = false
const IMAGES_PER_SECOND = 2
const IMAGE_RECORDING_DURATION = 30
export const FaceRegistration = (props) => {
    const { dispatch, authData } = props
    const [base64ImgArr] = useState<Array<string>>([])
    const [secondRemaing, setSecondRemaing] = useState({ secondRemaing: IMAGE_RECORDING_DURATION, experinceState: "" })
    const webcamRef = React.useRef<any>(null);
    const router = useRouter()

    const waitFor = (time) => new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve()
        }, time)
    })

    const startCapturingImages = async () => {
        recording = true
        for (var i = 1; i <= IMAGE_RECORDING_DURATION * IMAGES_PER_SECOND; i++) {
            const imageSrc = webcamRef.current.getScreenshot();
            base64ImgArr.push(imageSrc)
            setSecondRemaing({ secondRemaing: Math.floor(secondRemaing.secondRemaing - i/IMAGES_PER_SECOND), experinceState: secondRemaing.experinceState })
            await waitFor(1000 / IMAGES_PER_SECOND)
        }
        recording = false
    }

    const onImageUploadSuccess = () => {
        dispatch(setPickelAvailable(true))
        router.push(VIDEO_REC_ROUTE)
    }

    useEffect(() => {
        if (authData.isPickleAvailable)
            router.push(VIDEO_REC_ROUTE)
    }, [props.isPickleAvailable])

    const onFinish = () => {
        if (secondRemaing.secondRemaing == 0)
            dispatch(registerUserImages(base64ImgArr, onImageUploadSuccess))
    }

    const onClickStart = () => {
        if (!recording)
            startCapturingImages()
    }

    const onClickRedo = () => {
        secondRemaing.secondRemaing = IMAGE_RECORDING_DURATION
        base64ImgArr.splice(0, base64ImgArr.length)
        secondRemaing.experinceState = "disabled"
        onClickStart()
    }

    return <>
        <div className="dark">

            <div className="" style={{ width: "80%", margin: "auto", }}>
                <div className="row">
                    <div style={{ position: "absolute", overflow: "hidden", top: 0, left: 0, width: "100%", justifyContent: 'center', alignItems: "center" }}>
                    <div className="col-md-12" style={{ padding: 20, position: 'absolute', top:'0px', background: 'rgba(0,0,0,0.6)', color: '#fff'}}>
                        <h5 className="text-left " >To register your identity, do the following in 30 seconds
                            <small style={{ fontSize: 13 }}> (make sure there is only one person in the video frame)</small>.
			            </h5>
                        <ul className="text-left ml-0 pl-3 " style={{ listStyle: "circle" }}>
                            <li className="mb-2" style={{ listStyle: "circle" }}>When ready click Start and move your head 35° slowly to right - center - left - center - top - center - bottom - center.</li>
                            <li style={{ listStyle: "circle" }}>When done, click "Experience Activity". To redo click "Redo".</li>
                        </ul>
                    </div>
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width={"100%"}
                            screenshotQuality={0.3}
                        />
                    </div>
                   


                    <div className="col-md-12" >
                        <div style={{ position: "fixed", bottom: 20, right: "10%" }}>
                            {secondRemaing.secondRemaing == 0 || secondRemaing.experinceState == "disabled" ? <a onClick={onFinish} className={`btn btn-warning float-right mt-2 btn-rounded ${secondRemaing.experinceState == "disabled" && secondRemaing.secondRemaing != 0 ? "btn-disabled" : ""}`}>Experience Activity</a> : null}
                            {secondRemaing.secondRemaing == 0 ? <a onClick={onClickRedo} className="btn btn-warning float-right mt-2 btn-rounded mr-2">Redo</a> : null}
                            {secondRemaing.secondRemaing < IMAGE_RECORDING_DURATION && secondRemaing.secondRemaing != 0 ? <a href="#" className="btn btn-warning mt-2 float-right btn-rounded mr-2" style={{ color: "#fff" }}>00:{secondRemaing.secondRemaing > 9 ? "" + secondRemaing.secondRemaing : "0" + secondRemaing.secondRemaing}s</a> : null}
                            {secondRemaing.secondRemaing == IMAGE_RECORDING_DURATION ? <a onClick={onClickStart} className="btn btn-warning float-right mt-2 btn-rounded mr-2">Start</a> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}


export default connect(state => ({
    authData: state.auth.authData,
    isPickleAvailable: state.auth.isPickleAvailable
}))(FaceRegistration)
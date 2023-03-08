import { useState, useEffect, useRef } from "react";
import { Transformation } from "@cloudinary/url-gen";
import { ImageFormatType } from "@cloudinary/url-gen/types/types";
import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { format } from "@cloudinary/url-gen/actions/delivery";
import { Delivery } from "@cloudinary/url-gen/actions";
import { byAngle } from "@cloudinary/url-gen/actions/rotate";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { jpg, png,ai,pdf } from "@cloudinary/url-gen/qualifiers/format";
import cloudinaryConfig from "../../cloudinaryConfig";

const UploadWidget = () => {

    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    console.log(uploadedImageUrl)

    useEffect(()=>{

        cloudinaryRef.current = window.cloudinary;

        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: cloudinaryConfig.cloudName,
            uploadPreset: cloudinaryConfig.unsignedPreset,
            // sources: ['local'],
            styles:{
                palette: {
                  window: "#FFF",
                  windowBorder: "#90A0B3",
                  tabIcon: "#0E2F5A",
                  menuIcons: "#5A616A",
                  textDark: "#000000",
                  textLight: "#FFFFFF",
                  link:  "#0078FF",
                  action:  "#FF620C",
                  inactiveTabIcon: "#0E2F5A",
                  error: "#F44235",
                  inProgress: "#0078FF",
                  complete: "#20B832",
                  sourceBg: "#E4EBF1"
                },
                frame: {
                  background: "#0E2F5B99"
                },
                fonts: {
                    // "'Cute Font', cursive": "https://fonts.googleapis.com/css?family=Cute+Font",
                },
                transformation: [
                    { width: 500, height: 500, crop: 'limit' },
                    { format: 'svg' },
                    { format: 'jpg' },
                    { format: 'ai' }
                  ]
        }}, (error, result) => {
            console.log(result, 'result')
            if (!error && result && result.event === 'success') {
                    console.log('Done! The uploaded file public_id is: ', result.info.public_id);
                    setUploadedImageUrl(result.info.secure_url);
                    console.log(widgetRef.current.url(uploadedImageUrl, {format:'jpg'}))
                }
            })

    },[])

    const cloudinaryImage = new CloudinaryImage(
        uploadedImageUrl,
        { cloudName: cloudinaryConfig.cloudName }
      ).delivery(format('jpg')).rotate(byAngle(45)).resize(scale().width(500))
      ;

      console.log(cloudinaryImage)


    return (
        <>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>widgetRef.current.open()}>
                Upload
            </button>

            {uploadedImageUrl && (
                document
                .getElementById("uploadedimage")
                .setAttribute("src", uploadedImageUrl)
            )}
        </>
    )


}

export default UploadWidget;
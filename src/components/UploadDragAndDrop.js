import React, {useState, useEffect} from "react";
import {useDropzone} from "react-dropzone";
import FormatSelector from "./FormatSelector";
import {BsArrowRight} from "react-icons/bs"
import {GrClose} from "react-icons/gr"
import ChooseFiles from "./ChooseFiles";
import axios from "axios";
import cloudinaryConfig from "../cloudinaryConfig";
import {BiLoaderAlt} from "react-icons/bi"
import sha1 from 'crypto-js/sha1';

const UploadDragAndDrop = () => {
    const {getRootProps, getInputProps, open, acceptedFiles, isDragActive} = useDropzone({
        noClick: true,
        noKeyboard: true
    });
    const [selectedFile, setSelectedFile] = useState('');
    const [selectedFormat, setSelectedFormat] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [buttonName, setButtonName] = useState('Convert');
    const [link, setLink] = useState('');
    const [file, setFile] = useState({
        name: '',
        size: ''
    });
    const [publicId, setPublicId] = useState('');
    const [loading, setLoading] = useState(false);

    let fileSize = '';
    let fileName = '';

    const files = acceptedFiles.map((file) => {
        fileSize = `${(file.size / 1024).toFixed(2)}KB`;
        fileName = file.name;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImageUrl(reader.result);
        };

        return <li
            key={file.path}>
            {file.path} - {(file.size / 1024).toFixed(2)}
            KB
        < /li>
    });

    useEffect(() => {
        setSelectedFile(fileSize)
        console.log(fileName)
        setFile({size: `${(fileSize / 1024).toFixed(2)}KB`, name: fileName});
        console.log(file)
    }, [fileSize]);

    const closeConverter = () => {
        setSelectedFile('');
        setLink('');
        setButtonName('Convert');
        setLoading(false);
        setSelectedFormat('')
    }

    const convertMedia = async () => {
        setButtonName('Processing...');
        setLoading(true);
        const timestamp = new Date().getTime().toString();
        const publicId = `${fileName.slice(0, -4)}_in_${selectedFormat}`;
        const stringToHash = `format=${selectedFormat}&public_id=${publicId}&timestamp=${timestamp}${cloudinaryConfig.apiSecret}`;
        const hashedString = sha1(stringToHash).toString();

        const formData = new FormData();

        formData.append("file", imageUrl);
        formData.append("format", selectedFormat);
        formData.append("public_id", publicId);
        formData.append("timestamp", timestamp);
        formData.append("api_key", cloudinaryConfig.apiKey);
        formData.append("signature", hashedString);

        await axios.post(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, formData)
            .then(async response => {
                setLoading(false)
                setLink(response.data.secure_url);

                setPublicId(response.data.public_id);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const downloadFile = (e) => {
        e.preventDefault();
        const fileName = file.name;
        fetch(e.target.getAttribute('href'))
            .then(resp => resp.blob())
            .then(blob => {
                const url = e.target.getAttribute('href');
                const link = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = link;
                a.download = fileName.substring(0, fileName.lastIndexOf('.'))+'.'+url.substring(url.lastIndexOf('.') + 1);
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(link);
            })
            .catch((error) => console.log(error));
    }

    const downloadTheTransformedImage = async (e) => {
        e.preventDefault();
        const transformationUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/f_auto,q_auto/${publicId}`;

        await axios.get(transformationUrl, {
            responseType: 'blob'
        }).then(response => {
            const imageUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = file.name +'.'+ response.data.type.match(/\/(.*)/)[1]
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
            .catch(error => {
                console.log(error)
            });

    }

    return (
        <>
            {!selectedFile ? (
                <div className="container grid place-items-center" style={{opacity: isDragActive && '0.5'}}>
                    <div {...getRootProps({className: "dropzone w-10/12 flex justify-center flex-wrap"})}>
                        <input {...getInputProps()} />

                        {/* todo this should go in another view component */}
                        <div className={'converter-wrapper h-60 w-10/12 flex items-center justify-center'}>
                            <ChooseFiles openDialog={open}/>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container grid place-items-center h-2/3">
                    <div className={'h-20 text-xs w-10/12 flex items-center justify-around items-center'}>
                        <div className=""><span>{fileName}</span></div>
                        <div>
                            <FormatSelector setSelectedFormat={setSelectedFormat}/>
                        </div>
                        <div>{fileSize}</div>
                        {link.length === 0 ? (
                                <button disabled={!selectedFormat && true} onClick={convertMedia}
                                        className={'p-5 px-12 w-80 flex flex-wrap items-center bg-primary text-white font-thin text-lg'}>
                                    <span>{buttonName}</span> {!loading ? <BsArrowRight className={'ml-auto'}/> :
                                    <BiLoaderAlt style={{marginLeft: 'auto'}} className={'animate-spin'}/>}
                                </button>)
                            :
                            (
                                <div>
                                    <a href={link} onClick={downloadFile}
                                       className={'p-5 px-12 w-80 flex flex-wrap items-center bg-primary text-white font-thin text-lg'}
                                       download={true}>
                                        <span>{`Download in the .${selectedFormat.toUpperCase()} format`}</span>
                                    </a>
                                    <p className={'text-xs'}>or</p>
                                    <a href={'#'} onClick={downloadTheTransformedImage}
                                       className={'p-5 px-12 w-80 flex flex-wrap items-center bg-primary text-white font-thin text-lg'}>
                                        <span>{`Let the platform decides the best format`}</span>
                                    </a>
                                </div>
                            )}


                        <span onClick={closeConverter} className={'cursor-pointer'}><GrClose/></span>
                    </div>

                    <div className={'mt-32 converter-wrapper h-20 w-10/12 flex items-center justify-center'}>

                    </div>
                </div>
            )}
        </>
    );
}

export default UploadDragAndDrop;
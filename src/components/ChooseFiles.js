import React from "react";
import {SlCloudUpload} from "react-icons/sl"


const ChooseFiles = ({openDialog}) => {

    return(
        <>
            <button className={'open-dialog flex flex-wrap items-center'} type="button" onClick={openDialog}>
                Choose files <SlCloudUpload className={'ml-auto'} strokeWidth={'20px'} size={'20px'} />
                <span className={'text-xs drag-n-drop ml-10'}>or drag and drop</span>
            </button>
        </>
    )
}

export default ChooseFiles;
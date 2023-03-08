import React from "react";
import {SlCloudUpload} from "react-icons/sl"


const ChooseFiles = ({openDialog}) => {

    return (
        <>
            <button
                className={'bg-primary open-dialog text-white align-top m-0 p-5 px-10 w-96 text-base ' +
                    'leading-6 font-normal cursor-pointer shadow-box transition duration-150 ' +
                    'ease-in-out rounded-md flex flex-wrap items-center'}
                type="button" onClick={openDialog}>
                Choose files <SlCloudUpload className={'ml-auto'} strokeWidth={'20px'} size={'20px'}/>
                <span className={'text-xs font-thin ml-10'}>or drag and drop</span>
            </button>
        </>
    )
}

export default ChooseFiles;
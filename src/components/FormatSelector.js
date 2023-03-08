import React, {useState, useEffect} from "react";
import {BiChevronDown} from "react-icons/bi";
import {AiOutlineSearch} from "react-icons/ai";
import ChooseFiles from "./ChooseFiles";

const FormatSelector = ({setSelectedFormat}) => {

    const [formats, setFormats] = useState([
            'svg',
            'eps',
            'ai',
            'pdf',
            'jpg',
            'png',
            'gif',
            'wmf',
        ]);

    const [inputValue, setInputValue] = useState("");
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);

    // useEffect(() => {
    //     formats.forEach((format)=>{
    //         format.includes('')
    //     })
    // }, []);

    return (
        <div style={{transform: open && 'translateY(110px)'}}
             className="w-10/12 font-medium flex justify-center items-center inner-converter">
            <div className={'select-format-wrapper'}>
                <div
                    onClick={() => setOpen(!open)}
                    className={`bg-slate-200 w-full p-2 flex items-center justify-between rounded ${
                        !selected && "text-gray-700"
                    }`}
                >
                    {selected || "convert to..."}
                    <BiChevronDown size={20} className={`${open && "rotate-180"}`}/>
                </div>
                <ul
                    className={`bg-gray-800 mt-2 overflow-y-auto w-56 ${
                        open ? "max-h-60" : "max-h-0"
                    } `}
                >
                    <div className="flex items-center px-2 sticky top-0 bg-white">
                        <AiOutlineSearch size={18} className="text-gray-700"/>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value.toUpperCase())}
                            placeholder="Search format"
                            className="placeholder:text-gray-300 p-2 outline-none"
                        />
                    </div>
                    {formats?.sort().map((format, index) => (
                        <li
                            key={index}
                            className={`p-2 text-white text-sm text-gray hover:bg-red-600 hover:text-white
            ${
                                format?.toUpperCase() === selected?.toUpperCase() &&
                                "bg-sky-600 text-white"
                            }
            ${
                                format?.toUpperCase().startsWith(inputValue)
                                    ? "block"
                                    : "hidden"
                            }`}
                            onClick={() => {
                                if (format?.toUpperCase() !== selected?.toUpperCase()) {
                                    setSelected(format.toUpperCase());
                                    setSelectedFormat(format);
                                    setOpen(false);
                                    setInputValue("");
                                }
                            }}
                        >
                            {format.toUpperCase()}
                        </li>
                    ))}
                </ul>
            </div>
            {/*<div className="w-72 font-medium h-80">*/}

        </div>
    )
}

export default FormatSelector;
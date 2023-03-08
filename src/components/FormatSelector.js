import React, {useState} from "react";
import {BiChevronDown} from "react-icons/bi";
import {AiOutlineSearch} from "react-icons/ai";

const FormatSelector = ({setSelectedFormat}) => {

    const initialFormatState = [
        'svg',
        'eps',
        'ai',
        'pdf',
        'jpg',
        'png',
        'gif',
        'wmf',
    ];
    const [formats, setFormats] = useState(initialFormatState);

    const [inputValue, setInputValue] = useState('');
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);

    return (
        <div style={{transform: open && 'translateY(125px)'}}
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
                            onChange={(e) => {
                                e.target.value.length > 0 ?
                                    setFormats(formats.filter(str => str.includes(e.target.value))) :
                                    setFormats(initialFormatState)
                                setInputValue(e.target.value.toUpperCase())
                            }}
                            placeholder="Search format"
                            className="placeholder:text-gray-300 p-2 outline-none"
                        />
                    </div>
                    <div className={'my-3'}>
                        {formats?.sort().map((format, index) => (
                            <li
                                key={index}
                                className={`inline-flex flex-wrap border border-gray-400 w-20 m-1 justify-center cursor-pointer
                            p-2 text-white text-sm text-gray hover:bg-red-600 hover:text-white
            ${
                                    format?.toUpperCase() === selected?.toUpperCase() &&
                                    'bg-sky-600 text-white'
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
                    </div>

                </ul>
            </div>
        </div>
    )
}

export default FormatSelector;
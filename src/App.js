import './App.css';

import UploadDragAndDrop from "./components/UploadDragAndDrop";

function App() {

    return (
        <div className="App">
            <h1 className='title text-3xl'>File Converter</h1>
            <h2 className={'text-xl mb-12 subtitle'}>Convert your files to any format</h2>

            <UploadDragAndDrop/>

        </div>
    );
}

export default App;

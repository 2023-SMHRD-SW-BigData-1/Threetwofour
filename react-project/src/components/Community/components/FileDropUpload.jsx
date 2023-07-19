import React, { useRef } from 'react'
import Dropzone from 'react-dropzone-uploader'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'

const FileDropUpload = ({setFile}) => {

    const ref = useRef()

    const fileParams = ({ meta }) => {
        console.log('meta',meta);
        return { url: 'https://httpbin.org/post' }
    }

    const onFileChange = ({ meta, file }, status) => {
        // console.log('onFileChane',status, meta, file)
        console.log('전송 상태',status);
        console.log('meta 정보',meta);
        console.log('file 정보',file);
        console.log('ref',ref.current.files);
        setFile(ref.current.files)
    }

    const onSubmit = (files, allFiles) => {
        // console.log('전송버튼',files);
        
        console.log(allFiles);
        // allFiles.forEach(f => f.remove())
    }

    const getFilesFromEvent = e => {
        console.log('e',e);
        return new Promise(resolve => {
            getDroppedOrSelectedFiles(e).then(chosenFiles => {
                resolve(chosenFiles.map(f => f.fileObject))
            })
        })
    }

    const selectFileInput = ({ accept, onFiles, files, getFilesFromEvent }) => {
        const textMsg = files.length > 0 ? 'Upload Again' : 'Select Files'
        // console.log('accept',accept);
        // console.log('onFiles',onFiles);
        // console.log('files',files);
        // console.log('getFilesFromEvent',getFilesFromEvent);
        return (
            <label className="btn btn-danger mt-4">
                {textMsg}
                <input
                    style={{ display: 'none' }}
                    type="file"
                    accept={accept}
                    multiple
                    onChange={e => {
                        getFilesFromEvent(e).then(chosenFiles => {
                            onFiles(chosenFiles)
                        })
                    }}
                />
            </label>
        )
    }

    return (
        <Dropzone
            // onSubmit={onSubmit}
            onChangeStatus={onFileChange}
            InputComponent={selectFileInput}
            getUploadParams={fileParams}
            getFilesFromEvent={getFilesFromEvent}
            accept="image/*,audio/*,video/*"
            maxFiles={5}
            inputContent="Drop A File"
            styles={{
                dropzone: { width: '100%', height: '100%', display: 'flex' },
                dropzoneActive: { borderColor: 'green' },
            }}
            ref={ref}
        />
    );
};

export default FileDropUpload
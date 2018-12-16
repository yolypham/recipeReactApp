import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';


const imageMaxSize = 1000000000 //bytes
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/svg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => { return item.trim() })

class ImgDrop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imgSrc: null
        }
    }

    componentDidMount() {
        const { imgSrc } = this.state
        const { oldImg } = this.props
        if (oldImg !== null && oldImg !== imgSrc) {
            this.setState({ imgSrc: oldImg })
        }
    }

    verifyFile = (files) => {
        if (files && files.length > 0) {
            const currentFile = files[0]
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.currentFileSize
            if (currentFileSize > imageMaxSize) {
                alert("This file is not allowed. " + currentFileSize + " bytes is too large")
                return false
            }
            if (!acceptedFileTypesArray.includes(currentFileType)) {
                alert("This file is not allowed. Please select image files only.")
                return false
            }
            return true
        }
    }

    dropHandler = (files, rejectedFiles) => {
        if (rejectedFiles && rejectedFiles.length > 0) {
            this.verifyFile(rejectedFiles)
        }

        if (files && files.length > 0) {
            const isVerified = this.verifyFile(files)

            //if good, show file preview
            if (isVerified) {
                //imageBase64Data                
                const imgFileUpload = files[0]
                const myFileReader = new FileReader()

                //wire a listener to the file preview
                myFileReader.addEventListener("load", () => {
                    //call parent function imageUpdate() and pass file to set the state in the parent
                    this.props.imageUpdate(imgFileUpload);
                    //set the state to show preview
                    this.setState({
                        imgSrc: myFileReader.result
                    })

                }, false)

                myFileReader.readAsDataURL(imgFileUpload)
            }
        }

    }

    render() {
        const { imgSrc } = this.state

        const dropzoneStyle = {
            width: "200px",
            height: "150px",
            border: "dashed",
            paddingTop: "20px",
            marginRight: "30px",
            marginLeft: "8px"
        };

        return (
            <div className="imgDropZone">
                <div>
                    <Dropzone style={dropzoneStyle} onDrop={this.dropHandler} multiple={false}>Drop or click here to select image</Dropzone>
                </div>
                <br />
                <div>
                    {imgSrc != null ? <img src={imgSrc} width="280px" height="150px" /> : ''}
                </div>
                {/* <table>
                    <tbody>
                        <tr>
                            <td><Dropzone style={dropzoneStyle} onDrop={this.dropHandler} multiple={false}>Drop or click here to select image</Dropzone></td>
                            <td>{imgSrc != null ? <img src={imgSrc} width="280px" height="150px" /> : ''}</td>
                        </tr>
                    </tbody>
                </table> */}
            </div>
        )
    }
}
ImgDrop.propTypes = {
    imageUpdate: PropTypes.func.isRequired,
    oldImg: PropTypes.string
};

export default ImgDrop
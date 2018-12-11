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
            //console.log(rejectedFiles)
            this.verifyFile(rejectedFiles)
        }

        if (files && files.length > 0) {
            //console.log(files);
            const isVerified = this.verifyFile(files)

            if (isVerified) {
                //imageBase64Data                
                const currentFile = files[0]
                //console.log(currentFile)
                const myFileReader = new FileReader()

                //wire a listener 
                myFileReader.addEventListener("load", () => {
                    //call parent function and pass file to set the state in the parent
                    this.props.imageUpdate(currentFile);
                    //set the state to show preview
                    this.setState({
                        imgSrc: myFileReader.result
                    })

                }, false)

                myFileReader.readAsDataURL(currentFile)
            }
        }

    }

    render() {
        const { imgSrc } = this.state

        const { imgFile } = this.props



        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td><Dropzone onDrop={this.dropHandler} multiple={false}>Drop or click here to select image</Dropzone></td>
                            <td>{imgSrc != null ? <img src={imgSrc} width="350px" /> : ''}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
ImgDrop.propTypes = {
    imageUpdate: PropTypes.func.isRequired
};

export default ImgDrop
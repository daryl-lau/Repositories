import React, { useState } from 'react'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import SparkMD5 from 'spark-md5'

function Upload () {
  const [progress, setProgress] = useState(0)
  const [filename, setFilename] = useState(null)
  const [fileSize, setfileSize] = useState(0)

  const handleChange = (e) => {
    // let md5Code = CryptoJS.MD5(e.target.files[0])
    // console.log(md5Code.toString(CryptoJS.enc.Hex));
    let formdata = new FormData()
    formdata.append('chunk', e.target.files[0])
    formdata.append('fileName', e.target.files[0].name)
    axios.post('http://localhost:8080/upload', formdata, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: function (e) {
        console.log(e);
        caclProgress(e.total, e.loaded);
      }
    })
  }

  const caclProgress = (total, now) => {
    let loaded = Math.ceil(now / total * 100)
    console.log(loaded);
    setProgress(loaded)
  }

  const handleProgress = (e) => {
    console.log(e);
  }

  const [chunkList, setChunkList] = useState([])
  const handleChange2 = (e) => {
    const { filename: fileName, chunkList: chunk, fileSize: size } = createChunkList(e.target.files[0])
    setChunkList(chunk)
    setFilename(fileName)
    setfileSize(size)
  }

  const createChunkList = (file) => {
    let chunkList = [],
      fileSize = file.size,
      chunkSize = 10 * 1024 * 1024,
      blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
      currentChunk = 0;
    while (currentChunk < fileSize) {
      let nextChunk = blobSlice.call(file, currentChunk, currentChunk + chunkSize)
      console.log(nextChunk);
      chunkList.push(nextChunk)
      currentChunk += chunkSize
    }
    return { filename: file.name, chunkList, fileSize }
  }


  const handleUpload = () => {
    let uploadData = []
    if (chunkList.length > 0) {
      uploadData = chunkList.map((chunk, index) => {
        let formdata = new FormData()
        formdata.append('chunk', chunk)
        formdata.append('name', filename + '-chunk-' + index)
        return formdata
      })
    }

    console.log(uploadData);
    let requestList = uploadData.map(formdata =>
      axios.post('http://localhost:8080/upload', formdata, { headers: { 'Content-Type': 'multipart/form-data' } })
    )

    console.log(requestList);
    axios.all(requestList)
      .then(d => {
        console.log(d);
        setChunkList([])
      })
      .catch(e => {
        console.log(e);
        setChunkList([])
      })
  }

  const caclHash = (e) => {
    // let reader = new FileReader()
    // reader.addEventListener('loadend', function () {
    //   // let md5Code = CryptoJS.MD5(reader.result)
    //   // console.log(md5Code.toString(CryptoJS.enc.Hex));
    //   console.log(reader.result);
    //   let md5 = CryptoJS.MD5(reader.result).toString(CryptoJS.enc.Hex)
    //   console.log(md5);
    // })

    // reader.readAsBinaryString(e.target.files[0])

    // console.log(chunkList);
    // // chunkList.forEach(blob => reader.readAsArrayBuffer(blob))
    // reader.readAsArrayBuffer(chunkList[0]);
    // reader.addEventListener("loadend", function () {
    //   //  包含被转化为类型数组 typed array 的 blob
    //   console.log(reader.result);
    // })

    console.log('hash');

    // var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
    //   file = e.target.files[0],
    //   chunkSize = 2097152,                             // Read in chunks of 2MB
    //   chunks = Math.ceil(file.size / chunkSize),
    //   currentChunk = 0,
    //   spark = new SparkMD5.ArrayBuffer(),
    //   fileReader = new FileReader();

    // fileReader.onload = function (e) {
    //   console.log('read chunk nr', currentChunk + 1, 'of', chunks);
    //   spark.append(e.target.result);                   // Append array buffer
    //   currentChunk++;

    //   if (currentChunk < chunks) {
    //     loadNext();
    //   } else {
    //     console.log('finished loading');
    //     console.info('computed hash', spark.end());  // Compute hash
    //   }
    // };

    // fileReader.onerror = function () {
    //   console.warn('oops, something went wrong.');
    // };

    // function loadNext () {
    //   var start = currentChunk * chunkSize,
    //     end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
    //   fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    // }
    // loadNext();

    const worker = new Worker('./hashWorker.js')
    worker.postMessage({ chunkList, filename, fileSize })
    worker.onmessage = function (e) {
      console.log(e);
      console.log(e.data.percent, e.data.hash);
      setProgress(e.data.percent)
    }
  }

  return (
    <div>
      <p>{progress}%</p>
      <input type="file" onChange={handleChange} onProgress={handleProgress} />
      <input type="file" onChange={handleChange2} onProgress={handleProgress} />
      <button onClick={caclHash}>计算hash</button>
      <button onClick={handleUpload}>上传</button>
    </div>
  )
}


export default Upload
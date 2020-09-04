
self.importScripts('https://cdn.bootcss.com/spark-md5/3.0.0/spark-md5.js')
self.importScripts('https://unpkg.com/axios/dist/axios.min.js')

self.onmessage = async (event) => {
  console.log(event);
  let { chunkList, filename, fileSize } = event.data
  const sparkTotal = new self.SparkMD5.ArrayBuffer()
  let chunkSize = 0
  // let perSize = 100 / chunkList.length

  // let bufferArr = []
  // chunkList.forEach(chunk => {
  //   const reader = new FileReader()
  //   reader.readAsArrayBuffer(chunk)
  //   reader.onloadend = function (e) {
  //     bufferArr.push(e.target.result)
  //   }
  // })

  // console.log(bufferArr);

  let requestList = []
  chunkList.forEach((chunk, index) => {
    let spark = new self.SparkMD5.ArrayBuffer()
    let reader = new FileReader()
    let formdata = new FormData()
    reader.readAsArrayBuffer(chunk)
    reader.onloadend = function (e) {
      console.log(e.target.result);
      sparkTotal.append(e.target.result)
      spark.append(e.target.result)
      const hash = spark.end()

      formdata.append('chunk', chunk)
      formdata.append('name', filename.split('.')[0] + '-' + hash + '-' + index)
      formdata.append('hash', hash)
      requestList.push(self.axios.post('http://localhost:8080/upload', formdata, { headers: { 'Content-Type': 'multipart/form-data' } }))
      chunkSize += chunk.size
      let percent = Math.ceil(chunkSize / fileSize * 100)
      self.postMessage({ percent, hash })
    }
  })

  console.log(requestList);

  // axios.all(requestList).then(d => console.log(d)).catch(e => console.log(e))
  // Promise.all(requestList).then((d) => {
  //   console.log(d);
  //   self.postMessage({ percent, hash: sparkTotal.end() })
  // })
  // ).catch((e) => { console.log(e); })


  // self.postMessage({ percent: 100, hash: sparkTotal.end() })

  // let res = await Promise.all(chunkList.map((chunk) => new Promise((resolve) => {
  //   const reader = new FileReader()
  //   reader.readAsArrayBuffer(chunk) //读取每个chunk,转成arraybuffer
  //   reader.onload = function (event) {
  //     percent += perSize
  //     self.postMessage({ percent: Number(percent.toFixed(2)) })
  //     resolve(event.target.result)
  //   }
  // })))
  // console.log(res);
  // res.forEach((item) => { spark.append(item) })//必须单独拿出来append，因为每个chunk不一样，会导致上面循环顺序不对，从而使得最后算出的hash不一样
  // self.postMessage({ percent: 100, hash: spark.end() })
  // self.close()
}



// self.onmessage = async (event) => {
//   console.log(event);
//   let chunkList = event.data
//   const spark = new self.SparkMD5.ArrayBuffer()
//   let percent = 0
//   let perSize = 100 / chunkList.length
//   let res = await Promise.all(chunkList.map((chunk) => new Promise((resolve) => {
//     const reader = new FileReader()
//     reader.readAsArrayBuffer(chunk) //读取每个chunk,转成arraybuffer
//     reader.onload = function (event) {
//       percent += perSize
//       self.postMessage({ percent: Number(percent.toFixed(2)) })
//       resolve(event.target.result)
//     }
//   })))
//   console.log(res);
//   res.forEach((item) => { spark.append(item) })//必须单独拿出来append，因为每个chunk不一样，会导致上面循环顺序不对，从而使得最后算出的hash不一样
//   self.postMessage({ percent: 100, hash: spark.end() })
//   self.close()
// }
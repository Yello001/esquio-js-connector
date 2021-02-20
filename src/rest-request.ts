export function esquioRestRequest() {
  fetch('http://orf.at', {headers: {}})
    .then(result => console.log(result.json()));
}
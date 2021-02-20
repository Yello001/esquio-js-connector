export function esquioRestRequest() {
  fetch('', {headers: {}})
    .then(result => console.log(result.json()));
}
export function uploadLab(lab) {
    let formData = new FormData();
    formData.append("file", lab.files[0]);

    fetch("https://qwertyblut.herokuapp.com/api/labs/", {
            method: "POST",
            body: formData
        }
    ).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
}
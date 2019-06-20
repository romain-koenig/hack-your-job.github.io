const fs = require("fs");

const profilesFolder = "job-hackers"

const concatenateJSON = (fileName) => getJobHackerObject(profilesFolder + "/" + fileName)

const getJobHackerObject = (file) => {
    const fileData = fs.readFileSync(file, "utf8")
    return JSON.parse(fileData)
}

fs.readdir(profilesFolder, (error, files) => {
    //const profilesArray = files.reduce(concatenateJSON, null)
    const profilesArray = files.map(concatenateJSON)
    fs.writeFile("profiles-data/job-hackers.fs", JSON.stringify(profilesArray), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    })
})


const fs = require("fs");

const profilesFolder = "job-hackers"
const targetProfilesFile = "job-hackers.json"

const concatenateJSON = (fileName) => getJobHackerObject(`${profilesFolder}/${fileName}`)

const getJobHackerObject = (file) => {
    const fileData = fs.readFileSync(file, "utf8")
    return JSON.parse(fileData)
}

fs.readdir(profilesFolder, (error, files) => {
    const profilesArray = files.map(concatenateJSON)
    fs.writeFile(targetProfilesFile, JSON.stringify(profilesArray), (err) => {
        if (err) throw err;
        console.log(`${targetProfilesFile} has been saved successfully`);
    })
})


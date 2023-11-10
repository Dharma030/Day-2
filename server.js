const express = require('express');
const fs = require("fs");
const path = require("path");
const app = express();

const outputFolder = "./output"; // Folder name where files will be stored

// To check whether the folder is already there, if not create a new folder
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

const PORT = 3000;

app.get('/createFile', (req, res) => {
    const currentTime = new Date();
    const year = currentTime.getFullYear().toString();
    const month = (currentTime.getMonth()+1).toString();
    const date = currentTime.getDate().toString();
    const hrs = currentTime.getHours().toString();
    const mins = currentTime.getMinutes().toString();
    const secs = currentTime.getSeconds().toString();
    
    const dateTimeForFileName = `${year}-${date}-${hrs}-${mins}-${secs}.txt`;
    const filePath = path.join(outputFolder,dateTimeForFileName);

    fs.writeFile(filePath, currentTime.toISOString(),(err) => {
        if(err){
            res.status(500).send('Error creating file:${err}');
            return;
        }

        res.send('File created successfully at: ${filePath}');
    })


    // // Create a file name based on the current date and time
    // const fileName = `${currentTime.getFullYear()}-${(
    //     currentTime.getMonth() + 1)}-${currentTime.getDate()}-${currentTime.getHours()}-${currentTime.getMinutes()}-${currentTime.getSeconds()}.txt`;
    
    // // Create a sample content for the file
    // const fileContent = "This is the content of the file.";
    
    // // Write the content to the file
    // fs.writeFileSync(path.join(outputFolder, fileName), fileContent);
    
    // res.send(`File created with the name: ${fileName}`);
});

app.get('/getFiles',(req, res) => {
    fs.readdir(outputFolder, (err, files) =>{
        if(err){
            res.status(500).send(`Error reading files:${err}`);
            return;
        }
        const textFiles = files.filter(file => path.extname(file) == ".txt");
        res.json(textFiles);
    });
});

app.listen(PORT, () => {
    
    console.log("Server is running on PORT", PORT);
});

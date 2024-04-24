var express = require('express');
var router = express.Router();
const path = require('path');
//const formidable = require('formidable');
router.use(express.json()); // For JSON payloads
router.use(express.urlencoded({ extended: false }));

router.use(express.static('templates'));
router.use('/images', express.static('images'));
router.use('/style', express.static('style'));

const jsonData = require('./2024_courseinfo_courseset.json'); // Adjust the path as necessary
// console.log(jsonData);

function storeInfo(req, res, next) {
  req.number = String(req.body.number);
  req.major = String(req.body.major);
  console.log(req.number);
  next(); 
}

// Render Html File
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'templates/index.html'));
  });
  
  router.get('/search', function(req, res) { // really should be router.post, TODO fix that
    req.session.number = req.number;
    req.session.major = req.major;
    res.render('search', { });
  });

  router.post('/signup', function (req,res){
    console.log("signup page")
    res.sendFile(path.join(__dirname, 'templates/signup.html'));
    //res.send(makeSignUpPage())
    //res.send(makeVerificationPage())
  });
  
  
  router.use('/verify', storeInfo, function (req, res, next) {
    req.session.number = req.number;
    req.session.major = req.major;
    res.render('welcome', { name: req.number, major:req.major });
  
    // Log that the verify page was accessed
    console.log("verify page");
  });
  
  // '/verifynumber' route
  router.use('/verifycode',storeInfo, function (req, res, next) {
    // Access the stored number from the request object
      const vCode = req.body.vcode;
      const number = req.session.number;
      const major = req.session.major;
      console.log(String(number));
      // Extract the number from the request body
      gpaList=["3.56", "3.5", "3.4", "3.3", "3.25", "3.0", "2.75", "2.5", "2.25", "3.56", "3.5", "3.4", "3.3", "3.25", "3.0", "2.75", "2.5", "2.25","3.56", "3.5", "3.4", "3.3", "3.25", "3.0", "2.75", "2.5", "2.25", "3.56", "3.5", "3.4", "3.3", "3.25", "3.0", "2.75", "2.5", "2.25","2.75", "2.5", "2.25", "3.56", "3.5", "3.4", "3.3", "3.25", "3.0", "2.75", "2.5", "2.25"]
      freshmanGPA = 3.75
      sophomoreGPA = 3.4
      juniorGPA = 3.25
      seniorGPA = 3.0
      roseHulmanGPA=3.2
      
      console.log(vCode);
      
    if(vCode == 3480){
      // Render the welcome page with the provided number
        res.render('home',{ fgpa:String(freshmanGPA)+"🥱", spgpa:String(sophomoreGPA)+"🙃", jgpa:String(juniorGPA)+"🫠", sngpa:String(seniorGPA)+"🫣", rgpa:String(roseHulmanGPA)+"🥶", bcgpa:3.21, bgpa: gpaList[0], bcmgpa: gpaList[1], bgpa: gpaList[2], bmgpa: gpaList[3], bgpa: gpaList[4], begpa: gpaList[5], chemegpa: gpaList[6], chemgpa: gpaList[7], cegpa: gpaList[8], cpsgpa: gpaList[9], cpegpa: gpaList[10], csgpa: gpaList[11], dsgpa: gpaList[12], eegpa: gpaList[13], edgpa: gpaList[14], isgpa: gpaList[15],mgpa: gpaList[16], megpa: gpaList[17], opgpa: gpaList[18], phgpa: gpaList[19], segpa: gpaList[20]  });
      }
        else{
        res.render('reverify')
      }
      // Log that the verify page was accessed
      console.log("verify page");
  });
  
  
  router.use('/home',storeInfo, function (req, res, next) {
    // Access the stored number from the request object
      let vCode = req.body.vcode;
      const number = req.session.number;
      const major = req.session.major;
      console.log(number);
      // Extract the number from the request body
      gpaList=["3.56", "3.5", "3.4", "3.3", "3.25", "3.0", "2.75", "2.5", "2.25", "3.56", "3.5", "3.4", "3.3", "3.25", "3.0", "2.75", "2.5", "2.25","3.56", "3.5", "3.4", "3.3", "3.25", "3.0", "2.75", "2.5", "2.25", "3.56", "3.5", "3.4", "3.3", "3.25", "3.0", "2.75", "2.5", "2.25","2.75", "2.5", "2.25", "3.56", "3.5", "3.4", "3.3", "3.25", "3.0", "2.75", "2.5", "2.25"]
      freshmanGPA = 3.75
      sophomoreGPA = 3.4
      juniorGPA = 3.25
      seniorGPA = 3.0
      roseHulmanGPA=3.2
  
      console.log(vCode);
  
  
      // Render the welcome page with the provided number
      res.render('home',{ fgpa:String(freshmanGPA)+"🥱", spgpa:String(sophomoreGPA)+"🙃", jgpa:String(juniorGPA)+"🫠", sngpa:String(seniorGPA)+"🫣", rgpa:String(roseHulmanGPA)+"🥶", bcgpa:3.21, bgpa: gpaList[0], bcmgpa: gpaList[1], bgpa: gpaList[2], bmgpa: gpaList[3], bgpa: gpaList[4], begpa: gpaList[5], chemegpa: gpaList[6], chemgpa: gpaList[7], cegpa: gpaList[8], cpsgpa: gpaList[9], cpegpa: gpaList[10], csgpa: gpaList[11], dsgpa: gpaList[12], eegpa: gpaList[13], edgpa: gpaList[14], isgpa: gpaList[15],mgpa: gpaList[16], megpa: gpaList[17], opgpa: gpaList[18], phgpa: gpaList[19], segpa: gpaList[20]  });
  
  });
  
  
  
  router.use('/classsearch',storeInfo, function (req, res, next) {
    classList =["ES201","MA222"];
    const number = req.session.number;
    const major = req.session.major;
    search = String(req.body.search).toUpperCase();
    const courseExists = search in jsonData;
    if (courseExists){
      res.render('classpage',{className:search,number:number});
    }
    else{
      res.render('classnotfound');
    }
  });
  
  gpaList=["3.56", "3.5", "3.4", "3.3", "3.25", "3.0", "2.75", "2.5", "2.25", "3.56", "3.5", "3.4", "3.3", "3.25", "3.0", "2.75", "2.5", "2.25","3.56", "3.5", "3.4", "3.3", "3.25", "3.0", "2.75", "2.5", "2.25", "3.56", "3.5", "3.4", "3.3", "3.25", "3.0", "2.75", "2.5", "2.25","2.75", "2.5", "2.25", "3.56", "3.5", "3.4", "3.3", "3.25", "3.0", "2.75", "2.5", "2.25"]
  router.use('/Biochemistry', function (req, res, next) {
    const BIOClasses = Object.keys(jsonData).filter(key => jsonData[key] === "BIO");
    res.render('major',{major:"Biochemistry",gpa:gpaList[0],classes:BIOClasses});
    
  });
  
  
  
  router.use('/Biochemistry-and-Molecular-Biology', function (req, res, next) {
    const BIOClasses = Object.keys(jsonData).filter(key => jsonData[key] === "BIO");
    res.render('major', { major: "Biochemistry and Molecular Biology", gpa: gpaList[1],classes:BIOClasses });
  });
  
  router.use('/Biology', function (req, res, next) {
    const BIOClasses = Object.keys(jsonData).filter(key => jsonData[key] === "BIO");
    res.render('major', { major: "Biology", gpa: gpaList[2],classes:BIOClasses });
  });
  
  router.use('/Biomathematics', function (req, res, next) {
    const BMTHClasses = Object.keys(jsonData).filter(key => jsonData[key] === "BMTH");
    res.render('major', { major: "Biomathematics", gpa: gpaList[3],classes:BMTHClasses });
  });
  
  router.use('/Biomedical-Engineering', function (req, res, next) {
  
    const BEClasses = Object.keys(jsonData).filter(key => jsonData[key] === "BE");
    res.render('major', { major: "Biomedical Engineering", gpa: gpaList[4],classes:BEClasses });;
  });
  
  router.use('/Chemical-Engineering', function (req, res, next) {
    const CHEMEClasses = Object.keys(jsonData).filter(key => jsonData[key] === "CHE");
    res.render('major', { major: "Chemical Engineering", gpa: gpaList[5],classes:CHEMEClasses });
  });
  
  router.use('/Chemistry', function (req, res, next) {
    const CHEMClasses = Object.keys(jsonData).filter(key => jsonData[key] === "CHEM");
    res.render('major', { major: "Chemistry", gpa: gpaList[6],classes:CHEMClasses });;
  });
  
  router.use('/Civil-Engineering', function (req, res, next) {
    const CEClasses = Object.keys(jsonData).filter(key => jsonData[key] === "CE");
    res.render('major', { major: "Civil Engineering", gpa: gpaList[7],classes:CEClasses });
  });
  
  router.use('/Computational-Science', function (req, res, next) {
    const MAClasses = Object.keys(jsonData).filter(key => jsonData[key] === "MA");
    res.render('major', { major: "Computational Science", gpa: gpaList[8],classes:MAClasses });
  });
  
  router.use('/Computer-Engineering', function (req, res, next) {
    const ECEClasses = Object.keys(jsonData).filter(key => jsonData[key] === "ECE");
    res.render('major', { major: "Computer Engineering", gpa: gpaList[9],classes:ECEClasses });
  });
  
  router.use('/Computer-Science', function (req, res, next) {
    const CSSEClasses = Object.keys(jsonData).filter(key => jsonData[key] === "CSSE");
    res.render('major', { major: "Computer Science", gpa: gpaList[10],classes:CSSEClasses });
  });
  
  router.use('/Data-Science', function (req, res, next) {
    const CSSEClasses = Object.keys(jsonData).filter(key => jsonData[key] === "CSSE");
    res.render('major', { major: "Data Science", gpa: gpaList[11],classes:CSSEClasses });
  });
  
  router.use('/Electrical-Engineering', function (req, res, next) {
    const ECEClasses = Object.keys(jsonData).filter(key => jsonData[key] === "ECE");
    res.render('major', { major: "Electrical Engineering", gpa: gpaList[12],classes:ECEClasses });
  });
  
  router.use('/Engineering-Design', function (req, res, next) {
    const ENGDClasses = Object.keys(jsonData).filter(key => jsonData[key] === "ENGD");
    res.render('major', { major: "Engineering Design", gpa: gpaList[13],classes:ENGDClasses});
  });
  
  router.use('/International-Studies', function (req, res, next) {
    const IAClasses = Object.keys(jsonData).filter(key => jsonData[key] === "IA");
    res.render('major', { major: "International Studies", gpa: gpaList[14],classes:IAClasses });
  });
  
  router.use('/Mathematics', function (req, res, next) {
    const MAClasses = Object.keys(jsonData).filter(key => jsonData[key] === "MA");
    res.render('major', { major: "Mathematics", gpa: gpaList[15],classes:MAClasses});
  });
  
  router.use('/Mechanical-Engineering', function (req, res, next) {
    const MEClasses = Object.keys(jsonData).filter(key => jsonData[key] === "ME");
    res.render('major', { major: "Mechanical Engineering", gpa: gpaList[16],classes:MEClasses});
  });
  
  router.use('/Optical-Engineering', function (req, res, next) {
    const OEClasses = Object.keys(jsonData).filter(key => jsonData[key] === "OE");
    res.render('major', { major: "Optical Engineering", gpa: gpaList[17],classes:OEClasses });
  });
  
  router.use('/Physics', function (req, res, next) {
    const PHClasses = Object.keys(jsonData).filter(key => jsonData[key] === "PH");
    res.render('major', { major: "Physics", gpa: gpaList[18],classes:PHEClasses });
  });
  
  router.use('/Software-Engineering', function (req, res, next) {
    const CSSEClasses = Object.keys(jsonData).filter(key => jsonData[key] === "CSSE");
    res.render('major', { major: "Software Engineering", gpa: gpaList[19],classes:CSSEClasses });
  });

  module.exports = router;
const ContestRegistration = require('../models/contestRegisration');
const Contest = require('../models/contest');
const ContestType = require('../models/contestType');
const Rank = require('../models/rank');
const Subject = require('../models/subjects');
const QuestionSet = require('../models/questionset');
const User = require('../models/user');
const QuestionBank = require('../models/hscMcqQuestionBank');
const BcsQuestionBank = require('../models/bcsMcqQuestionBank');
const BankJobQuestionBank = require('../models/bankJobMcqQuestionBank');
const Level = require('../models/contestentLevel');
const { query } = require('express-validator');
const HscQuestionBank = require('../models/hscMcqQuestionBank');


exports.getContestHome = async (req, res, next) => {

  try {
    const level = await Level.findAll();

    res.render('quiz/online-quiz-contest', {    
      level:level,
           
    });
    
  } catch (error) {

   
    
  }

 
  };


  exports.getContestGuideline = (req, res, next) => {
    res.render('quiz/online-quiz-contest-guideline');
  };

  exports.getRunningContest = (req, res, next) => {
    const message = req.query.key;
    Contest.findAll({
      where: {
        contestStatus: '1',   
      }
    })
      .then(runningContest =>{

        if(message){
          res.render('quiz/running-contest', {  
            runningContest: runningContest,
            message: message  
                  
          });
        }else{
          res.render('quiz/running-contest', {  
            runningContest: runningContest,  
            message:[]   
          });
        }

       
      
      });
      
    
    
  };

  exports.getUpcommingContest = (req, res, next) => {
    const message = req.query.key;
    
    Contest.findAll({
      where: {
        contestStatus: '2',
       
      }
    })
      .then(upcommingContest =>{
  
        if(message){
          res.render('quiz/upcoming-contest', {  
            upcommingContest: upcommingContest,  
             message:message  
          });
        }else{
          res.render('quiz/upcoming-contest', {  
            upcommingContest: upcommingContest,  
            message:[]  
          });
        }
       

      })
    
    
  };
  exports.getDetailContest = async (req, res, next) => {
    try{
  
    const contestId = req.params.contestId;
    var contestDetail = [];

    const contest = await Contest.findOne({where:{id: contestId}});
  
    const contestTypeId = contest.contesttypeId;
  
     const contestType = await ContestType.findOne({where:{id: contestTypeId}});
     const subIds = contestType.subjectIds.split(',');
     const Subjects = await Subject.findAll({where:{id:subIds}});
   
    
     const subjectNames = Subjects.map(subject=>{
      return subject.subjectName;
    }) 

    contestDetail = {
      contestdetail:contest,
      contestTypeDetail: contestType,
  
    }
  
    res.render('quiz/contest-detail',{
      contestDetail: contestDetail,
      subjectNames: subjectNames,
    })
  
  
      }catch(e){
        console.log(e)
      }
    };
  
   
  
  exports.getContestRegistration = async (req, res, next) => {

  try{
  const contestId = req.params.contestId;
  var registration = false;    
  const userId = req.user.id;

  const alreadyRegistered = await ContestRegistration.findOne({where:{contestId:contestId,userId:userId}});
  if(alreadyRegistered){
    registration = true;
  }else{
    registration = false;
  }
    
  
  Contest.findOne({where:{id: contestId}})
    .then(contest=>{
      res.render('quiz/contest-registration', {    
          contestId: contestId,
          contestType: contest.contestType,
          registration: registration
      });
    })
    }catch(e){
      console.log(e)
    }
  };

  exports.postRegistrationConfirm = (req, res, next) => {
    const paymentNumber = req.body.paymentNumber;
    const transactionId = req.body.transactionId; 
    const contestId = req.body.contestId;
    
    ContestRegistration.create({
      paymentNumber: paymentNumber,		
      transactionId: transactionId,
      userId : req.user.id,
      contestId: contestId
    })
      .then(success=>{
        res.redirect('/upcoming-contest?key=success')
      });
      
  };




  


  exports.getEnterContest = (req, res, next) => {

      const contestId = req.params.contestId;

      Contest.findOne({where:{id:contestId}})
        .then(contest=>{
          if(contest.contestStatus === 1){
            res.render('quiz/enter-quiz',{
              contest: contest
            })
          }else{
            res.redirect('/running-contest');
          }

        })

      
    
  };
 
  exports.postLoginContest = async (req, res, next) => { 

    try{


      const contestId = req.body.contestId;
      const transactionId = req.body.transactionId;
      const payingNumber = req.body.phoneNumber;
      const Ctime = new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka", timeZoneName:"short", hourCycle:"h24"  }).split(' ');
      const currentTime = parseInt(Ctime[1].split(':')[0])*3600 + parseInt(Ctime[1].split(':')[1])*60 + parseInt(Ctime[1].split(':')[2]);
      const userId = req.user.id;
      
      
      const contest = await Contest.findOne({where:{id:contestId}});

      const time = contest.contestTime.split(':');
      const contestTime = parseInt(time[0]*3600) + parseInt(time[1]*60) + parseInt(time[2]);
     

      const diff = contestTime - currentTime;

      if(diff <=0 && contest.contestStatus === 1){

        ContestRegistration.findOne({where:{
          paymentNumber: payingNumber,
          transactionId: transactionId,
          contestId: contestId,
          userId: userId
    
        }}).then(registeredUser=>{
         
          if(registeredUser){
            
            res.redirect('/quiz/'+contestId+'?info='+registeredUser.paymentNumber+'-XCY7463ZA1TSW-'+registeredUser.transactionId+'-'+currentTime);
  
          }
          else{
            res.redirect('/running-contest?key=failed');
          }

        })

      }else{
       
        res.render('quiz/countdown',{
          contest: contest,
          diff: diff*1000
        })
      }


  
    }catch(e){
      console.log(e);
    }


   
  };

  exports.getStartContest = async (req, res, next) => {

    
    try{
      const info = req.query.info;
      const contestInfo = info.split('-');
      const paymentNumber = contestInfo[0];
      const transactionId = contestInfo[2];
      const Ctime = new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka", timeZoneName:"short", hourCycle:"h24"  }).split(' ');
      const currentTime = parseInt(Ctime[1].split(':')[0])*3600 + parseInt(Ctime[1].split(':')[1])*60 + parseInt(Ctime[1].split(':')[2]);
      const contestId = req.params.contestId;
      const userId = req.user.id;
      const contest = await Contest.findOne({where:{id: contestId}});
      var time = contest.contestTime.split(':');
      var contestTime = parseInt(time[0])*3600 + parseInt(time[1])*60 + parseInt(time[2]);
      const diff = contestTime - currentTime;

      if(diff<=0 && contest.contestStatus === 1){

        const registeredUser =await ContestRegistration.findOne({where:{
          paymentNumber: paymentNumber,
          transactionId: transactionId,
          contestId: contestId,
          userId: userId
    
        }});
     
      if(registeredUser){

        const contestType = await ContestType.findOne({where:{id: contest.contesttypeId}});
        const questionset = await QuestionSet.findOne({where:{contestId:contestId}});
        const question = questionset.questionSet.split(',');

            if(contestType.eligiblity === 'HSC'){

          
              const contestQuestion = await QuestionBank.findAll({where:{id:question}});
            
                  res.render('quiz/quiz',{
                    ContestQuestionSet: contestQuestion,
                    contest: contest,
                    contestType: contestType
              });
          }
          else if(contestType.eligiblity === 'BCS'){

            
              const contestQuestion = await BcsQuestionBank.findAll({where:{id:question}});
            
                  res.render('quiz/quiz',{
                    ContestQuestionSet: contestQuestion,
                    contest: contest,
                    contestType: contestType
                    
                  });
          }    
          else if(contestType.eligiblity === 'BANKJOB'){
          
              const contestQuestion = await BankJobQuestionBank.findAll({where:{id:question}});
              
                  res.render('quiz/quiz',{
                    ContestQuestionSet: contestQuestion,
                    contest: contest,
                    contestType: contestType                
                  });

          }

        }else{
          res.redirect('/running-contest');
        }

        
        
      }else{
          res.render('quiz/countdown',{
            contest: contest,
            diff: diff*1000
          });
      }   
   

      
  
       
    }catch(e){
      console.log(e);
    }

   
  };
  

 
  exports.postAnswerEvaluate = async (req, res, next) => {
    try {
      const answer = req.body.answer; 
      const questionId = req.body.questionId;    
      const userId = req.user.id;
      const contestTypeId = req.body.contestTypeId;
      const contestId = req.body.contestId;
      const minutes = req.body.minutes; 
      const seconds = req.body.seconds;
      const contestType = await ContestType.findOne({where:{id: contestTypeId }})
      const totalTime = contestType.contestTypeDuration*60 ;
      const timeLeft = parseInt(minutes)*60 + parseInt(seconds);
      const timeTaken = totalTime - timeLeft; 
      if(contestType.eligiblity === 'HSC'){
        var totalMark = 0;
        var rightAns = 0; 
        var wrongAns = 0;
        var notAttempt = 0;
               
        const contestQuestion = await QuestionBank.findAll({where:{id:questionId}});
        const contestQuestionAns = contestQuestion.map(ans=>{
          return ans.answer;
        });
       
        for (let i = 0; i < questionId.length; i++) {         
          if(answer[i] === contestQuestionAns[i].trim() ){
            rightAns += 1;          
          }
          else if (answer[i] === 'E') {
            notAttempt += 1;
          }
          else {
            wrongAns += 1;
          }
        } 
        
      totalMark = (rightAns* parseFloat(contestType.markPerRightAns)) - (wrongAns*parseFloat(contestType.minusPerWrongAns));   
      const alreadyCreated = await Rank.findOne({where:{userId:userId,contestId:contestId}});
        if(alreadyCreated){
          res.redirect('/result-card/'+contestId);
        }else{
          Rank.create({
            submissionTime: timeTaken,
            answer: answer.toString(),
            mark: totalMark,	
            rightAns: rightAns,	
            wrongAns: wrongAns,	
            notAttempted: notAttempt,	
            userId: userId,	
            contestId: contestId,
          }).then(created=>{
            if(created){
              res.redirect('/result-card/'+contestId);
            }
          });          
        }
      }
      else if(contestType.eligiblity === 'BCS'){
        var totalMark = 0;
        var rightAns = 0; 
        var wrongAns = 0;
        var notAttempt = 0;
        const contestQuestion = await BcsQuestionBank.findAll({where:{id:questionId}});
        const contestQuestionAns = contestQuestion.map(ans=>{
          return ans.answer;
        });

        for (let i = 0; i < questionId.length; i++) {
          if (answer[i] === 'E') {
            notAttempt += 1;
          }
          else if(answer[i] === contestQuestionAns[i].trim() ){
            rightAns += 1;
          }
          else {
            wrongAns += 1;
          }
        } 
        totalMark = (rightAns* parseFloat(contestType.markPerRightAns)) - (wrongAns*parseFloat(contestType.minusPerWrongAns));
        const alreadyCreated = await Rank.findOne({where:{userId:userId,contestId:contestId}});
   
        if(alreadyCreated){
          res.redirect('/result-card/'+contestId);
        }else{
          Rank.create({
            submissionTime: timeTaken,
            answer: answer.toString(),
            mark: totalMark,	
            rightAns: rightAns,	
            wrongAns: wrongAns,	
            notAttempted: notAttempt,	
            userId: userId,	
            contestId: contestId,
          }).then(created=>{
            if(created){
              res.redirect('/result-card/'+contestId);
            }
          });    
        }   
      }
      else if(contestType.eligiblity === 'BANKJOB'){

        var totalMark = 0;
        var rightAns = 0; 
        var wrongAns = 0;
        var notAttempt = 0;
        const contestQuestion = await BankJobQuestionBank.findAll({where:{id:questionId}});
        const contestQuestionAns = contestQuestion.map(ans=>{
          return ans.answer;
        });

        for (let i = 0; i < questionId.length; i++) {
          if (answer[i] === 'E') {
            notAttempt += 1;
          }
          else if(answer[i] === contestQuestionAns[i].trim() ){
            rightAns += 1;
          }
          else {
            wrongAns += 1;
          }
        }
        
        totalMark = (rightAns* parseFloat(contestType.markPerRightAns)) - (wrongAns*parseFloat(contestType.minusPerWrongAns));
        const alreadyCreated = await Rank.findOne({where:{userId:userId,contestId:contestId}});
   
        if(alreadyCreated){
          res.redirect('/result-card/'+contestId);
        }else{
          Rank.create({
            submissionTime: timeTaken,
            answer: answer.toString(),
            mark: totalMark,	
            rightAns: rightAns,	
            wrongAns: wrongAns,	
            notAttempted: notAttempt,	
            userId: userId,	
            contestId: contestId,
          }).then(created=>{
            if(created){
              res.redirect('/result-card/'+contestId);
            }
          });       
        }
      }   
    } catch (e) {
      console.log(e);
    }    
  };

  exports.getViewResultCard = async (req, res, next) =>{
    try {
    const contestId = req.params.contestId;
    const userId = req.user.id;
    const contest = await Contest.findOne({where:{id: contestId}});
    const rank = await Rank.findOne({where:{userId: userId,contestId: contestId}});
    const contestType = await ContestType.findOne({where:{id: contest.contesttypeId}});
    const user = await User.findOne({where:{id: userId}});
    
    if( contest.contestStatus === 1 ){
      res.render('quiz/contest-result',{
        user:user,
        contestInfo:rank,
        contest: contest,
        contestTime: contestType.contestTypeDuration
       })
    }else{
      res.redirect('/running-contest')
    }
   

    } catch (error) {
      
    }

  };

  exports.getContestResult =(req, res, next) =>{

   
    Contest.findAll({where:{contestStatus:0},
      order: [
          ['id', 'DESC'],
      ],})
      .then(getAll=>{
        res.render('quiz/all-contest-result',{
          contests: getAll,
          rank: [],
          user: [],
          resultId: null, 

        });
      })
   
  }


  exports.postContestResult = async (req, res, next) =>{

    try {
      const contestId = req.body.contestId;

     const contest = await Contest.findAll({where:{contestStatus:0},
        order: [
            ['id', 'DESC'],
        ],});

        var allUser = [];
        const rank = await Rank.findAll({         
               where:{
                 contestId:contestId
               },
              order: [
            
                ['mark', 'DESC'],
                ['submissionTime', 'ASC'],

              ],
            });
       
 
        for(let i = 0; i < rank.length; i++){
          let user = await User.findOne({where:{id:rank[i].userId}});
          allUser.push(user);
          
        }
        res.render('quiz/all-contest-result',{
          contests: contest,
          rank: rank,
          user: allUser,
          resultId: contestId
        });
     
     
              
     
      
    } catch (error) {
      
    }
    
  


   
  }
  exports.getViewResultDetail = async (req, res, next) =>{

    try {

      const contestId = req.params.contestId;
      const userId = req.user.id;
      const contest = await Contest.findOne({where: {id: contestId}});
      if(contest.contestStatus === 0){
      const type = await ContestType.findOne({where: {id: contest.contesttypeId}});      
      const questions = await QuestionSet.findOne({where: {contestId: contestId}});
      const questionIds = questions.questionSet.split(',');
      const rank = await Rank.findOne({where:{userId:userId,contestId:contestId}});
        if(rank){
      
          if(type.eligiblity === 'HSC'){
            const contestQuestion = await HscQuestionBank.findAll({where:{id:questionIds}});
            const contestQuestionAns = contestQuestion.map(ans=>{
              return ans.answer;
            });
          
            res.render('quiz/quiz-detail',{
              contestQuestion: contestQuestion,
              contestQuestionAns: contestQuestionAns,
              answer: rank.answer.split(',')
            })
          }
          else if(type.eligiblity === 'BCS'){
            const contestQuestion = await BcsQuestionBank.findAll({where:{id:questionIds}});
            const contestQuestionAns = contestQuestion.map(ans=>{
              return ans.answer;
            });
            res.render('quiz/quiz-detail',{
              contestQuestion: contestQuestion,
              contestQuestionAns: contestQuestionAns,
              answer: rank.answer.split(',')
            })
          }
          else if(type.eligiblity === 'BANKJOB'){
            const contestQuestion = await BankJobQuestionBank.findAll({where:{id:questionIds}});
            const contestQuestionAns = contestQuestion.map(ans=>{
              return ans.answer;
            });
            res.render('quiz/quiz-detail',{
              contestQuestion: contestQuestion,
              contestQuestionAns: contestQuestionAns,
              answer: rank.answer.split(',')
            })
          }
        }else{
          res.redirect('/upcoming-contest')
        }  
      }else{
        res.redirect('/upcoming-contest')
      }  
    } catch (error) {  
    }
  }
  

  

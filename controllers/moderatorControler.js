const { Op } = require("sequelize");

const bcrypt = require('bcryptjs');

const Moderator = require('../models/moderator');
const Subject = require('../models/subjects');
const ContestType = require('../models/contestType');
const Contest = require('../models/contest');
const QustionBank = require('../models/hscMcqQuestionBank');
const BankJobQustionBank = require('../models/bankJobMcqQuestionBank');
const BcsQuestionBank = require('../models/bcsMcqQuestionBank');
const QuestionSet = require('../models/questionset');
const Resgistration = require('../models/contestRegisration');
const Rank = require('../models/rank');
const ConstestHistory = require('../models/contestHistory');




exports.getModeratorLogin = (req, res, next) => {

      res.render('moderator/moderator-login',{

      })
   
};

exports.postModeratorLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.pass;
  
  Moderator.findOne({where:{ username: username}})
  .then(moderator => {
    if (!moderator) {
      return res.redirect('/moderator/moderator-login');
    }
    bcrypt
      .compare(password, moderator.password)
      .then(doMatch => {
        if (doMatch) {
          req.session.isModeratorLoggedIn = true;
          req.session.moderator = moderator;
          return req.session.save(err => {
            console.log(err);
            res.redirect('/moderator/moderator-profile');
          });
        }
        
        res.redirect('/moderator/moderator-login');
      })
      .catch(err => {
        console.log(err);
        res.redirect('/moderator/moderator-login');
      });
  })




 
    
   
};

exports.getModeratorProfile = (req, res, next) => {

  
  Moderator.findByPk(req.session.moderator.id)
  .then(profile=>{
    res.render('moderator/moderator-profile',{
      moderator: profile

    })
  })

};


exports.getCreateContest = (req, res, next) => {

  ContestType.findAll()
  .then(contestTopics =>{

    res.render('moderator/create-contest', {    
      contestTopics : contestTopics     
    });
  })
   
  };


  exports.postCreateContest = (req, res, next) => {
    const name = req.body.contestName;
    const fee = req.body.contestFee;
    const date = req.body.contestDate;
    const time = req.body.contestTime;
    const chapter = req.body.topic;
    const status = 2;
    const questionSet = false;
    const contestType = req.body.contestType;
    const contestTypeId = req.body.contestId;
    const moderatorId = req.session.moderator.id;
    

    Contest.create({

      
      contestName: name ,
      contestDate: date,	
      contestTime: time,
      contestFee: fee,
      chapter: chapter,
      contestType: contestType,
      contestStatus: status,
      questionSetStatus: questionSet,
      moderatorId: moderatorId,
      contesttypeId: contestTypeId

    })
    .then(success => {
        res.redirect('/moderator/create-contest');
    })


  };


  exports.postUpdateContest = async (req, res, next) => {

    try {
    const contestStatus = req.body.contestStatus;
    const contestId = req.body.contestId;
    const moderatorId = req.session.moderator.id;

    if( parseInt(contestStatus) === 0){
      const ranks = await Rank.findAll({ 
        order: [
               
        ['mark', 'DESC'],
        ['submissionTime', 'ASC'],

      ],
        where:{contestId:contestId}});

      for(let i=0; i < ranks.length;i++){
        let create = await ConstestHistory.create({
          mark: ranks[i].mark,
          position: i+1,
          userId: ranks[i].userId,
          contestId: ranks[i].contestId,
        })

        

        
      }
      let RegistrationDestroy = await Resgistration.destroy({where:{    
        contestId: contestId,
      },
      force: true,
      });
     
     
   }

    Contest.findOne({
      where:{
        id: contestId,
        moderatorId: moderatorId,
        
    }})
    .then(contest=>{
      contest.contestStatus = contestStatus;
      return contest.save();
      
    })
    .then(ok=>{
      res.redirect('/moderator/view-all-contest');
    }).catch(e=>{
      console.log(e);
    })

    

      
    } catch (error) {
      console.log(error);
    }
    

  
  };

  exports.getCreateContestSubjects = (req, res, next) => {
    res.render('moderator/create-contest-subjects', {    
      path : 'modaretor/create-contest-subjects'      
    });
  };


  exports.postCreateContestSubjects = (req, res, next) => {
    const subjectName = req.body.subjectName;
    const part = req.body.part;
    const subjectFor = req.body.subjectFor;
   

    Subject.create({
      subjectName:subjectName,
      part: part,
      for: subjectFor,
      
    })
    .then(success=>{
      if(success){
        res.redirect('/moderator/create-contest-subjects');
      }
      
    })

  };

  exports.getCreateContestType = (req, res, next) => {
    Subject.findAll()
    .then(subject=>{
      res.render('moderator/create-contest-type', {  
        subject: subject,
        path : 'modaretor/create-contest-type'      
      });
    })
   
  };

  exports.postCreateContestType = (req, res, next) => {
    const contestTypeName = req.body.contestTypeName;
    const elegiblity = req.body.elegiblity;
    const contestDuration = req.body.contestDuration;
    const questionQuantity = req.body.questionQuantity;
    const easyQuestionQuantity = req.body.easyQuestionQuantity;
    const standardQuestionQuantity = req.body.standardQuestionQuantity;
    const hardQuestionQuantity = req.body.hardQuestionQuantity;
    const markPerRightAns = req.body.markPerRightAns;
    const minusPerWrongAns = req.body.minusPerWrongAns;
    const contestAbout = req.body.contestAbout;
   
  
    const subjectId = req.body.subjectId.toString();
   
    ContestType.create({
      contestTypeName: contestTypeName,
      eligiblity:elegiblity,
      contestTypeDuration: contestDuration,
      questionQuantity: questionQuantity,
      easyQuestionQuantity: easyQuestionQuantity,
      standardQuestionQuantity: standardQuestionQuantity,
      hardQuestionQuantity: hardQuestionQuantity,
      markPerRightAns: markPerRightAns,
      minusPerWrongAns: minusPerWrongAns,      
      subjectIds:subjectId,
      contestAbout: contestAbout

    })
    .then(type=>{
      if(type){
        res.redirect('/moderator/create-contest-type');
      }
   
    })


  };

  exports.getViewContest = async (req, res, next) => {

  try {

    var totalRegistered = []

    const contest = await Contest.findAll({ where:{
      moderatorId: req.session.moderator.id,
      [Op.or]: [{ contestStatus: 1 }, { contestStatus: 2 }]
       },
      order: [
               
        ['id', 'DESC'],
        
      ],
      
    });

    for(let i=0;i<contest.length;i++){
      let registeredUser = await Resgistration.findAndCountAll({where:{contestId:contest[i].id}});
      totalRegistered.push(registeredUser.count)
    }

    res.render('moderator/view-all-contest',{
      allContest: contest,
      totalRegistered: totalRegistered

    })
  } catch (error) {
    
  }
  
 };

  exports.getViewSubjects = (req, res, next) => {

    Subject.findAll()
    .then(result=>{
      res.render('moderator/view-all-subjects', {    
        allSubjects: result      
      });
    })

    
  };
  exports.getViewContestTopics = (req, res, next) => {

    ContestType.findAll()
    .then(result=>{
      res.render('moderator/view-all-contest-topics', {    
        allTypes: result   
      });
    })
};




exports.getSetContestQuestion = async (req, res, next) => {

 
    const contestId = req.params.contestId;
    
    Contest.findOne({where:{id:contestId}})
      .then(contest=>{
        const contestType = ContestType.findOne({where:{id:contest.contesttypeId}})
         .then(Type=>{
          if(Type.eligiblity === 'HSC'){

          QustionBank.findAll()
            .then(getAll=>{
            
              res.render('moderator/set-question',{
                allquestion: getAll,
                contestId: contestId,
                contestTypeId: contest.contesttypeId,
                contestType:Type

              })

            })

          } 

          else if(Type.eligiblity === 'BCS'){

            BcsQuestionBank.findAll()
            .then(getAll=>{
            
              res.render('moderator/set-question',{
                allquestion: getAll,
                contestId: contestId,
                contestTypeId: contest.contesttypeId,
                contestType:Type

              })

            })
            
          }

          else if(Type.eligiblity === 'BANKJOB'){

            BankJobQustionBank.findAll()
            .then(getAll=>{
            
              res.render('moderator/set-question',{
                allquestion: getAll,
                contestId: contestId,
                contestTypeId: contest.contesttypeId,
                contestType:Type

              })

            })
            
          }
         })
        })
      };

exports.postSetContestQuestion = (req, res, next) => {
 
  const contestId = req.body.contestId;

  const contestTypeId = req.body.contestTypeId;
  const questionSet = req.body.questionSet.toString();

  
    QuestionSet.create({
      questionSet: questionSet.trim(),
      contestId: contestId,
      contesttypeId: contestTypeId,
    }).then(questionSet=>{
      if(questionSet){
        Contest.findOne({where:{id: contestId}}).then(contest=>{
          contest.questionSetStatus = true;
          return contest.save().then(success=>{
            if(success){
              res.redirect('/moderator/view-all-contest')
            }else{
              res.redirect('/moderator/view-all-contest')
            }
           
          })	
    
        })
      }

    })

};



exports.postModeratorLogout = (req, res, next) => {

    req.session.destroy(err => {
    
      res.redirect('/moderator/moderator-login');
    });
};
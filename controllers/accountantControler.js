const bcrypt = require('bcryptjs');
const Accountant = require('../models/accountant');
const Contest = require('../models/contest');
const ContestHistory = require('../models/contestHistory');
const User = require('../models/user');
const UserDetail = require('../models/user-detail');
const Pirze = require('../models/prize-amount');
const Payout = require('../models/payout');
const Rank = require('../models/rank');



exports.getAccountantLogin = (req, res, next) => {

    res.render('accountant/accountant-login',{

    })
 
};

exports.postAccountantLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  
  Accountant.findOne({where:{ userName: username}})
  .then(accountant => {
    if (!accountant) {
      return res.redirect('/accountant/accountant-login');
    }
    bcrypt
      .compare(password, accountant.password)
      .then(doMatch => {
        if (doMatch) {
          req.session.isAccountantLoggedIn = true;
          req.session.accountant = accountant;
          return req.session.save(err => {
            console.log(err);
            res.redirect('/accountant/accountant-home');
          });
        }
        
        res.redirect('/accountant/accountant-login');
      })
      .catch(err => {
        console.log(err);
        res.redirect('/accountant/accountant-login');
      });
  })

 
   
};



exports.getAccountantHome = (req, res, next) => {

  res.render('accountant/accountant-home',{

    home:"hello from Admin home "

  })


};



exports.getContestPayment = (req, res, next) => {

  Contest.findAll({
    where: {
      contestStatus: 0
    }
  }).then(get=>{
    res.render('accountant/contest-payment',{
      allContest: get
    })
  })
      
};

exports.getTopperList= async (req, res, next) => {
  try {

    const contestId = req.params.contestId;
    var allUser = [];
    var paidUserId = [];
    var contestHistory = [];
    const contest = await Contest.findOne({where:{id:contestId}});
    const payoutList = await Payout.findAll({where:{contestId:contestId}});

   
    for(let i = 0; i < payoutList.length; i++){
      paidUserId.push(payoutList[i].userId);   
    }


      if(contest.contestType === false){
        contestHistory = await ContestHistory.findAll({
           
          where:{
            contestId:contestId
          },
          limit: 2,
  
           order: [
              ['position', 'ASC'],
            ],
          });
      }
      else if(contest.contestType === true){
        contestHistory = await ContestHistory.findAll({
           
          where:{
            contestId:contestId
          },
          limit: 10,
  
           order: [
              ['position', 'ASC'],
            ],
          });
      }

         


   
           for(let i = 0; i < contestHistory.length; i++){
            let user = await User.findOne({where:{id:contestHistory[i].userId}});
            allUser.push(user);
            
          }

          res.render('accountant/topper-list',{
            contest: contest,
            contestHistory: contestHistory,
            user: allUser,
            paidUserId: paidUserId
      
          })
    
  } catch (error) {
    console.log(error);
  }
   
};

exports.getMakePayment = async (req, res, next) => {

  try {
    
  const info = req.params.info;
  const data = info.split('-');
  const userId = parseInt(data[0]);
  const contestId = parseInt(data[1]);
  const rank = parseInt(data[2]);
  

  var amount = 0;




  const user = await User.findOne({where:{id:userId}});
  const userDetail = await UserDetail.findOne({where:{userId:userId}});
  const contest = await Contest.findOne({where:{id:contestId}});
  
  if(contest.contestType === false){
    if(rank == 1){
      amount = 300;
    }
    else if(rank == 2){
      amount = 200;
    }
  }
  else if(contest.contestType === true){
    const prizeAmount = await Pirze.findOne({where:{position:rank}});
    const NumberOfContestant = await ContestHistory.findAll({where:{id:contestId}});
    if(NumberOfContestant.length >=1 && NumberOfContestant.length <=1000){
      amount = prizeAmount.from10to1k;
    }
    else if(NumberOfContestant.length >=1001 && NumberOfContestant.length <=4999){
      amount = prizeAmount.from1kto4k;
    }
    else if(NumberOfContestant.length >=5000 && NumberOfContestant.length <=9999){
      amount = prizeAmount.from5kto9k;
    }
    else if(NumberOfContestant.length >=10000 && NumberOfContestant.length <=20000){
      amount = prizeAmount.from10kto20k;
    }
    else if(NumberOfContestant.length >=20001){
      amount = prizeAmount.morethan20k;
    }
  }
  
 


  res.render('accountant/make-payment',{
    user: user,
    userDetail: userDetail,
    amount: amount,
    contestId: contestId
    
  })


  } catch (error) {
    
  }
  
  
  
};

exports.postMakePayment = (req, res, next) => {
  const accountantId = req.accountant.id;
  const userId = req.body.userId;
  const contestId = req.body.contestId;
  const payoutMethod = req.body.payoutMethod;
  const payoutNumber = req.body.payoutNumber;
  const tranxId = req.body.tranxId;
  const date = req.body.date;
  const amount = req.body.amount;

  Payout.create({
    payoutNumber: payoutNumber,	
    payoutMethod: payoutMethod,	
    transactionId: tranxId,	
    prizeAmount: amount,	
    giftIssued: date,	
    amountReceived: true,
    userId:	userId,
    AccountantId:	accountantId,
    contestId: contestId

  }).then(created=>{
    if(created){
      res.redirect('/accountant/topper/'+contestId);
    }
  })

  
};



exports.postPaymentClear = async (req, res, next) => {

  try {
    const contestId = req.body.contestId;
    const contestStatus = req.body.contestStatus;
   
      let rank = await Rank.destroy({where:{    
        contestId: contestId,
      },
      force: true,
      });


    Contest.findOne({
      where:{
        id: contestId,
       
    }})
      .then(contest=>{
        contest.contestStatus = contestStatus;
        return contest.save();
        
      })
      .then(ok=>{
        res.redirect('/accountant/contest-payment');
      }).catch(e=>{
        console.log(e);
      })

    

      
    } catch (error) {
      console.log(error);
    }
    
 
};






exports.postAccountantLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
        res.redirect('/accountant/accountant-login');
        
  });
};



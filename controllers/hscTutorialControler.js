const hscVip = require('../models/hscQestion');


/* ************************************** ICT *************************************************************** */
exports.hscIctIntro = (req, res, next) => {
    res.render('hsc/ict/hsc-ict-tutorial', {
   
      });
  };

  exports.Chapter1 = (req, res, next) => {
    const part = req.query.part;
    if(part==1){
        res.render('hsc/ict/hsc-ict-chapter-1-part-1', {

        });
    }else if(part==2){
        res.render('hsc/ict/hsc-ict-chapter-1-part-2', {

        });
    }else if(part==3){
      res.render('hsc/ict/hsc-ict-chapter-1-part-3', {

      });
  }
  
  };

  exports.vipQuestion = async (req, res, next) => {
      

      try {
        const query = req.query.query;
        const info = query.split('-');
        const chapter = parseInt(info[0]);
        const ofset = parseInt(info[1]);
        const question_per_page = 15;

        const totalQuestion = await hscVip.findAll({
          where:{
            subjectId : 1,
            chapter : chapter
          }
        });
        
        const Question = await hscVip.findAll({
          limit: question_per_page,
          offset: ofset,
          where:{
            subjectId : 1,
            chapter : chapter 
          }
            

        });



        
        
        if(chapter == 1){
          const title = 'HSC ICT CHAPTER 1 VIP QUESTIONS AND ANSWER';        
            res.render('hsc/ict/hsc-ict-vip-question-and-answer', {
                Questions: Question,
                title : title,
                chapter: chapter,
                ofset: ofset,
                question_per_page: question_per_page,
                totalpage: Math.ceil(parseInt(totalQuestion.length)/question_per_page) 
            });
          } else if(chapter == 2){
            const title = 'HSC ICT CHAPTER 2 VIP QUESTIONS AND ANSWER';
            res.render('hsc/ict/hsc-ict-vip-question-and-answer', {
              Questions: Question,
              title : title,
              chapter: chapter,
              ofset: ofset,
              question_per_page: question_per_page,
              totalpage: Math.ceil(parseInt(totalQuestion.length)/question_per_page) 
            });
          } else if(chapter == 3){
            const title = 'HSC ICT CHAPTER 3 VIP QUESTIONS AND ANSWER';
            res.render('hsc/ict/hsc-ict-vip-question-and-answer', {
              Questions: Question,
              title : title,
              chapter: chapter,
              ofset: ofset,
              question_per_page: question_per_page,
              totalpage: Math.ceil(parseInt(totalQuestion.length)/question_per_page) 
            });
          } else if(chapter == 4){
            const title = 'HSC ICT CHAPTER 4 VIP QUESTIONS AND ANSWER';
            res.render('hsc/ict/hsc-ict-vip-question-and-answer', {
                Questions: Question,
                title : title,
                chapter: chapter,
                ofset: ofset,
                question_per_page: question_per_page,
                totalpage: Math.ceil(parseInt(totalQuestion.length)/question_per_page) 
            });
          } else if(chapter == 5){
            const title = 'HSC ICT CHAPTER 5 VIP QUESTIONS AND ANSWER';
            res.render('hsc/ict/hsc-ict-vip-question-and-answer', {
              Questions: Question,
              title : title,
              chapter: chapter,
              ofset: ofset,
              question_per_page: question_per_page,
              totalpage: Math.ceil(parseInt(totalQuestion.length)/question_per_page) 
            });
          } else if(chapter == 6){
            const title = 'HSC ICT CHAPTER 6 VIP QUESTIONS AND ANSWER';
            res.render('hsc/ict/hsc-ict-vip-question-and-answer', {
              Questions: Question,
                title : title,
                chapter: chapter,
                ofset: ofset,
                question_per_page: question_per_page,
                totalpage: Math.ceil(parseInt(totalQuestion.length)/question_per_page) 
            });
          } 
      } catch (error) {
          console.log(error)
      }

      
   
  };
  
  
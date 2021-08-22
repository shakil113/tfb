exports.get404 = (req, res, next) => {
    res.status(404).render('404', {
      
    });
  };
  exports.getmoderator404 = (req, res, next) => {
    res.status(404).render('moderator/404', {
      
    });
  };
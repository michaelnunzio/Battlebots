module.exports = {
    ensureAuthenticated: function(req, res, next) {
      let userId;
      if(req.params.id) {
        userId = req.params.id;
      } else if(req.params.userid) {
        userId = req.params.userid;
      }else if(req.body.userId) {
        userId = req.body.userId;
      }

        if (req.isAuthenticated()) {
          if(userId && parseInt(userId) !== parseInt(req.user.id)) {
            res.redirect('/users/' + req.user.id);
            
            return;
          }

          
          return next();
        }

        res.redirect('/');
    }
  };
  
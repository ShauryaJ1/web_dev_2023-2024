const express = require('express')
const app = express()

const cookieSessionModule = require('cookie-session');
const maxVisits = 3
const cookieInitializationParams = {
  name: 'content_cookie',
  keys: ['encryptionkey'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}

const cookieSessionMiddleware = cookieSessionModule(cookieInitializationParams)
app.use(cookieSessionMiddleware)


app.get('/', (req,res) => {

  // extract the visits from req.session
  //   (if this is the first visit, it will be undefined)
  let {visits} = req.session;

  // or-equal the 'visits' with zero
  //   (this will convert undefined to zero, or keep a number)
  visits ||= 0;

  // assign req.session.visits 
  //    (this guarantees a number) 
  req.session.visits = visits;

  // increment req.session.visits 
  req.session.visits += 1;
  render_dict = {'visits':req.session.visits,'maxvisits':maxVisits,'visits_left':maxVisits-req.session.visits}
  // render output
  if (req.session.visits>=maxVisits){

    res.render('blocked.ejs',render_dict)
  }
  else{
    res.render('content.ejs',render_dict)
  }
})


app.listen(80,"0.0.0.0", ()=>{console.log('running')})
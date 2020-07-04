const handleProfileGet=(req,res,knex)=>{
const {id}=req.params;
knex.select('*').from('users')
.where({id})
.then(user=>{
	if(user.length){
	  res.json(user[0]);
    }else{
      res.status(404).json('Not Found');
    }
})
.catch(err=>{
	  res.status(404).json('Error getting user');
})
}

module.exports={
	handleProfileGet:handleProfileGet
}
const handleSignin=(req,res,knex,bcrypt)=>{
const {email,password}=req.body;

if(!email || !password){
return res.status(400).json('incorrect form submission');
}
knex.select('email', 'hash').from('login')
.where('email', '=', email)
.then(data=>{
	const isValid=bcrypt.compareSync(password, data[0].hash);
	if(isValid){
		return knex.select('*').from('users')
		.where('email', '=', email)
		.then(user=>{
			res.json(user[0]);
		})
		.catch(err=>{
			res.status(400).json("Unable to get user")
		})
	}else{
		res.status(400).json("Wrong credential")
	}
}).catch(err=>res.status(400).json("Wrong credential")) 
}

module.exports={
	handleSignin:handleSignin
}
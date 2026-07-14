# MAXAGE:MILISECONDS (EXPIRES IN)

res.cookie('token),token,{maxAge:60 *60*1000};

#  TO GENERATE A RANDOM KEY
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# DECRYPTION
Higher number(SALT ROUNDS)
↓
More secure
bcrypt.hash(data, saltRounds)
req.body.password = await bcrypt.hash(password, 10);

# JWT TOKEN
Think of JWT as a Digital ID Card.
JWT is digitally signed using Secret key
Never store passwords inside JWT
OPTION:OPTIONAL SETTINGS LIKE EXPIRE TIME


jwt.sign(payload, secretKey, options)

const token = jwt.sign({ _id: "12345",emailId: "raj@gmail.com"},secret);

payload becomes
{
    _id: "12345",
    emailId: "raj@gmail.com",
    iat: ...,
    exp: ...
}




# COOKIE

SYNTAX: res.cookie(key ,value, options)

res.cookie('token',token,{maxAge:60*60*1000});

Now the server tells browser
Please save this JWT.
Cookie Name :token
Cookie Value:23DEFGW2132.....

Later

User opens
GET /profile
Browser automatically sends
Cookie
token=eyJhbGc...

you don't have to manually send it if you're using cookies correctly.



# PASSWORD CHECK

(RETURN TRUE OR FALSE)
bcrypt.compare(plainPassword, hashedPassword);


# ROUTING 

Which function should execute for which URL
router.post(path, handlerFunction);
authRouter.post("/register", register);


# ROUTING IN EXPRESS

"Whenever a request starts with /user, send it to authRouter."
app.use('/user', authRouter);

# MIDDLEWARE
The server first checks
Is this request coming from a logged-in user?

If security says
Allowed
then
logout()
runs.
Otherwise,
the request stops there.


# TOKEN DURING LOGOUT

jwt.verify(token, secret)

It checks
Is signature correct?
Has token expired?
Was it signed using my secret?
If any answer is No
↓
Throws error.
If Yes
↓
Returns payload.

# REDIS CONCEPT

Redis stores:Key,value
key
token:abc123

Value
Blocked

JWT is stateless.
Suppose
login
↓
JWT created
↓
Valid for one hour.
Now user clicks
Logout.
Problem
JWT is still valid.
Even after logout
someone who stole the token
can still use it.
That's bad.

await redisClient.expireAt(`token:${token}`,payload.exp);

JWT already expires after one hour.
No point keeping blocked token forever.
Redis automatically deletes
token:abc123
when JWT naturally expires.

# Solution

Maintain a
Blocklist
inside Redis.
Imagine Redis contains:
token:abc123
Blocked

redisClient.exists(key)

# decode
const payload =jwt.decode(token);
verify()
Checks signature
Checks expiry
Secure
decode()
Just reads payload
No verification


# PAGENATION

const page=2;
const limit=10;
const skip=(page-1)*limit;

Problem.find().skip(skip).limit(limit);



# FILTERATION

await Problem.find({difficulty:'easy'});


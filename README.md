
### File Server
I worked with meteor for years. In those years, i can't figure out how to handle file upload in meteor. Then i found a trick solution with [express](https://github.com/expressjs/express) and [multer](https://github.com/expressjs/multer). You may use this beside meteor. Send a file from meteor to this, then get uploadedFileUrl.

### Installation
Clone repo and `npm install; node app.js`

### Todos
- [ ] Header control
- [ ] File size control
- [ ] Maybe authentication control
- [ ] Customized response messages

Incoming request should look like this:
```
let data = new FormData();

data.append('username', Meteor.user().username);
# Append all data before files.
# Otherwise you can't get those as 'req.body' in multer.diskStorage() func

# Then append file
# If you want upload more files
# Change .single(fieldname) to .array(fieldname[, maxCount])
# For more info: https://github.com/expressjs/multer#singlefieldname
data.append('avatar', files[0]);
# Specified fieldname for multer. It's usage like: single('avatar')
# We are using basic fetch api which is supported inside React.Component
# For more info: https://developer.mozilla.org/en/docs/Web/API/Fetch_API
fetch("http://localhost:8090/upload/pp", {
	method: "POST",
	body: data,
	mode: 'no-cors',
	## 'no-cors' for prevent browsers' security policy
	## In production, you may change it, i dont know
	files: files
});
```
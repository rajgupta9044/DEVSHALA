1xx – Informational Responses
Code	Name	Meaning
100	Continue	Client can continue sending the request.
101	Switching Protocols	Server switches protocols (e.g., HTTP → WebSocket).
102	Processing	Server is processing the request (WebDAV).


2xx – Success
Code	Name	When to Use
200	OK	Request completed successfully (GET, PUT, PATCH).
201	Created	Resource successfully created (POST/Register).
202	Accepted	Request accepted for processing later.
204	No Content	Success but nothing is returned (DELETE).



3xx – Redirection
Code	Name	Meaning
301	Moved Permanently	URL has permanently changed.
302	Found	Temporary redirect.
303	See Other	Redirect after POST.
304	Not Modified	Browser should use cached version.
307	Temporary Redirect	Temporary redirect while preserving HTTP method.
308	Permanent Redirect	Permanent redirect while preserving HTTP method.

4xx – Client Errors

These mean the client made a mistake.

Code	Name	Meaning
400	Bad Request	Invalid request body or parameters.
401	Unauthorized	User is not logged in / invalid token.
403	Forbidden	Logged in but lacks permission.
404	Not Found	Requested resource doesn't exist.
405	Method Not Allowed	Wrong HTTP method used.
408	Request Timeout	Client took too long.
409	Conflict	Duplicate resource (e.g., email already exists).
413	Payload Too Large	Uploaded file is too large.
415	Unsupported Media Type	Wrong Content-Type.
422	Unprocessable Entity	Validation failed.
429	Too Many Requests	Rate limit exceeded.


5xx – Server Errors

These mean the server made a mistake.

Code	Name	Meaning
500	Internal Server Error	Unexpected server error.
501	Not Implemented	Feature not implemented.
502	Bad Gateway	Invalid response from another server.
503	Service Unavailable	Server is down or overloaded.
504	Gateway Timeout	Another server didn't respond in time




Most Important Status Codes for MERN Interviews
Code	Name	Typical Usage
✅ 200	OK	Successful GET/PUT/PATCH
✅ 201	Created	POST request (create resource)
✅ 204	No Content	DELETE success
✅ 400	Bad Request	Invalid input
✅ 401	Unauthorized	Invalid/missing JWT
✅ 403	Forbidden	No permission
✅ 404	Not Found	Resource doesn't exist
✅ 409	Conflict	Duplicate email/username
✅ 500	Internal Server Error	Server/database failure
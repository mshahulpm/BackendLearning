################# FREECODECAMP #################
curl -v https://google.com
# step by step process 
<<comm
*   Trying 142.250.183.110:443...
* Connected to google.com (142.250.183.110) port 443 (#0)
* ALPN, offering h2
* ALPN, offering http/1.1
* successfully set certificate verify locations:
*  CAfile: /etc/ssl/certs/ca-certificates.crt
*  CApath: /etc/ssl/certs
* TLSv1.3 (OUT), TLS handshake, Client hello (1):
* TLSv1.3 (IN), TLS handshake, Server hello (2):
* TLSv1.3 (IN), TLS handshake, Encrypted Extensions (8):
* TLSv1.3 (IN), TLS handshake, Certificate (11):
* TLSv1.3 (IN), TLS handshake, CERT verify (15):
* TLSv1.3 (IN), TLS handshake, Finished (20):
* TLSv1.3 (OUT), TLS change cipher, Change cipher spec (1):
* TLSv1.3 (OUT), TLS handshake, Finished (20):
* SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384
* ALPN, server accepted to use h2
* Server certificate:
*  subject: CN=*.google.com
*  start date: Dec 27 06:02:11 2021 GMT
*  expire date: Mar 21 06:02:10 2022 GMT
*  subjectAltName: host "google.com" matched cert's "google.com"
*  issuer: C=US; O=Google Trust Services LLC; CN=GTS CA 1C3
*  SSL certificate verify ok.
* Using HTTP2, server supports multi-use
* Connection state changed (HTTP/2 confirmed)
* Copying HTTP/2 data in stream buffer to connection buffer after upgrade: len=0
* Using Stream ID: 1 (easy handle 0x5593ea0725a0)
> GET / HTTP/2
> Host: google.com
> user-agent: curl/7.74.0
> accept: */*
> 
* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):
* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):
* old SSL session ID is stale, removing
* Connection state changed (MAX_CONCURRENT_STREAMS == 100)!
< HTTP/2 301 
< location: https://www.google.com/
< content-type: text/html; charset=UTF-8
< date: Tue, 25 Jan 2022 16:31:01 GMT
< expires: Thu, 24 Feb 2022 16:31:01 GMT
< cache-control: public, max-age=2592000
< server: gws
< content-length: 220
< x-xss-protection: 0
< x-frame-options: SAMEORIGIN
< alt-svc: h3=":443"; ma=2592000,h3-29=":443"; ma=2592000,h3-Q050=":443"; ma=2592000,h3-Q046=":443"; ma=2592000,h3-Q043=":443"; ma=2592000,quic=":443"; ma=2592000; v="46,43"
< 
<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>301 Moved</TITLE></HEAD><BODY>
<H1>301 Moved</H1>
The document has moved
<A HREF="https://www.google.com/">here</A>.
</BODY></HTML>
* Connection #0 to host google.com left intact
comm

curl http://localhost:3000/protected -H "cookie: authorization=totisjs872" 
# set cookie 

curl -c cookie.txt www.google.com  
# save cookie into cookie.txt file 

curl -b cookie.txt www.google.com  
# attach cookies from cookie.txt file with request 

################# BRAD TRAVERCY #################
curl https://jsonplaceholder.typicode.com/posts
<<comm
result: 
all 100 posts wilbe returned 
comm
curl https://jsonplaceholder.typicode.com/posts/3
<<comm
response:
{
  "userId": 1,
  "id": 3,
  "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
  "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
}      
comm
curl -i https://jsonplaceholder.typicode.com/posts/
#it inclued headers 
<<comm
HTTP/2 200 
date: Tue, 25 Jan 2022 15:25:10 GMT
content-type: application/json; charset=utf-8
content-length: 283
x-powered-by: Express
x-ratelimit-limit: 1000
x-ratelimit-remaining: 998
x-ratelimit-reset: 1641296342
vary: Origin, Accept-Encoding
access-control-allow-credentials: true
cache-control: max-age=43200
pragma: no-cache
expires: -1
x-content-type-options: nosniff
etag: W/"11b-USacuIw5a/iXAGdNKBvqr/TbMTc"
via: 1.1 vegur
cf-cache-status: HIT
age: 134
accept-ranges: bytes
expect-ct: max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"
report-to: {"endpoints":[{"url":"https:\/\/a.nel.cloudflare.com\/report\/v3?s=%2FTzOUPOwW8Ls325f7IyXGmrBWCBTuQOp5vIS8ahr%2BwpMKZ9OKNVywrZcywD%2B2eCZiB9s3oIumb2kecfnGHGipU6cqz993vSuJyfz4o3dFf50IczEFcNkZlS6GBwbFZwYy5aFWf3BgYqaO%2FTGdWkD"}],"group":"cf-nel","max_age":604800}
nel: {"success_fraction":0,"report_to":"cf-nel","max_age":604800}
server: cloudflare
cf-ray: 6d32833b4d048a20-BOM
alt-svc: h3=":443"; ma=86400, h3-29=":443"; ma=86400

{
  "userId": 1,
  "id": 3,
  "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
  "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
}  
comm
curl -I https://jsonplaceholder.typicode.com/posts/3
# headers only 
<<comm
response : 
HTTP/2 200 
date: Tue, 25 Jan 2022 15:25:10 GMT
content-type: application/json; charset=utf-8
content-length: 283
x-powered-by: Express
x-ratelimit-limit: 1000
x-ratelimit-remaining: 998
x-ratelimit-reset: 1641296342
vary: Origin, Accept-Encoding
access-control-allow-credentials: true
cache-control: max-age=43200
pragma: no-cache
expires: -1
x-content-type-options: nosniff
etag: W/"11b-USacuIw5a/iXAGdNKBvqr/TbMTc"
via: 1.1 vegur
cf-cache-status: HIT
age: 134
accept-ranges: bytes
expect-ct: max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"
report-to: {"endpoints":[{"url":"https:\/\/a.nel.cloudflare.com\/report\/v3?s=%2FTzOUPOwW8Ls325f7IyXGmrBWCBTuQOp5vIS8ahr%2BwpMKZ9OKNVywrZcywD%2B2eCZiB9s3oIumb2kecfnGHGipU6cqz993vSuJyfz4o3dFf50IczEFcNkZlS6GBwbFZwYy5aFWf3BgYqaO%2FTGdWkD"}],"group":"cf-nel","max_age":604800}
nel: {"success_fraction":0,"report_to":"cf-nel","max_age":604800}
server: cloudflare
cf-ray: 6d32833b4d048a20-BOM
alt-svc: h3=":443"; ma=86400, h3-29=":443"; ma=86400
comm

curl -o posts.json https://jsonplaceholder.typicode.com/posts
# put the results into posts.json file 

curl -d "title=new post&body=hello world" https://jsonplaceholder.typicode.com/posts 
# post request to create new post 

curl -d "title=edit&body=hello world" -X PUT https://jsonplaceholder.typicode.com/posts/3
# put request to edit the post 3 

curl -X DELETE https://jsonplaceholder.typicode.com/posts/3  
# delete post 3 



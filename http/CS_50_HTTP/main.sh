#!/bin/sh

### simple GET request ###

curl http://harvard.edu 

# response: 
# <html>
# <head><title>301 Moved Permanently</title></head>
# <body>
# <center><h1>301 Moved Permanently</h1></center>
# <hr><center>nginx</center>
# </body>
# </html> 

### Headers only  ###
echo " "
curl -I http://harvard.edu 

# response:

# HTTP/1.1 301 Moved Permanently
# Content-Type: text/html
# Location: https://harvard.edu/
# Server: nginx
# Traceparent: 00-51bc81fb8fb2418c8bbd29d94df98d8e-a3224ab512834171-00
# X-Cloud-Trace-Context: 51bc81fb8fb2418c8bbd29d94df98d8e/11755040118950543729;o=0
# X-Pantheon-Styx-Hostname: styx-fe1-a-5688f47cd5-ff5vt
# X-Styx-Req-Id: 64d3b459-7a21-11ec-b5ee-760e7bca2b97
# Cache-Control: public, max-age=86400
# Content-Length: 162
# Date: Fri, 21 Jan 2022 03:05:42 GMT
# Connection: keep-alive
# X-Served-By: cache-mdw17363-MDW, cache-maa10243-MAA
# X-Cache: HIT, HIT
# X-Cache-Hits: 1, 1
# X-Timer: S1642734343.833636,VS0,VE1
# Vary: Cookie, Cookie
# Age: 29904
# Accept-Ranges: bytes
# Via: 1.1 varnish, 1.1 varnish  

echo ""
curl -I https://www.harvard.edu/ 

# response: 
# HTTP/2 200 
# cache-control: public, max-age=1200
# content-type: text/html; charset=UTF-8
# link: <https://www.harvard.edu/wp-json/>; rel="https://api.w.org/"
# link: <https://www.harvard.edu/wp-json/wp/v2/pages/6392>; rel="alternate"; type="application/json"
# link: <https://www.harvard.edu/>; rel=shortlink
# permissions-policy: geolocation=(self)
# referrer-policy: same-origin
# server: nginx
# strict-transport-security: max-age=31622400
# traceparent: 00-3aa22e6921c6402293ced8550de64b39-1891c77021542b41-00
# x-cloud-trace-context: 3aa22e6921c6402293ced8550de64b39/1770415412942744385;o=0
# x-content-type-options: nosniff
# x-frame-options: SAMEORIGIN
# x-pantheon-styx-hostname: styx-fe3-a-844776b484-62cbk
# x-pingback: https://www.harvard.edu/xmlrpc.php
# x-styx-req-id: 5f3434be-7a6d-11ec-9d4a-a2cf7902b930
# x-xss-protection: 1; mode=block
# age: 148
# accept-ranges: bytes
# via: 1.1 varnish, 1.1 varnish, 1.1 varnish, 1.1 varnish       
# date: Fri, 21 Jan 2022 03:53:38 GMT
# x-served-by: cache-mdw17357-MDW, cache-mdw17357-MDW, cache-maa10228-MAA, cache-maa10224-MAA
# x-cache: HIT, MISS, MISS, MISS
# x-cache-hits: 8, 0, 0, 0
# x-timer: S1642737218.306128,VS0,VE243
# vary: Accept-Encoding, Cookie, orig-host
# content-length: 201701


#  continue from 34
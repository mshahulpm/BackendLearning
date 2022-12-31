# Generate private key 
openssl genrsa -out ./private.key 4096

# Generate public key with this private key 
openssl rsa -in private.key -pubout -outform PEM -out public.pem

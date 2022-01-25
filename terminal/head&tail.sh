###############  HEAD #################

head hello 
# print first 10 line 
head -n 5 hello 
# print first 5 lines 
head -c 6 hello 
# first 6 bytes
head -v hello 
# contains about data of the file 

###############  TAIL #################

tail hello 
# print last 10 lines of the file
tail -n 5 hello 
# print last 5 lines of the file
tail -n 8 hello 
# print 10 lines from line no 8 
tail -c 6 hello 
#print last 6 bytes 
tail -v hello 
# also print specification about the line 
ls -l | tail -n 3
# print last 3 lines of the result of the ls -l command 

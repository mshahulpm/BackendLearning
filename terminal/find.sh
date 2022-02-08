find . 
# find every files and dirs and subdirs inside mentioned dir (here current dir)
find hello -type d 
# find only dirs and subdirs inside hello dir 
find hello -type f
# the above results but no dirs only files 
find . -type f -name "hello.txt" 
# find all "hello.txt" files inside current dir (case sensitive)
find . -type f -name "test*"
# find all files that start with "test" inside current dir (case sensitive )
find . -type f -iname "test*"
# above result but case insensitive (eg. files start with TeST) 
find / -type f -name "*.txt"  
# find all .txt files in the computer 
find . -type f -mmin -20 
# find all files that is modified in the last 20 minutes 
find . -type f -mmin +20 
# find all files that is modified before the last 20 minutes 
find . -type f -mmin +10 -mmin -20 
# find all file modified before 10 min ago and after last 20 minutes 
find . -type f -mtime -10 
# find all file modified in last 10 days 
find . -type f -mtime +10 
# find all file modified in minimum 10 days ago 
find /home -size +5M 
# find all files that is more than 5 mb in the home dir 
find . -perm 700 
# find all files that have permission of 700 (all perm to cur. user not for anyone) 
find dir -exec chmod 777 {} +  
# change permission to 777 to everything inside dir 
find . -maxdepth 1 -type f -name "*.png"  
# find all png images only in the current dir not nested dirs (-maxdepth 2 is 2level down) 
find . -maxdepth 1 -type f -name "*.png" -exec rm {} +
# remove all png file in current dir not in subdirs in current dir 
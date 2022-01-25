#ps 
<<comment
result 
 PID TTY          TIME CMD
1143 pts/0    00:00:00 zsh
1180 pts/0    00:00:00 ps

comment
ps | awk '{print $1}'        #print 1st column of the result of cmt ps 
<<com
result 
PID
1143
1240
1241
1242
com
#ps | awk '{print $2}'       # above one but second column

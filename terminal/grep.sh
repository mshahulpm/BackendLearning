#grep "hello" new.txt                # search for "hello" in new.txt file 
#grep -w "hello" new.txt             # search for exact "hello" in new.txt file 
#grep -wi "hello" new.txt            # search for exact "hello" in new.txt file and case insensitive 
#grep -win "hello" new.txt           # above result with line no 
#grep -win -A 1 "hello" new.txt      # above result with 1 line above the match 
#grep -win -B 2 "hello" new.txt      # above result with 2 line below the match 
#grep -win -C 3 "hello" new.txt      # with above and below 3 lines each
#grep "hello" ./*                    # search in every file inside current dir(not in sub dir) 
#grep -r "hello" ./                  # inside sub dirs too 
#grep -rl "hello" ./                 # return the path to matched files 
#history | grep "grep" | grep "new"  # search all history for wich command used "grep" then search result which used "new" in that result
#grep -r "...-...-..." .             #search for format like this abc-def-ghi 
#grep -rP "\d{3}-\d{3}-\d{3}" .      # above result but only for no 

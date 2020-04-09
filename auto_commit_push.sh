#!/bin/bash
while true
do
 NOW=$( date '+%F_%H:%M:%S' )
 git add .
 git commit -m $NOW $1
 git push | echo "git push finished"
 sleep 1
done

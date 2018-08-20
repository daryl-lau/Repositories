#!/bin/bash

#[ -f /home/test ] || exit 1

processBar()
{
    now=$1
    all=$2
    percent=`awk BEGIN'{printf "%f", ('$now'/'$all')}'`
    len=`awk BEGIN'{printf "%d", (100*'$percent')}'`
    bar='>'
    for((i=0;i<len-1;i++))
    do
        bar="="$bar
    done
    printf "[%-100s][%d%%]\r" $bar $len
}

#whole=100
whole=100
process=0
while [ $process -lt $whole ] 
do
    let process++
#    process=`du -sm /home/test |awk '{print $1}'`
    processBar $process $whole
    sleep 0.1
done
printf "\n"

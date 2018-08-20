#!/bin/bash

repo_url=http://mirrors.163.com/.help/CentOS7-Base-163.repo
hostname=lyucan.com
root_password="echo123."
tools="vim net-tools lrzsz bash-com*"
DNS="8.8.8.8"


#change root passwd
echo "Start change root password."
/bin/expect <<- EOF
    set time 30
    spawn passwd
    expect "*password:" {send "$root_password\n"}
    expect "*password:" {send "$root_password\n"}
expect eof
EOF

#set DNS
echo "Start set DNS addr."
sed -i '/DNS1/d' /etc/sysconfig/network-scripts/ifcfg-eth0
echo "DNS1=$DNS" >> /etc/sysconfig/network-scripts/ifcfg-eth0

#set 163 yum repo
echo "Start set 163 yum source."
wget_num=`rpm -qa | grep wget |wc -l`
if [ $wget_num -lt 1 ];then
    yum -y install wget
else
    echo "Wget has installed on host,skip install."
fi

echo "Start backup repo files."
[ ! -d /etc/yum.repos.d/repo_bak ] && mkdir /etc/yum.repos.d/repo_bak
mv /etc/yum.repos.d/*.repo /etc/yum.repos.d/repo_bak
echo "Start get 163.repo"
wget $repo_url -O /etc/yum.repos.d/163.repo
yum clean all
yum makecache

#insall tools
yum -y install $tools

#set hostname
echo "Start set hostname $hostname"
echo $hostname > /etc/hostname


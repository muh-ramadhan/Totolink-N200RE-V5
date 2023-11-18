#!/bin/sh

if [ $# -ne 2 ];
then
    echo "error argument"
		echo "usage: $0 [0:button wps | 1:page wps] [sysled]"
    exit
fi

mode=$1
sysled=$2
count=0
rt_flag=0
wifidualband=0
rt_enable=0
wl_enable=0
rt_wpa_mode=2
wl_wpa_mode=2
rt_macmode=$(nvram get rt_macmode)
wl_macmode=$(nvram get wl_macmode)
rt_enable=$(nvram get rt_radio_x)
rt_encryption_way=$(nvram get rt_encryption_way)
rt_crypto=$(nvram get rt_crypto)
opmode_custom=$(nvram get opmode_custom)

rax0_x=rai0

radio_wl=$(ifconfig | grep rax0 | cut -d ' ' -f 0)
if [ -n "$radio_wl" ]; then
        rax0_x=rax0
fi

rt_ssid=$(nvram get rt_ssid)
wl_ssid=$(nvram get wl_ssid)
[ ! -z "$rt_ssid" -a ! -z "$wl_ssid" ] && {
	wifidualband=1
	wl_enable=$(nvram get wl_radio_x)
	wl_encryption_way=$(nvram get wl_encryption_way)
	wl_crypto=$(nvram get wl_crypto)
	#echo "wifidualband:$wifidualband" > /dev/console
}
echo "wifidualband = $wifidualband" 

echo "rax0_x is  $rax0_x" >/dev/console

echo "wps start. mode is $mode." >/dev/console

echo "opmode_custom is $opmode_custom" >/dev/console


if [ $wl_enable -ne 1 -a $rt_enable -ne 1 ]
then
	echo "wlan is disable!!!" >/dev/console
	exit
fi

if [ "$opmode_custom" != "gw" ]
then
	echo "only gw mode support WPS!!!" >/dev/console
	exit
fi

#	DISABLE	      -- encryptionWay:0
#	WEP-OPEN      -- encryptionWay:1
#	WEP-SHARED    -- encryptionWay:2
#	WPA-PSK       -- encryptionWay:3
#	WPA2PSK       -- encryptionWay:4
#	WPAPSKWPA2PSK -- encryptionWay:5

# only WPAPSKWPA2PSK/WPA2PSK | AES/TKIP+AES support WPS

if [ $rt_enable -eq 1 ];then
	if [ $rt_encryption_way -ne 0 -a $rt_encryption_way -ne 4 -a $rt_encryption_way -ne 5 ];then
		rt_wpa_mode=1
	elif [ $rt_encryption_way -eq 4 -o $rt_encryption_way -eq 5 ] && [ ! -z "$rt_ssid" -a "$rt_crypto" = "tkip" ];then
		rt_wpa_mode=1
	fi
else
	rt_wpa_mode=1
fi

if [ $wl_enable -eq 1 ];then
	if [ $wl_encryption_way -ne 0 -a $wl_encryption_way -ne 4 -a $wl_encryption_way -ne 5 ];then
		wl_wpa_mode=1
	elif [ $wl_encryption_way -eq 4 -o $wl_encryption_way -eq 5 ] && [ ! -z "$wl_ssid" -a "$wl_crypto" = "tkip" ];then
		wl_wpa_mode=1
	fi
else
	wl_wpa_mode=1
fi

if [ $rt_wpa_mode -ne 2 -a $wl_wpa_mode -ne 2 ]
then
	echo "wlan encryption not support WPS!!!" >/dev/console
	exit
fi

mtk_gpio -l $sysled 0 11 0
case $mode in
0)
	#Button WPS
	
	if [ $wifidualband -eq 0 ]
	then
		echo "ra0 start wps" > /dev/console
		
		if [ "$rt_macmode" != "allow" ]
		then
			iwpriv ra0 set WscStop=1
			iwpriv ra0 set WscConfMode=4
			iwpriv ra0 set WscMode=2
			iwpriv ra0 set WscConfStatus=2
			iwpriv ra0 set WscGetConf=1
		fi
		
		while [ $count -lt 120 ]
		do
			rt_status=`/usr/sbin/wps_status ra0`
			#echo "rt_status:$rt_status" > /dev/console
			[ $rt_status -eq 34 ] && break
			sleep 1
			let "count++"
		done

		if [ $count -lt 120 ]
		then
			echo "ra0 wps succes" > /dev/console
			nvram set rt_wsc_status=2
		else
			echo "ra0 wps time out" > /dev/console
			nvram set rt_wsc_status=1		
		fi
		
		nvram set rt_wsc_beginn=0
	else
		
		if [ $wl_enable -eq 1 ] && [ $wl_wpa_mode -eq 2 ]
		then
			echo "$rax0_x start wps" > /dev/console
			iwpriv ra0 set WscStop=1
			iwpriv $rax0_x set WscStop=1
			
			if [ "$wl_macmode" != "allow" ]
			then
				iwpriv $rax0_x set WscConfMode=4
				iwpriv $rax0_x set WscMode=2
				iwpriv $rax0_x set WscConfStatus=2
				iwpriv $rax0_x set WscGetConf=1
			fi
			
			while [ $count -lt 120 ]
			do
				if [ $count -gt 60 ] && [ $rt_enable -eq 1 ]
				then
				iwpriv $rax0_x set WscStop=1			
				[ $rt_flag -eq 0 ] && {
					if [ "$rt_macmode" != "allow" ]
					then
						iwpriv ra0 set WscConfMode=4
						iwpriv ra0 set WscMode=2
						iwpriv ra0 set WscConfStatus=2
						iwpriv ra0 set WscGetConf=1
					fi
					rt_flag=1
				}
				rt_status=`/usr/sbin/wps_status ra0`
				[ $rt_status -eq 34 ] && break
				else
					wl_status=`/usr/sbin/wps_status $rax0_x`
					#echo "rt_status:$rt_status.wl_status :$wl_status" > /dev/console
					[ $wl_status -eq 34 ] && break		
				fi

				sleep 1
				let "count++"
			done


			if [ $count -lt 120 ]
			then
				echo "wps succes" > /dev/console
				if [ $rt_status -eq 34 ]
				then
					nvram set rt_wsc_status=2
				else
					nvram set wl_wsc_status=2
				fi		
			else
				echo "wps time out" > /dev/console
				nvram set rt_wsc_status=1
				nvram set wl_wsc_status=1
			fi

			nvram set rt_wsc_begin=0
			nvram set wl_wsc_begin=0	
			
			
		elif [ $rt_enable -eq 1 ] && [ $rt_wpa_mode -eq 2 ]
		then
			echo "ra0 start wps" > /dev/console
			iwpriv ra0 set WscStop=1
			iwpriv $rax0_x set WscStop=1
			
			if [ "$rt_macmode" != "allow" ]
			then
				iwpriv ra0 set WscConfMode=4
				iwpriv ra0 set WscMode=2
				iwpriv ra0 set WscConfStatus=2
				iwpriv ra0 set WscGetConf=1
			fi
			
			while [ $count -lt 120 ]
			do
				rt_status=`/usr/sbin/wps_status ra0`
				#echo "rt_status:$rt_status.wl_status :$wl_status" > /dev/console
				[ $rt_status -eq 34 ] && break
				sleep 1
				let "count++"
			done

			if [ $count -lt 120 ]
			then
				echo "wps succes" > /dev/console
				if [ $rt_status -eq 34 ]
				then
					nvram set rt_wsc_status=2
				fi		
			else
				echo "wps time out" > /dev/console
				nvram set rt_wsc_status=1
			fi

			nvram set rt_wsc_begin=0				
		fi
		
	fi

;;
1)
	#Page WPS
	rt_wsc_begin=$(nvram get rt_wsc_begin)
	wl_wsc_begin=$(nvram get wl_wsc_begin)

	if [ $rt_wsc_begin -eq 1 ]
	then
		echo "ra0 start wps" > /dev/console
		rt_wsc_mode=$(nvram get rt_wsc_mode)
		iwpriv ra0 set WscStop=1
		if [ $rt_wsc_mode -eq 0 ]
		then
			if [ "$rt_macmode" != "allow" ]
			then
				iwpriv ra0 set WscConfMode=4
				iwpriv ra0 set WscMode=2
				iwpriv ra0 set WscConfStatus=2
				iwpriv ra0 set WscGetConf=1
			fi
				
		else
			if [ "$rt_macmode" != "allow" ]
			then
				rt_wsc_pin=$(nvram get rt_wsc_pin)
				iwpriv ra0 set WscConfMode=7
				iwpriv ra0 set WscPinCode=$rt_wsc_pin
				iwpriv ra0 set WscMode=1
				iwpriv ra0 set WscConfStatus=2
				iwpriv ra0 set WscGetConf=1
			fi
		fi		

		while [ $count -lt 120 ]
		do
			rt_status=`/usr/sbin/wps_status ra0`
			#echo "rt_status:$rt_status" > /dev/console
			[ $rt_status -eq 34 ] && break
			sleep 1
			let "count++"
		done

		if [ $count -lt 120 ]
		then
				echo "ra0 wps success" > /dev/console
				nvram set rt_wsc_status=2
		else
				echo "ra0 wps time out" > /dev/console
				nvram set rt_wsc_status=1
		fi	
		nvram set rt_wsc_beginn=0			
	elif [ $wl_wsc_begin -eq 1 ]
	then
		echo "$rax0_x start wps" > /dev/console
		wl_wsc_mode=$(nvram get wl_wsc_mode)
		iwpriv ra0 set WscStop=1
		if [ $wl_wsc_mode -eq 0 ]
		then
			if [ "$wl_macmode" != "allow" ]
			then
				iwpriv $rax0_x set WscConfMode=4
				iwpriv $rax0_x set WscMode=2
				iwpriv $rax0_x set WscConfStatus=2
				iwpriv $rax0_x set WscGetConf=1
			fi
		else
			if [ "$wl_macmode" != "allow" ]
			then
				wl_wsc_pin=$(nvram get wl_wsc_pin)
				iwpriv $rax0_x set WscConfMode=7
				iwpriv $rax0_x set WscPinCode=$wl_wsc_pin
				iwpriv $rax0_x set WscMode=1
				iwpriv $rax0_x set WscConfStatus=2
				iwpriv $rax0_x set WscGetConf=1
			fi
		fi		

		while [ $count -lt 120 ]
		do
			wl_status=`/usr/sbin/wps_status $rax0_x`
			#echo "wl_status :$wl_status" > /dev/console
			[ $wl_status -eq 34 ] && break
			sleep 1
			let "count++"
		done

		if [ $count -lt 120 ]
		then
				echo "$rax0_x wps success" > /dev/console
				nvram set wl_wsc_status=2
		else
				echo "$rax0_x wps time out" > /dev/console
				nvram set wl_wsc_status=1
		fi
		nvram set wl_wsc_begin=0	
	fi

;;
*)
echo "error argument"
echo "0--------Button WPS;1--------Page WPS"
esac

nvram commit
mtk_gpio -l $sysled 1 11 11

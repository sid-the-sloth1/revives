Hi. 


Are you an **active reviver** who is looking for a **free tool** to keep track of their revives? or are you **someone who often gets into trouble**and occasionally hire Revivers and looking for a **way to count those revives**?


Well look no further. With the blessings of Church I brought a new tool for all of you. It is easy to set-up, open source and **Free**.

**Features:
**1) It records the revives you do.
2) It records the revives you receive.
3) It lets you filter the revives.
4) It updates the new revives automatically.


**How to use it?
**
**For PC**: 

1) Open this [Spreadsheet
](https://docs.google.com/spreadsheets/d/1NO6hTa44xGm7_mIlKqqLFUrhvIgzgZp-ubxJCZKCpZk/edit?usp=drivesdk)
2) Click on **File > Make a Copy**.

3) Inside the Spreadsheet there are multiple sheets. Find **"Key"** sheet inside. Inside it enter your **API key** in the **designated cell.** And  **select the frequency of Updates**with the help the **Drop-down menu in B3 Cell.
**
4) Click on **Tools > Script Editor.
**
5) Click on **Run > Run Function > firstRun.
**
6) When the code is run for first time it will ask you to provide it 3  permissions.  Grant those permissions. 

  **To access and edit your Spreadsheets.:** This permission is need because we are working with a Spreadsheet so the code will modify the Spreadsheet.

**To connect to an external service:** It is required because the code is getting your **Revives data** from the **Torn API**. And Torn API is an external service for Google Sheets.

**To run when you are not around**: In Google App Scripts you need to add triggers to make a code run on regular intervals. In my previous sheet, the users had to manually add triggers to their sheets and many of them used to get confused. So in this version I have made it possible to automatically add triggers through the code. This permission is needed so the code can add triggers to itself.

I have tried to explain why the permissions are required but if anyone of you still have a doubt you are more than free to ask questions and get my code checked by 3rd party for malicious code.


 **After giving permissions the code will run. If you done everything as above then your Spreadsheet is set up and it will automatically log new revives on regular intervals depending upon the option you chose.
**
**Go to "[color=#f76707]Search[/color]" sheet to filter your revives. 
**

**Now you can manually update the revives from inside the Spreadsheet by clicking on "[color=#f59f00]Run Manually[/color]" menu. 
**


**[color=#4263eb]For mobile users:[/color]**

1) Open this [Spreadsheet](https://docs.google.com/spreadsheets/d/1NO6hTa44xGm7_mIlKqqLFUrhvIgzgZp-ubxJCZKCpZk/edit?usp=drivesdk) in **Google Chrome** on android. Click on **Edit Icon in right corner** and open the spreadsheet in **Google Sheets Android App**. After that close it and open **Google Sheets App** again. 


**
[color=#f03e3e]Note: If you have more than one Gmail Id signed in on the device then select the one that is on the top, otherwise you will have to sign out from all other accounts to Deploy the Spreadsheet.[/color]**



2) Select the Spreadsheet and click on **Make a Copy. 
**

![](https://i.gyazo.com/e4a924002f785cd27e107121d9913c2c.jpg)



3)  You can now remove this spreadsheet and use the Copied version. You will be the sole owner of the copied sheet.

4) Open the copied Spreadsheet, 


![](https://i.gyazo.com/5705c2b85ccdd09e7de80cd6d13c2c8d.jpg)



The highlighted bit is the **scrollable** list of sheets inside the Spreadsheet. **Scroll right**and find a sheet named "**Key"**. In that sheet add your **API key** and select the **frequency of the updates using the drop-down.
**
5) After that **close the Google Sheets** app and open **Google Chrome.** Go to [url]https://script.google.com/home[/url]

6) Click on "**Revives Data**".


![](https://i.gyazo.com/cd561f6f91bae213bf97b968230e4441.jpg)





7). Click on "**Open Project**"


![](https://i.gyazo.com/b9dc3c4cfc1a4a3b79a95cacb2eb1209.jpg)


8) Click on **Run > Run Function > firstRun**

When the code is run for first time it will ask you to provide it 3  permissions.  Grant those permissions. 

  **To access and edit your Spreadsheets.:** This permission is need because we are working with a Spreadsheet so the code will modify the Spreadsheet.

**To connect to an external service:** It is required because the code is getting your **Revives data** from the **Torn API**. And Torn API is an external service for Google Sheets.

**To run when you are not around**: In Google App Scripts you need to add triggers to make a code run on regular intervals. In my previous sheet, the users had to manually add triggers to their sheets and many of them used to get confused. So in this version I have made it possible to automatically add triggers through the code. This permission is needed so the code can add triggers to itself.

I have tried to explain why the permissions are required but if anyone of you still have a doubt you are more than free to ask questions and get my code checked by 3rd party for malicious code.


 **After giving permissions the code will run. If you done everything as above then your Spreadsheet is set up and it will automatically log new revives. 
**
**Go to "[color=#f76707]Search[/color]" sheet to filter your revives. 




****[color=#1c7cd6]Note: 1) All times and dates should be according to TCT.
2) APi has last 100 revives. This 100 has both outgoing and incoming revives. So you choose the update Interval carefully so that in b/w 2 consecutive updates you don't give  and get more than a combined total of 100 revives
[/color]**


**If you have any questions feel free to PM me. And please share it with your other friends so that they don't pay money to others for using something that is free.
**

[color=#cccccc]f**k you to people who steal other's code that is available for free and then sell it to people who don't any better.[/color]

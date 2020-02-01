# revives
Hi everyone. I am a reviver by both  passion and profession. I have been using Python to track my revives until now. I recently decided to move to Google App Scripts to automate the process. I have created a spreadsheet to automatically track my revives using data pulled from API.  I am going to share the code with you and guide you about how to set it up. I have tried to explain what code does with the help of comments in the code and by telling how it works at end of this post. But if you have any questions or reservations about it feel free to ask away.

**For people who are using it for first time:**

1) Open this [Spreadsheet](https://docs.google.com/spreadsheets/d/10UHLfoAkirrP8JWpc1djQYYx-rj21dIsj9ymusSZOLM/edit?usp=drivesdk) .

Click on **File  > Make a Copy**.

This will create a new Spreadsheet just like this one + it's code. You will be the sole person with access to that spreadsheet. 

You can now delete the original spreadsheet. 

2) In the second page of the copied Spreadsheet add your API.

3) Click on **Tools > Script Editor**.

4) It will open the Script Console. Click on **Run > Run Function > myFunction.**

When you run the code for first time it will ask you to provide permission to the script to run and access your **Google sheets**(the reason behind accessing this one is obvious, I guess) and to connect to an external Site (Torn API).

Once you provide the necessary permissions the script will run. You can see the results by opening the spreadsheet.

5) Now comes the part of adding triggers. More information about triggers can be found [here](https://developers.google.com/apps-script/guides/triggers) and [here](https://developers.google.com/apps-script/guides/triggers/installable) .

 Revive API gives data about last *100 revives.*So logging the data by running the script just once a day is sufficient in normal conditions. But it is your choice. 

I am gonna run my script once every 12 hours. Below are the steps for that.

6) Click on **Edit > Current project's triggers.**

As we haven't added any trigger yet, click on **Create a New trigger.**

7) Select **Even Source > Time-driven**

8) **Select type of time based trigger > Hour timer.**

9) Click on **Save** and you are good to go. The script will run automatically twice a day and update your revives.

**For people who were using the previous versions of the code:**

1) Open the [Spreadsheet](https://docs.google.com/spreadsheets/d/10UHLfoAkirrP8JWpc1djQYYx-rj21dIsj9ymusSZOLM/edit?usp=drivesdk).  Click on **Tools > Script Editor**.

2) Select the whole code and copy it.

3) Now open your Spreadsheet that you use to track revives. Click on Tools > Script Editor.

4) Remove the previous code and paste the new one there.

5) Click on Save.

**NOTE**

A) Also if you have more than Gmail accounts opened in the browser, then make sure to use same account to use Google Sheets and Google Drive for this project.

B) If you ever reset your API key, make sure to update the key in the Spreadsheet.

If you have any questions feel free to ask.


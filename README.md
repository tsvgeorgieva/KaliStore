# KaliStore
Online store for handmade gifts

--- Prerequisites ---

You should have node.js installed and added to yout PATH
You should have Ruby installed and added to yout PATH

--- Initial instructions ---

1. Download or clone the application from the develop branch (not master branch)

2. Run the given commands bellow in the same order in the console (you should have fulfilled the Prerequisites first)

    --- Initial commands ---
        1. Run once

            gem install sass

            npm install -g jspm

            npm install -g gulp

        2. Run when dependencies or packages change

            npm install

            jspm install

        3. Run to start the server

            gulp watch

3. When "gulp watch" is executed the server with the app is started on http://localhost:9000/ (You should not close the console window or the server will stop)
run:
	make -j 3 run_server run_client browser

run_server:
	nodemon server/app.js

run_client:
	npm run dev --prefix client

browser:
	sleep 0.5 && open -a "Brave Browser.app" http://localhost:5173
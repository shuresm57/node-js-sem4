# script for running 2 jobs in parallel with the -j (jobs) flag
run:
	make -j 2 run_server run_client

# run the server
run_server:
	cd server && nodemon app.js

# run the client
run_client:
	npm run dev --prefix client

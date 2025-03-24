#!/bin/bash

# Build frontend
cd client
npm run build

# Copy files to EC2
scp -i your-key.pem -r dist/ ubuntu@3.93.219.99:~/codeprepai/client/
scp -i your-key.pem -r server/* ubuntu@3.93.219.99:~/codeprepai/server/ 
# Twitch Bot

A fun Twitch chat bot built with Node.js that responds to various commands.

## Features

- Interactive chat commands
- OpenAI integration
- API Ninjas integration
- Custom substance-related responses

## Prerequisites

- Node.js 14.x or higher
- AWS account (for EC2 deployment)
- Twitch account
- OpenAI API key
- API Ninjas API key

## Environment Variables Setup

Create a `.env` file in the root directory with the following variables:

WATCHED_CHANNEL=your_twitch_channel_name
BOT_USERNAME=your_bot_username
BOT_USER_ACCESS_TOKEN=oauth:your_token_here
API_NINJAS_API_KEY=your_api_ninjas_key
OPENAI_API_KEY=your_openai_key

### How to get the environment variables:

1. **WATCHED_CHANNEL**: Your Twitch channel name in lowercase
2. **BOT_USERNAME**: Create a new Twitch account for your bot
3. **BOT_USER_ACCESS_TOKEN**: 
   - Go to https://twitchapps.com/tmi/
   - Log in with your bot account
   - Copy the OAuth token (including "oauth:")
4. **API_NINJAS_API_KEY**:
   - Sign up at https://api-ninjas.com
   - Get your API key from the dashboard
5. **OPENAI_API_KEY**:
   - Sign up at https://platform.openai.com
   - Create an API key in your account settings

## Local Development

1. Install dependencies:
   npm install

2. Start the bot:
   npm start

## EC2 Deployment Guide

1. Launch an EC2 instance:
   - Choose Amazon Linux 2023
   - t2.micro instance type (free tier eligible)
   - Create a new key pair and download it

2. Connect to your instance:
   chmod 400 your-key-pair.pem
   ssh -i your-key-pair.pem ec2-user@your-instance-ip

3. Install Node.js and Git:
   sudo yum update -y
   sudo yum install -y nodejs git

4. Clone and setup your bot:
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   npm install

5. Create the .env file:
   nano .env

6. Run with PM2 for persistence:
   npm install -g pm2
   pm2 start index.js
   pm2 startup

## Project Structure

.
├── .env
├── .gitignore
├── index.js
├── package.json
├── README.md
└── node_modules/

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT

## Support

Open an issue in the GitHub repository for support.

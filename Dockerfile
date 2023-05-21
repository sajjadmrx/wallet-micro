FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install pnpm and project dependencies
RUN apk --no-cache add bash git openssh

RUN npm install


# Copy the rest of the application
COPY . .

# Start the application
CMD ["npm", "run", "start"]

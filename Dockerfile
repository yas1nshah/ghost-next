# Use node image as base
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./


# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npx prisma generate

# Build the Next.js app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Command to run the Next.js app
CMD npm run start

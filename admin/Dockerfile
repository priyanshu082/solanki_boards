# Use official Node.js image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# # Build TypeScript code
# RUN npm run build

# Expose the port
EXPOSE 5173

# Start the application
CMD ["sh", "-c", "npm run dev"]
## Build Stage
FROM node:18.19.0-alpine AS build

WORKDIR /app

# Copy only package files first to leverage Docker cache for dependencies
COPY package*.json /app/

# Use Yarn to install dependencies
RUN yarn install

# Now copy the rest of the application code
COPY ./ /app/

# Run the build using Yarn
RUN yarn run build --configuration=production --output-path=dist

## Production Stage
FROM nginx:alpine AS production-stage

# Copy the custom NGINX configuration file into /etc/nginx/conf.d/
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built files from the previous stage into the NGINX server
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

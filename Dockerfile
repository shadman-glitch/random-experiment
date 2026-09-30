# Production Multi-Stage Dockerfile (Ultra-Lightweight <25MB)
# Maintained by Agent 6 (Cloud & DevOps Engineer)
# 100% Free Open-Source

FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy website files
COPY ./index.html /usr/share/nginx/html/
COPY ./css /usr/share/nginx/html/css
COPY ./js /usr/share/nginx/html/js

# Copy custom Nginx configuration
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

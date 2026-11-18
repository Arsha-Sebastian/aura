# OpenShift-compatible unprivileged Nginx container
FROM nginxinc/nginx-unprivileged:alpine

# Copy website static assets
COPY --chown=nginx:nginx . /usr/share/nginx/html

# OpenShift routes traffic to non-privileged port 8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

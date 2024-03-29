# Uses the node base image with the latest LTS version
FROM node:14.16.0
# Informs Docker that the container listens on the
# specified network ports at runtime
EXPOSE 4000
# Copies index.js and the two package files from the local
# directory to a new app directory on the container
WORKDIR /app
COPY . .
# Installs npm dependencies on container
RUN npm ci
# Command container will actually run when called
CMD ["node", "index.js"]
# Coffee Review Website 
This repository contains a simple website for personal coffee reviews. Users can document and review different types of coffee bean they've tried. The website is build using Node.js, Express.js, EJS for templating, and can be deployed using Docker.

# Usage with Docker Compose
To run the website using Docker Compose:
1. Make sure Docker and Docker Compose are installed on your system.
2. Create a '**docker-compose.yaml**' file in your project directory: 
```yaml
version: "3.8"

services:
  coffee:
    image: cyrof/coffee_review:latest
    tty: true
    stdin_open: true
    ports:
      - "4000:4000"
```
3. Run the following command to start the Docker container: 
``` console
$ docker-compose up -d
```
The website should now be accessible at '**http://localhost:4000**' in your web browser.

# Usage with Docker Command 
If your prefer using Docker commands directly, you can pull and run the image with the following steps: 

1. Pull the '**cyrof/coffee_review:latest**' image from Docker Hub:
``` console
$ docker pull cyrof/coffee_review:latest
```
2. Run the docker container:
``` console
$ docker run -it -p 4000:4000 cyrof/coffee_review:latest
```
The website should now be accessible at '**http://localhost:4000**' in your web browser.

# License
This project is licensed under the [Apache License 2.0](https://github.com/Cyrof/coffee-review/blob/main/LICENSE).

# Contact 
If you have any questions or suggestions, feel free to [open an issue](https://github.com/Cyrof/coffee-review/issues) on this repository.
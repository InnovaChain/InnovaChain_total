# Use the official Python runtime as the base image
FROM python:3.9-slim

ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /app

# Copy the current directory's contents to the working directory
COPY . .

# Install required packages
RUN apt-get update && \
    apt-get install ffmpeg libsm6 libxext6  -y && \
    apt-get install -y curl

RUN pip install --no-cache-dir -r requirements.txt

# Copy the existing Alembic configuration
COPY alembic.ini ./alembic.ini

COPY start.sh /usr/src/app/start.sh

RUN chmod +x /usr/src/app/start.sh

# Expose port
EXPOSE 8000

VOLUME ["/var/data"]

# CMD
CMD ["/usr/src/app/start.sh"]

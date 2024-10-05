# Use the official Python runtime as the base image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the current directory's contents to the working directory
COPY . .

# Install required packages
RUN apt-get update && \
    apt-get install -y curl

RUN pip install --no-cache-dir -r requirements.txt

# Copy the existing Alembic configuration
COPY alembic.ini ./alembic.ini

# Expose port
EXPOSE 8000

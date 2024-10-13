# Innovachain

## Table of Contents

- [Innovachain](#innovachain)
  - [Table of Contents](#table-of-contents)
  - [About the Project](#about-the-project)
    - [What it is](#what-it-is)
    - [Vision](#vision)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Database Initialization](#database-initialization)
    - [Running the Application](#running-the-application)
  - [Deployment](#deployment)
    - [Solana DevNet](#solana-devnet)
      - [Contract Details](#contract-details)
    - [Scroll Sepolia](#scroll-sepolia)
      - [Contract Details](#contract-details-1)
  - [Contact Us](#contact-us)

## About the Project

Elevating Creative IP, Empowering Reimagination

### What it is

InnovaChain is Generative Al Creation Platform focused on protecting and evolving creators' intellectual property. Through advanced digital watermarking and dynamic incentives, it secures original IP while empowering creators to reimagine and expand their work.

### Vision

Using digital watermarking to protect IP, with blockchain traceability and verification.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, make sure you have the following installed:

- Python 3.7+
- Solana CLI
- Anchor CLI

### Installation

Ensure that your system has Python 3.7+ installed. Follow these steps to set up the development environment:

1. **Create a Virtual Environment**:
   ```bash
   python -m venv .venv
   ```

2. **Activate the Virtual Environment**:
   - Windows:
     ```bash
     .venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source .venv/bin/activate
     ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

### Database Initialization

Innovachain uses SQLAlchemy as the ORM and Alembic for database migration management. Follow these steps to initialize the database:

1. **Initialize Alembic**:
   ```bash
   alembic init alembic
   ```

2. **Configure Database Connection**:
   Edit the `sqlalchemy.url` in the `alembic.ini` file to:
   ```ini
   sqlalchemy.url = sqlite:///data/innovachain.db
   ```

3. **Generate Initial Migration Script**:
   ```bash
   alembic revision --autogenerate -m "Initial migration"
   ```

4. **Apply Migrations**:
   ```bash
   alembic upgrade head
   ```

### Running the Application

After completing the above steps, you can start the Innovachain application using the following command:

```bash
uvicorn main:app --reload
```

This will start a development server locally, defaulting to port 8000. You can access the application by visiting `http://127.0.0.1:8000/`.

## Deployment

### Solana DevNet

The smart contract for Innovachain has been deployed on the Solana DevNet. Here are the details:

#### Contract Details

- **Program ID**: `5SutcEVK2AZzpo7JG82kefScv9W6UjGLLaqRoC1feSXZ`

### Scroll Sepolia

The smart contract has also been deployed on the Scroll Sepolia test network. Here are the details:

#### Contract Details

- **Contract Address**: `0x53ad8daf0356734766793b53552da1f7a6a752ab`

## Contact Us

If you have any questions or suggestions, feel free to reach out to us. 

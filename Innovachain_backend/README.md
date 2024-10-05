# Innovachain

## What it is

InnovaChain is Generative Al Creation Platform focused on protecting and evolving creators' intellectual property. Through advanced digital watermarking and dynamic incentives, it secures original IP while empowering creators to reimagine and expand their work.

## Vision

A One-stop GAI Creation Platform, fostering continuous innovation by safeguarding the originality.

## Quick Start

### Setting Up the Environment

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

## Contract Deployment on Scroll Sepolia

### Contract Details

- **Transaction Hash**: `0x9b06ed2a0fe2ba4750d8fb7c0a977015b94b4e70ee08e7a0734417870b45308d`
- **Contract Address**: `0x53ad8daf0356734766793b53552da1f7a6a752ab`


## Contact Us

If you have any questions or suggestions, feel free to reach out to us. 

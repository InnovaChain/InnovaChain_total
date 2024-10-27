from sqlalchemy.orm import Session
from models.last_execution_repository import LastExecutionRepository
from datetime import datetime

class LastExecutionService:
    def __init__(self, repository: LastExecutionRepository):
        self.repository = repository

    async def check_if_needs_execution(self):
        last_execution = self.repository.get_last_execution()
        if last_execution is None or last_execution.last_execution_time.date() < datetime.now().date():
            return True
        return False

    async def set_last_execution_time(self):
        self.repository.set_last_execution()
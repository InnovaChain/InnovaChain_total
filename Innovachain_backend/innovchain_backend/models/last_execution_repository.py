from sqlalchemy.orm import Session
from models.model import LastExecution
from datetime import datetime

class LastExecutionRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_last_execution(self):
        return self.db.query(LastExecution).first()

    def set_last_execution(self):
        last_execution = self.get_last_execution()
        if last_execution is None:
            last_execution = LastExecution()
            self.db.add(last_execution)
        last_execution.last_execution_time = datetime.now()
        self.db.commit()
        self.db.refresh(last_execution)

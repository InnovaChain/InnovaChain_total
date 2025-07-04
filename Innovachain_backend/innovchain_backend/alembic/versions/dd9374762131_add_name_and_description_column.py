"""add name and description column

Revision ID: dd9374762131
Revises: 4a8fdd6d9e36
Create Date: 2024-09-19 22:47:22.077710

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'dd9374762131'
down_revision: Union[str, None] = '4a8fdd6d9e36'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('images', sa.Column('name', sa.String(), nullable=True))
    op.add_column('images', sa.Column('description', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('images', 'description')
    op.drop_column('images', 'name')
    # ### end Alembic commands ###

"""empty message

Revision ID: a53ad141fd15
Revises: b1c1f5082ec5
Create Date: 2023-09-11 15:50:03.654262

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a53ad141fd15'
down_revision = 'b1c1f5082ec5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('oficio',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('profesional',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('last_name', sa.String(length=120), nullable=False),
    sa.Column('age', sa.Integer(), nullable=False),
    sa.Column('birth_date', sa.DateTime(), nullable=False),
    sa.Column('registration_date', sa.DateTime(), nullable=False),
    sa.Column('photo', sa.String(length=200), nullable=True),
    sa.Column('descripcion', sa.String(length=500), nullable=True),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.Column('password', sa.String(length=100), nullable=False),
    sa.Column('id_oficio', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['id_oficio'], ['oficio.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('birth_date'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('registration_date')
    )
    op.create_table('tipo_consulta',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('id_oficio', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=120), nullable=False),
    sa.Column('descripcion', sa.String(length=500), nullable=False),
    sa.Column('duracion', sa.Float(), nullable=False),
    sa.ForeignKeyConstraint(['id_oficio'], ['oficio.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('consulta',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('id_user', sa.Integer(), nullable=False),
    sa.Column('id_profesional', sa.Integer(), nullable=False),
    sa.Column('id_tipo_consulta', sa.Integer(), nullable=False),
    sa.Column('realization_date', sa.DateTime(), nullable=False),
    sa.Column('consultation_date', sa.DateTime(), nullable=False),
    sa.Column('nota', sa.String(length=500), nullable=True),
    sa.ForeignKeyConstraint(['id_profesional'], ['profesional.id'], ),
    sa.ForeignKeyConstraint(['id_tipo_consulta'], ['tipo_consulta.id'], ),
    sa.ForeignKeyConstraint(['id_user'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(length=120), nullable=False))
        batch_op.add_column(sa.Column('last_name', sa.String(length=120), nullable=False))
        batch_op.add_column(sa.Column('age', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('birth_date', sa.DateTime(), nullable=False))
        batch_op.add_column(sa.Column('registration_date', sa.DateTime(), nullable=False))
        batch_op.alter_column('email',
               existing_type=sa.VARCHAR(length=120),
               type_=sa.String(length=100),
               existing_nullable=False)
        batch_op.alter_column('password',
               existing_type=sa.VARCHAR(length=80),
               type_=sa.String(length=100),
               existing_nullable=False)
        batch_op.create_unique_constraint(None, ['birth_date'])
        batch_op.create_unique_constraint(None, ['registration_date'])
        batch_op.drop_column('is_active')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_constraint(None, type_='unique')
        batch_op.alter_column('password',
               existing_type=sa.String(length=100),
               type_=sa.VARCHAR(length=80),
               existing_nullable=False)
        batch_op.alter_column('email',
               existing_type=sa.String(length=100),
               type_=sa.VARCHAR(length=120),
               existing_nullable=False)
        batch_op.drop_column('registration_date')
        batch_op.drop_column('birth_date')
        batch_op.drop_column('age')
        batch_op.drop_column('last_name')
        batch_op.drop_column('name')

    op.drop_table('consulta')
    op.drop_table('tipo_consulta')
    op.drop_table('profesional')
    op.drop_table('oficio')
    # ### end Alembic commands ###

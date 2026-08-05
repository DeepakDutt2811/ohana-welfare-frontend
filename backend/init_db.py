"""Creates all tables defined in app.models against the configured database.

Run once after creating the database (see migrations/001_create_database.sql)
and setting up backend/.env:
    python init_db.py
"""

from app import models  # noqa: F401  (import registers the model with Base metadata)
from app.database import Base, engine


def main() -> None:
    Base.metadata.create_all(bind=engine)
    print("Tables created (or already existed).")


if __name__ == "__main__":
    main()

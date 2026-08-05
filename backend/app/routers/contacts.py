from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import crud, schemas
from app.database import get_db

router = APIRouter(prefix="/api/contacts", tags=["contacts"])


@router.post("", response_model=schemas.ContactOut, status_code=201)
def submit_contact(payload: schemas.ContactCreate, db: Session = Depends(get_db)):
    return crud.create_contact(db, payload)
